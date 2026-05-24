/**
 * @file Database API helpers.
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

import { ExtendedAccount } from "../chain/account.js";
import { Price } from "../chain/asset.js";
import { BlockHeader, SignedBlock } from "../chain/block.js";
import { Discussion } from "../chain/comment.js";
import { DynamicGlobalProperties } from "../chain/misc.js";
import { ChainProperties, VestingDelegation } from "../chain/misc.js";
import { AppliedOperation } from "../chain/operation.js";
import { SignedTransaction, TransactionConfirmation } from "../chain/transaction.js";
import { Client } from "./../client.js";

/**
 * Sort or lookup category used by Hive's `get_discussions_by_*` RPC family.
 *
 * @remarks
 * Categories map directly to condenser API method suffixes. For `blog` and
 * `feed`, Hive expects the query `tag` to be an account name rather than a
 * content tag.
 *
 * @example
 * ```ts
 * const posts = await client.database.getDiscussions('trending', {
 *   tag: 'hive-139531',
 *   limit: 10
 * })
 * ```
 */
export type DiscussionQueryCategory =
  | "active"
  | "blog"
  | "cashout"
  | "children"
  | "comments"
  | "feed"
  | "hot"
  | "promoted"
  | "trending"
  | "votes"
  | "created";

/**
 * Query shape accepted by Hive discussion listing endpoints.
 *
 * @remarks
 * The name is preserved for API compatibility even though the historical type
 * spelling is `DisqussionQuery`.
 *
 * @example
 * ```ts
 * const query: DisqussionQuery = {
 *   tag: 'photography',
 *   limit: 20,
 *   truncate_body: 512
 * }
 * ```
 */
export interface DisqussionQuery {
  /**
   * Name of author or tag to fetch.
   */
  tag?: string;
  /**
   * Number of results, max 100.
   */
  limit: number;
  filter_tags?: string[];
  select_authors?: string[];
  select_tags?: string[];
  /**
   * Number of bytes of post body to fetch, default 0 (all)
   */
  truncate_body?: number;
  /**
   * Name of author to start from, used for paging.
   * Should be used in conjunction with `start_permlink`.
   */
  start_author?: string;
  /**
   * Permalink of post to start from, used for paging.
   * Should be used in conjunction with `start_author`.
   */
  start_permlink?: string;
  parent_author?: string;
  parent_permlink?: string;
}

/**
 * Read-only helper for Hive condenser/database RPC methods.
 *
 * @remarks
 * `DatabaseAPI` wraps the broad read surface used by wallets, indexers, and
 * publishing tools. Methods here keep raw condenser names visible for protocol
 * familiarity while returning Pollen chain types such as {@link Asset},
 * {@link Price}, and {@link ExtendedAccount} where richer parsing is useful.
 *
 * @example
 * ```ts
 * import { Client } from '@srbde/pollen'
 *
 * const client = new Client('https://api.hive.blog')
 * const [account] = await client.database.getAccounts(['srbde'])
 *
 * console.log(account.reputation, account.posting_json_metadata)
 * ```
 *
 * @see {@link Client.call}
 */
export class DatabaseAPI {
  /**
   * Creates a database helper bound to a client.
   *
   * @param client - Client used to send condenser API calls.
   */
  constructor(readonly client: Client) {}

  /**
   * Sends a raw condenser API call through the parent client.
   *
   * @param method - Condenser method name, without an API prefix.
   * @param params - Positional parameters for the method.
   * @returns The decoded RPC result.
   *
   * @throws RPCError
   * Thrown when the RPC node rejects the call or the method is unavailable.
   *
   * @example
   * ```ts
   * const result = await client.database.call('get_config')
   * console.log(result.HIVE_BLOCK_INTERVAL)
   * ```
   */
  public call(method: string, params?: any[]) {
    return this.client.call("condenser_api", method, params);
  }

  /**
   * Fetches the dynamic global state maintained by the current RPC node.
   *
   * @returns Head block, irreversible block, supply, vesting, witness, and
   * timing data used by Hive applications.
   *
   * @throws RPCError
   * Thrown when the node cannot serve `get_dynamic_global_properties`.
   *
   * @example
   * ```ts
   * const props = await client.database.getDynamicGlobalProperties()
   * console.log(props.head_block_number, props.time)
   * ```
   */
  public getDynamicGlobalProperties(): Promise<DynamicGlobalProperties> {
    return this.call("get_dynamic_global_properties");
  }

  /**
   * Fetches witness-voted median chain properties.
   *
   * @returns Chain settings such as account creation fee and maximum block size.
   *
   * @throws RPCError
   * Thrown when the RPC node cannot read chain properties.
   *
   * @example
   * ```ts
   * const props = await client.database.getChainProperties()
   * console.log(props.account_creation_fee.toString())
   * ```
   */
  public async getChainProperties(): Promise<ChainProperties> {
    return this.call("get_chain_properties");
  }

  /**
   * Fetches condenser state for a Hive-style URL path.
   *
   * @param path - Path component using condenser's routing scheme, such as
   * `@srbde` or `trending/hive-139531`.
   * @returns The mixed state bundle returned by the condenser API.
   *
   * @remarks
   * This method mirrors the legacy condenser state endpoint. Prefer focused
   * helpers such as {@link getAccounts} or {@link getDiscussions} when an app
   * only needs one resource category.
   *
   * @throws RPCError
   * Thrown when the RPC node rejects the state lookup.
   *
   * @example
   * ```ts
   * const state = await client.database.getState('trending/hive-139531')
   * console.log(Object.keys(state.content))
   * ```
   */
  public async getState(path: string): Promise<any> {
    return this.call("get_state", [path]);
  }

  /**
   * Fetches the witness median market price for HIVE denominated in HBD.
   *
   * @returns A parsed {@link Price} containing the base and quote assets.
   *
   * @throws RPCError
   * Thrown when the RPC node cannot serve the price feed.
   *
   * @example
   * ```ts
   * const price = await client.database.getCurrentMedianHistoryPrice()
   * console.log(`${price.base} per ${price.quote}`)
   * ```
   */
  public async getCurrentMedianHistoryPrice(): Promise<Price> {
    return Price.from(await this.call("get_current_median_history_price"));
  }

  /**
   * Fetches vesting delegations made by an account.
   *
   * @param account - Delegator account name.
   * @param from - Delegatee account name to start after for pagination.
   * @param limit - Maximum number of delegations to return, up to 1000.
   * @returns Delegation records ordered by delegatee.
   *
   * @throws RPCError
   * Thrown when the account is invalid or the node rejects the request.
   *
   * @example
   * ```ts
   * const delegations = await client.database.getVestingDelegations('srbde', '', 50)
   * for (const delegation of delegations) {
   *   console.log(delegation.delegatee, delegation.vesting_shares.toString())
   * }
   * ```
   */
  public async getVestingDelegations(
    account: string,
    from = "",
    limit = 1000,
  ): Promise<VestingDelegation[]> {
    return this.call("get_vesting_delegations", [account, from, limit]);
  }

  /**
   * Fetches static protocol constants exposed by the RPC node.
   *
   * @returns A name-value map of chain configuration constants.
   *
   * @remarks
   * Config values are useful when deriving UI limits, validating operation
   * payloads, or teaching protocol defaults in the VitePress hub.
   *
   * @throws RPCError
   * Thrown when the node cannot serve `get_config`.
   *
   * @example
   * ```ts
   * const config = await client.database.getConfig()
   * console.log(config.HIVE_BLOCK_INTERVAL)
   * ```
   *
   * @see https://github.com/steemit/steem/blob/master/libraries/protocol/include/steemit/protocol/config.hpp
   */
  public getConfig(): Promise<{ [name: string]: string | number | boolean }> {
    return this.call("get_config");
  }

  /**
   * Fetches the header for a specific block number.
   *
   * @param blockNum - One-based Hive block number.
   * @returns The signed block header without transaction bodies.
   *
   * @throws RPCError
   * Thrown when the block does not exist or the node rejects the request.
   *
   * @example
   * ```ts
   * const header = await client.database.getBlockHeader(90_000_000)
   * console.log(header.previous)
   * ```
   */
  public getBlockHeader(blockNum: number): Promise<BlockHeader> {
    return this.call("get_block_header", [blockNum]);
  }

  /**
   * Fetches a full signed block by number.
   *
   * @param blockNum - One-based Hive block number.
   * @returns The signed block, including transactions and extensions.
   *
   * @throws RPCError
   * Thrown when the block does not exist or the node rejects the request.
   *
   * @example
   * ```ts
   * const block = await client.database.getBlock(90_000_000)
   * console.log(block.transactions.length)
   * ```
   */
  public getBlock(blockNum: number): Promise<SignedBlock> {
    return this.call("get_block", [blockNum]);
  }

  /**
   * Fetches applied operations recorded in a block.
   *
   * @param blockNum - One-based Hive block number.
   * @param onlyVirtual - When true, returns only virtual operations generated by
   * chain processing.
   * @returns Applied operation records with transaction and operation indexes.
   *
   * @throws RPCError
   * Thrown when the block cannot be read or the operation-history plugin is not
   * available on the node.
   *
   * @example
   * ```ts
   * const operations = await client.database.getOperations(90_000_000)
   * console.log(operations.map((applied) => applied.op[0]))
   * ```
   */
  public getOperations(blockNum: number, onlyVirtual = false): Promise<AppliedOperation[]> {
    return this.call("get_ops_in_block", [blockNum, onlyVirtual]);
  }

  /**
   * Fetches discussion records such as posts, comments, blog entries, or feeds.
   *
   * @param by - Discussion category that selects the condenser method suffix.
   * @param query - Category-specific query fields, including tag/account and
   * pagination values.
   * @returns Discussion objects as returned by condenser.
   *
   * @remarks
   * For `blog` and `feed`, set `query.tag` to the account name. For tag-based
   * categories such as `trending`, set it to the community or content tag.
   *
   * @throws RPCError
   * Thrown when the query is invalid or the selected discussion method is
   * unavailable on the node.
   *
   * @example
   * ```ts
   * const posts = await client.database.getDiscussions('blog', {
   *   tag: 'srbde',
   *   limit: 5,
   *   truncate_body: 256
   * })
   *
   * console.log(posts.map((post) => post.permlink))
   * ```
   */
  public getDiscussions(
    by: DiscussionQueryCategory,
    query: DisqussionQuery,
  ): Promise<Discussion[]> {
    return this.call(`get_discussions_by_${by}`, [query]);
  }

  /**
   * Fetches extended account objects for one or more account names.
   *
   * @param usernames - Account names to fetch.
   * @returns Extended account records, including balances, authority metadata,
   * reputation, and JSON metadata.
   *
   * @throws RPCError
   * Thrown when the RPC node rejects the account lookup.
   *
   * @example
   * ```ts
   * const [account] = await client.database.getAccounts(['srbde'])
   * console.log(account.name, account.reputation)
   * ```
   */
  public getAccounts(usernames: string[]): Promise<ExtendedAccount[]> {
    return this.call("get_accounts", [usernames]);
  }

  /**
   * Fetches a signed transaction by transaction id.
   *
   * @param txId - Hex transaction id.
   * @returns The signed transaction stored by the account-history plugin.
   *
   * @throws RPCError
   * Thrown when the transaction is unknown or the node lacks transaction lookup
   * support.
   *
   * @example
   * ```ts
   * const transaction = await client.database.getTransaction(
   *   '0000000000000000000000000000000000000000'
   * )
   * console.log(transaction.operations)
   * ```
   */
  public async getTransaction(txId: string): Promise<SignedTransaction> {
    return this.call("get_transaction", [txId]);
  }

  /**
   * Fetches historical operations for an account.
   *
   * @param account - Account whose history should be read.
   * @param from - Starting history index. Hive commonly uses `-1` for the most
   * recent entry.
   * @param limit - Maximum number of entries to return.
   * @param operation_bitmask - Optional operation filter generated by
   * `pollen.utils.makeBitMaskFilter()`.
   * @returns Tuples of account-history index and applied operation.
   *
   * @remarks
   * Operation bitmasks reduce bandwidth for account-history scans by asking the
   * node to return only selected operation types.
   *
   * @throws Error
   * Thrown when `operation_bitmask` is not the two-number tuple produced by the
   * Pollen utility helper.
   * @throws RPCError
   * Thrown when account history is unavailable or the node rejects the lookup.
   *
   * @example
   * ```ts
   * const op = pollen.utils.operationOrders
   * const operationsBitmask = pollen.utils.makeBitMaskFilter([
   *   op.transfer,
   *   op.transfer_to_vesting,
   *   op.withdraw_vesting,
   *   op.interest,
   *   op.liquidity_reward,
   *   op.transfer_to_savings,
   *   op.transfer_from_savings,
   *   op.escrow_transfer,
   *   op.cancel_transfer_from_savings,
   *   op.escrow_approve,
   *   op.escrow_dispute,
   *   op.escrow_release,
   *   op.fill_convert_request,
   *   op.fill_order,
   *   op.claim_reward_balance,
   * ])
   *
   * const history = await client.database.getAccountHistory(
   *   'srbde',
   *   -1,
   *   100,
   *   operationsBitmask
   * )
   */
  public getAccountHistory(
    account: string,
    from: number,
    limit: number,
    operation_bitmask?: [number, number],
  ): Promise<[[number, AppliedOperation]]> {
    let params = [account, from, limit];
    if (operation_bitmask && Array.isArray(operation_bitmask)) {
      if (operation_bitmask.length !== 2) {
        throw Error("operation_bitmask should be generated by the helper function");
      }
      params = params.concat(operation_bitmask);
    }
    return this.call("get_account_history", params);
  }

  /**
   * Verifies that a signed transaction satisfies Hive authority rules.
   *
   * @param stx - Signed transaction to verify.
   * @returns True when the signatures satisfy the transaction's required
   * authorities.
   *
   * @throws RPCError
   * Thrown when the node rejects the transaction or cannot evaluate authority.
   *
   * @example
   * ```ts
   * const signed = client.broadcast.sign(transaction, privateKey)
   * const ok = await client.database.verifyAuthority(signed)
   * console.log(ok)
   * ```
   */
  public async verifyAuthority(stx: SignedTransaction): Promise<boolean> {
    return this.call("verify_authority", [stx]);
  }

  /**
   * Fetches version information from the active RPC node.
   *
   * @returns Version fields reported by the node software.
   *
   * @throws RPCError
   * Thrown when the node does not expose `get_version`.
   *
   * @example
   * ```ts
   * const version = await client.database.getVersion()
   * console.log(version)
   * ```
   */
  public async getVersion(): Promise<object> {
    return this.call("get_version", []);
  }
}
