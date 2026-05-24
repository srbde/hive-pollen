/**
 * @file Broadcast API helpers.
 * @author Johan Nordberg <code@johan-nordberg.com>
 * @license
 * Copyright (c) 2017 Johan Nordberg. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * You acknowledge that this software is not designed, licensed or intended for use
 * in the design, construction, operation or maintenance of any military facility.
 */

import assert from 'assert'

import { Authority, AuthorityType } from '../chain/account.js'
import { Asset } from '../chain/asset.js'
import {
  AccountUpdateOperation,
  ClaimAccountOperation,
  CommentOperation,
  CommentOptionsOperation,
  CreateClaimedAccountOperation,
  CustomJsonOperation,
  DelegateVestingSharesOperation,
  Operation,
  TransferOperation,
  VoteOperation
} from '../chain/operation.js'
import {
  SignedTransaction,
  Transaction,
  TransactionConfirmation
} from '../chain/transaction.js'
import { Client } from './../client.js'
import { cryptoUtils, PrivateKey, PublicKey } from './../crypto.js'

/**
 * Options used by {@link BroadcastAPI.createTestAccount}.
 *
 * @remarks
 * Tests can either provide a master password, letting Pollen derive role keys
 * with Hive's login convention, or provide explicit authorities for deterministic
 * account fixtures.
 *
 * @example
 * ```ts
 * const options: CreateAccountOptions = {
 *   username: 'pollen-dev',
 *   password: 'correct horse battery staple',
 *   creator: 'initminer',
 *   metadata: { app: 'pollen-tests' }
 * }
 * ```
 */
export interface CreateAccountOptions {
  /**
   * Username for the new account.
   */
  username: string
  /**
   * Password for the new account, if set, all keys will be derived from this.
   */
  password?: string
  /**
   * Account authorities, used to manually set account keys.
   * Can not be used together with the password option.
   */
  auths?: {
    owner: AuthorityType | string | PublicKey
    active: AuthorityType | string | PublicKey
    posting: AuthorityType | string | PublicKey
    memoKey: PublicKey | string
  }
  /**
   * Creator account, fee will be deducted from this and the key to sign
   * the transaction must be the creators active key.
   */
  creator: string
  /**
   * Account creation fee. If omitted fee will be set to lowest possible.
   */
  fee?: string | Asset | number
  /**
   * Account delegation, amount of VESTS to delegate to the new account.
   * If omitted the delegation amount will be the lowest possible based
   * on the fee. Can be set to zero to disable delegation.
   */
  delegation?: string | Asset | number
  /**
   * Optional account meta-data.
   */
  metadata?: { [key: string]: any }
}

/**
 * Helper for signing and broadcasting Hive operations.
 *
 * @remarks
 * `BroadcastAPI` turns typed operation payloads into signed Hive transactions,
 * derives TAPOS reference fields from the current head block, and submits the
 * signed transaction through the configured client. Signing uses Pollen's Noble
 * secp256k1-backed crypto layer through {@link cryptoUtils} for modern audited
 * primitives.
 *
 * @example
 * ```ts
 * import { Client, PrivateKey } from '@srbde/pollen'
 *
 * const client = new Client('https://api.hive.blog')
 * const key = PrivateKey.fromString(process.env.HIVE_ACTIVE_KEY!)
 *
 * const confirmation = await client.broadcast.transfer(
 *   {
 *     from: 'srbde',
 *     to: 'alice',
 *     amount: '0.001 HIVE',
 *     memo: 'Pollen transfer'
 *   },
 *   key
 * )
 *
 * console.log(confirmation.id)
 * ```
 *
 * @see {@link cryptoUtils.signTransaction}
 * @see {@link Client.call}
 */
export class BroadcastAPI {
  /**
   * How many milliseconds in the future to set the expiry time to when
   * broadcasting a transaction, defaults to 1 minute.
   */
  public expireTime = 60 * 1000

  /**
   * Creates a broadcast helper bound to a client.
   *
   * @param client - Client used for chain-property reads and transaction
   * submission.
   */
  constructor(readonly client: Client) {}

  /**
   * Broadcasts a Hive `comment` operation.
   *
   * @param comment - Comment payload. Empty `parent_author` creates a top-level
   * post; a populated `parent_author` creates a reply.
   * @param key - Private posting key for `comment.author`.
   * @returns Transaction confirmation containing the generated transaction id.
   *
   * @throws RPCError
   * Thrown when the node rejects the transaction, the posting authority is
   * missing, or the comment payload violates chain rules.
   *
   * @example
   * ```ts
   * await client.broadcast.comment(
   *   {
   *     parent_author: '',
   *     parent_permlink: 'hive-139531',
   *     author: 'srbde',
   *     permlink: 'hello-pollen',
   *     title: 'Hello Pollen',
   *     body: 'Published through the Pollen SDK.',
   *     json_metadata: JSON.stringify({ tags: ['hive-139531'] })
   *   },
   *   postingKey
   * )
   * ```
   */
  public async comment(comment: CommentOperation[1], key: PrivateKey) {
    const op: Operation = ['comment', comment]
    return this.sendOperations([op], key)
  }

  /**
   * Broadcasts a comment together with its payout and beneficiary options.
   *
   * @param comment - Comment or post payload.
   * @param options - Matching `comment_options` payload for the same author and
   * permlink.
   * @param key - Private posting key for the comment author.
   * @returns Transaction confirmation containing the generated transaction id.
   *
   * @remarks
   * Sending both operations in one transaction prevents a post from briefly
   * existing with default payout settings.
   *
   * @throws RPCError
   * Thrown when either operation fails chain validation.
   *
   * @example
   * ```ts
   * await client.broadcast.commentWithOptions(comment, {
   *   author: comment.author,
   *   permlink: comment.permlink,
   *   max_accepted_payout: '1000000.000 HBD',
   *   percent_hbd: 10000,
   *   allow_votes: true,
   *   allow_curation_rewards: true,
   *   extensions: []
   * }, postingKey)
   * ```
   */
  public async commentWithOptions(
    comment: CommentOperation[1],
    options: CommentOptionsOperation[1],
    key: PrivateKey
  ) {
    const ops: Operation[] = [
      ['comment', comment],
      ['comment_options', options]
    ]
    return this.sendOperations(ops, key)
  }

  /**
   * Broadcasts a vote operation.
   *
   * @param vote - Vote payload including voter, author, permlink, and weight.
   * @param key - Private posting key for `vote.voter`.
   * @returns Transaction confirmation containing the generated transaction id.
   *
   * @throws RPCError
   * Thrown when the vote is outside chain limits or the posting authority is
   * invalid.
   *
   * @example
   * ```ts
   * await client.broadcast.vote(
   *   {
   *     voter: 'srbde',
   *     author: 'alice',
   *     permlink: 'field-notes',
   *     weight: 10_000
   *   },
   *   postingKey
   * )
   * ```
   */
  public async vote(vote: VoteOperation[1], key: PrivateKey) {
    const op: Operation = ['vote', vote]
    return this.sendOperations([op], key)
  }

  /**
   * Broadcasts a liquid HIVE or HBD transfer.
   *
   * @param data - Transfer payload with sender, recipient, amount, and memo.
   * @param key - Private active key for `data.from`.
   * @returns Transaction confirmation containing the generated transaction id.
   *
   * @throws RPCError
   * Thrown when the sender lacks funds, active authority is missing, or the node
   * rejects the transaction.
   *
   * @example
   * ```ts
   * await client.broadcast.transfer(
   *   {
   *     from: 'srbde',
   *     to: 'alice',
   *     amount: '1.000 HIVE',
   *     memo: 'Invoice 42'
   *   },
   *   activeKey
   * )
   * ```
   */
  public async transfer(data: TransferOperation[1], key: PrivateKey) {
    const op: Operation = ['transfer', data]
    return this.sendOperations([op], key)
  }

  /**
   * Broadcasts a `custom_json` operation for application-level protocols.
   *
   * @param data - Custom JSON payload, including id, required authorities, and
   * serialized JSON string.
   * @param key - Private posting or active key matching the required authority
   * arrays.
   * @returns Transaction confirmation containing the generated transaction id.
   *
   * @throws RPCError
   * Thrown when authority requirements are not met or the payload is invalid.
   *
   * @example
   * ```ts
   * await client.broadcast.json(
   *   {
   *     required_auths: [],
   *     required_posting_auths: ['srbde'],
   *     id: 'pollen.demo',
   *     json: JSON.stringify({ nectar: 'ready' })
   *   },
   *   postingKey
   * )
   * ```
   */
  public async json(data: CustomJsonOperation[1], key: PrivateKey) {
    const op: Operation = ['custom_json', data]
    return this.sendOperations([op], key)
  }

  /**
   * Creates and optionally delegates to a new account in test environments.
   *
   * @param options - New account name, authority source, creator, fee, optional
   * delegation, and metadata.
   * @param key - Private active key for `options.creator`.
   * @returns Transaction confirmation for the claim/create/delegate transaction.
   *
   * @remarks
   * This helper is intentionally guarded for test suites. It can derive owner,
   * active, posting, and memo keys from a password or accept explicit authority
   * objects when tests need deterministic key material.
   *
   * @throws AssertionError
   * Thrown when called outside a Mocha-style test environment.
   * @throws Error
   * Thrown when neither `password` nor `auths` is supplied, or when the provided
   * account-creation fee does not match chain properties.
   * @throws RPCError
   * Thrown when the chain rejects the account creation transaction.
   *
   * @example
   * ```ts
   * await testnet.broadcast.createTestAccount(
   *   {
   *     username: 'pollen-dev',
   *     password: 'correct horse battery staple',
   *     creator: 'initminer',
   *     metadata: { app: 'pollen-tests' }
   *   },
   *   initminerActiveKey
   * )
   * ```
   */
  public async createTestAccount(
    options: CreateAccountOptions,
    key: PrivateKey
  ) {
    assert(
      global.hasOwnProperty('it'),
      'helper to be used only for mocha tests'
    )

    const { username, metadata, creator } = options

    const prefix = this.client.addressPrefix
    let owner: Authority,
      active: Authority,
      posting: Authority,
      memo_key: PublicKey
    if (options.password) {
      const ownerKey = PrivateKey.fromLogin(
        username,
        options.password,
        'owner'
      ).createPublic(prefix)
      owner = Authority.from(ownerKey)
      const activeKey = PrivateKey.fromLogin(
        username,
        options.password,
        'active'
      ).createPublic(prefix)
      active = Authority.from(activeKey)
      const postingKey = PrivateKey.fromLogin(
        username,
        options.password,
        'posting'
      ).createPublic(prefix)
      posting = Authority.from(postingKey)
      memo_key = PrivateKey.fromLogin(
        username,
        options.password,
        'memo'
      ).createPublic(prefix)
    } else if (options.auths) {
      owner = Authority.from(options.auths.owner)
      active = Authority.from(options.auths.active)
      posting = Authority.from(options.auths.posting)
      memo_key = PublicKey.from(options.auths.memoKey)
    } else {
      throw new Error('Must specify either password or auths')
    }

    let { fee, delegation } = options

    const symbol = prefix === 'STM' ? 'HIVE' : 'TESTS'
    delegation = Asset.from(delegation || 0, 'VESTS')
    fee = Asset.from(fee || 0, symbol)

    if (fee.amount > 0) {
      const chainProps = await this.client.database.getChainProperties()
      const creationFee = Asset.from(chainProps.account_creation_fee)
      if (fee.amount !== creationFee.amount) {
        throw new Error('Fee must be exactly ' + creationFee.toString())
      }
    }

    const claim_op: ClaimAccountOperation = [
      'claim_account',
      {
        creator,
        extensions: [],
        fee
      }
    ]

    const create_op: CreateClaimedAccountOperation = [
      'create_claimed_account',
      {
        active,
        creator,
        extensions: [],
        json_metadata: metadata ? JSON.stringify(metadata) : '',
        memo_key,
        new_account_name: username,
        owner,
        posting
      }
    ]

    const ops: any[] = [claim_op, create_op]

    if (delegation.amount > 0) {
      const delegate_op: DelegateVestingSharesOperation = [
        'delegate_vesting_shares',
        {
          delegatee: username,
          delegator: creator,
          vesting_shares: delegation
        }
      ]
      ops.push(delegate_op)
    }

    return this.sendOperations(ops, key)
  }

  /**
   * Broadcasts an `account_update` operation.
   *
   * @param data - Account update payload, including optional authorities,
   * memo key, and JSON metadata.
   * @param key - Private key with sufficient authority for the fields being
   * changed.
   * @returns Transaction confirmation containing the generated transaction id.
   *
   * @throws RPCError
   * Thrown when the update lacks required authority or violates account rules.
   *
   * @example
   * ```ts
   * await client.broadcast.updateAccount(
   *   {
   *     account: 'srbde',
   *     memo_key: memoPublicKey,
   *     json_metadata: JSON.stringify({ profile: { name: 'SRBDE' } }),
   *     owner: undefined,
   *     active: undefined,
   *     posting: undefined
   *   },
   *   activeKey
   * )
   * ```
   */
  public async updateAccount(data: AccountUpdateOperation[1], key: PrivateKey) {
    const op: Operation = ['account_update', data]
    return this.sendOperations([op], key)
  }

  /**
   * Delegates vesting shares from one account to another.
   *
   * @param options - Delegation payload containing delegator, delegatee, and
   * vesting share amount.
   * @param key - Private active key for `options.delegator`.
   * @returns Transaction confirmation containing the generated transaction id.
   *
   * @remarks
   * Delegated VESTS remain owned by the delegator, but voting influence and
   * resource capacity move to the delegatee. Setting `vesting_shares` to zero
   * removes the delegation; removed shares enter the protocol cooldown period
   * before they can vote again.
   *
   * @throws RPCError
   * Thrown when the delegator lacks active authority, the asset is invalid, or
   * the chain rejects the delegation.
   *
   * @example
   * ```ts
   * await client.broadcast.delegateVestingShares(
   *   {
   *     delegator: 'srbde',
   *     delegatee: 'alice',
   *     vesting_shares: '100.000000 VESTS'
   *   },
   *   activeKey
   * )
   * ```
   */
  public async delegateVestingShares(
    options: DelegateVestingSharesOperation[1],
    key: PrivateKey
  ) {
    const op: Operation = ['delegate_vesting_shares', options]
    return this.sendOperations([op], key)
  }

  /**
   * Builds, signs, and broadcasts a transaction containing one or more operations.
   *
   * @param operations - Ordered Hive operations to include in the transaction.
   * @param key - Private key or keys required by the operation authorities.
   * @returns Transaction confirmation containing the generated transaction id.
   *
   * @remarks
   * Pollen reads dynamic global properties to derive TAPOS reference fields,
   * assigns an expiration based on {@link expireTime}, signs with the client's
   * chain id, and submits the final signed transaction.
   *
   * @throws RPCError
   * Thrown when property lookup or transaction broadcast fails.
   *
   * @example
   * ```ts
   * await client.broadcast.sendOperations(
   *   [['vote', {
   *     voter: 'srbde',
   *     author: 'alice',
   *     permlink: 'field-notes',
   *     weight: 5_000
   *   }]],
   *   postingKey
   * )
   * ```
   */
  public async sendOperations(
    operations: Operation[],
    key: PrivateKey | PrivateKey[]
  ): Promise<TransactionConfirmation> {
    const props = await this.client.database.getDynamicGlobalProperties()

    const ref_block_num = props.head_block_number & 0xffff
    const ref_block_prefix = Buffer.from(
      props.head_block_id,
      'hex'
    ).readUInt32LE(4)
    const expiration = new Date(
      new Date(props.time + 'Z').getTime() + this.expireTime
    )
      .toISOString()
      .slice(0, -5)
    const extensions: any[] = []

    const tx: Transaction = {
      expiration,
      extensions,
      operations,
      ref_block_num,
      ref_block_prefix
    }

    const result = await this.send(this.sign(tx, key))
    // assert(result.expired === false, 'transaction expired')

    return result
  }

  /**
   * Signs a transaction with one or more private keys.
   *
   * @param transaction - Unsigned transaction with TAPOS fields and expiration.
   * @param key - Private key or keys required by the transaction authorities.
   * @returns The signed transaction with compact ECDSA signatures.
   *
   * @remarks
   * The signature digest includes the client's chain id, preventing signatures
   * from being replayed across Hive-compatible networks.
   *
   * @example
   * ```ts
   * const signed = client.broadcast.sign(transaction, activeKey)
   * console.log(signed.signatures)
   * ```
   *
   * @see {@link cryptoUtils.signTransaction}
   */
  public sign(
    transaction: Transaction,
    key: PrivateKey | PrivateKey[]
  ): SignedTransaction {
    return cryptoUtils.signTransaction(transaction, key, this.client.chainId)
  }

  /**
   * Broadcasts an already signed transaction to the active RPC node.
   *
   * @param transaction - Signed transaction ready for network submission.
   * @returns Node confirmation enriched with the locally generated transaction id.
   *
   * @throws RPCError
   * Thrown when the node rejects the signed transaction.
   *
   * @example
   * ```ts
   * const signed = client.broadcast.sign(transaction, activeKey)
   * const confirmation = await client.broadcast.send(signed)
   * console.log(confirmation.id)
   * ```
   */
  public async send(
    transaction: SignedTransaction
  ): Promise<TransactionConfirmation> {
    const trxId = cryptoUtils.generateTrxId(transaction)
    const result = await this.call('broadcast_transaction', [transaction])
    return Object.assign({ id: trxId }, result)
  }

  /**
   * Sends a raw broadcast-related condenser API call.
   *
   * @param method - Condenser method name.
   * @param params - Positional method parameters.
   * @returns The decoded RPC result.
   *
   * @throws RPCError
   * Thrown when the node rejects the RPC call.
   *
   * @example
   * ```ts
   * const result = await client.broadcast.call('broadcast_transaction', [signed])
   * ```
   */
  public call(method: string, params?: any[]) {
    return this.client.call('condenser_api', method, params)
  }
}
