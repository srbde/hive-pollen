[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / BroadcastAPI

# Class: BroadcastAPI

Defined in: [src/helpers/broadcast.ts:148](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L148)

Helper for signing and broadcasting Hive operations.

## Remarks

`BroadcastAPI` turns typed operation payloads into signed Hive transactions,
derives TAPOS reference fields from the current head block, and submits the
signed transaction through the configured client. Signing uses Pollen's Noble
secp256k1-backed crypto layer through [cryptoUtils](../variables/cryptoUtils.md) for modern audited
primitives.

## Example

```ts
import { Client, PrivateKey } from '@srbde/pollen'

const client = new Client('https://api.hive.blog')
const key = PrivateKey.fromString(process.env.HIVE_ACTIVE_KEY!)

const confirmation = await client.broadcast.transfer(
  {
    from: 'srbde',
    to: 'alice',
    amount: '0.001 HIVE',
    memo: 'Pollen transfer'
  },
  key
)

console.log(confirmation.id)
```

## See

 - [cryptoUtils.signTransaction](../variables/cryptoUtils.md#signtransaction)
 - [Client.call](Client.md#call)

## Constructors

### Constructor

> **new BroadcastAPI**(`client`): `BroadcastAPI`

Defined in: [src/helpers/broadcast.ts:161](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L161)

Creates a broadcast helper bound to a client.

#### Parameters

##### client

[`Client`](Client.md)

Client used for chain-property reads and transaction
submission.

#### Returns

`BroadcastAPI`

## Properties

### client

> `readonly` **client**: [`Client`](Client.md)

Defined in: [src/helpers/broadcast.ts:161](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L161)

Client used for chain-property reads and transaction
submission.

***

### expireTime

> **expireTime**: `number`

Defined in: [src/helpers/broadcast.ts:153](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L153)

How many milliseconds in the future to set the expiry time to when
broadcasting a transaction, defaults to 1 minute.

## Methods

### call()

> **call**(`method`, `params?`): `Promise`\<`any`\>

Defined in: [src/helpers/broadcast.ts:630](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L630)

Sends a raw broadcast-related condenser API call.

#### Parameters

##### method

`string`

Condenser method name.

##### params?

`any`[]

Positional method parameters.

#### Returns

`Promise`\<`any`\>

The decoded RPC result.

#### Throws

RPCError
Thrown when the node rejects the RPC call.

#### Example

```ts
const result = await client.broadcast.call('broadcast_transaction', [signed])
```

***

### comment()

> **comment**(`comment`, `key`): `Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Defined in: [src/helpers/broadcast.ts:191](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L191)

Broadcasts a Hive `comment` operation.

#### Parameters

##### comment

Comment payload. Empty `parent_author` creates a top-level
post; a populated `parent_author` creates a reply.

###### author

`string`

###### body

`string`

###### json_metadata

`string`

###### parent_author

`string`

###### parent_permlink

`string`

###### permlink

`string`

###### title

`string`

##### key

[`PrivateKey`](PrivateKey.md)

Private posting key for `comment.author`.

#### Returns

`Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Transaction confirmation containing the generated transaction id.

#### Throws

RPCError
Thrown when the node rejects the transaction, the posting authority is
missing, or the comment payload violates chain rules.

#### Example

```ts
await client.broadcast.comment(
  {
    parent_author: '',
    parent_permlink: 'hive-139531',
    author: 'srbde',
    permlink: 'hello-pollen',
    title: 'Hello Pollen',
    body: 'Published through the Pollen SDK.',
    json_metadata: JSON.stringify({ tags: ['hive-139531'] })
  },
  postingKey
)
```

***

### commentWithOptions()

> **commentWithOptions**(`comment`, `options`, `key`): `Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Defined in: [src/helpers/broadcast.ts:225](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L225)

Broadcasts a comment together with its payout and beneficiary options.

#### Parameters

##### comment

Comment or post payload.

###### author

`string`

###### body

`string`

###### json_metadata

`string`

###### parent_author

`string`

###### parent_permlink

`string`

###### permlink

`string`

###### title

`string`

##### options

Matching `comment_options` payload for the same author and
permlink.

###### allow_curation_rewards

`boolean`

Whether to allow post to recieve curation rewards.

###### allow_votes

`boolean`

Whether to allow post to receive votes.

###### author

`string`

###### extensions

\[`0`, \{ `beneficiaries`: [`BeneficiaryRoute`](../interfaces/BeneficiaryRoute.md)[]; \}\][]

###### max_accepted_payout

`string` \| [`Asset`](Asset.md)

HBD value of the maximum payout this post will receive.

###### percent_hbd

`number`

The percent of Hive Dollars to key, unkept amounts will be received as Hive Power.

###### permlink

`string`

##### key

[`PrivateKey`](PrivateKey.md)

Private posting key for the comment author.

#### Returns

`Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Transaction confirmation containing the generated transaction id.

#### Remarks

Sending both operations in one transaction prevents a post from briefly
existing with default payout settings.

#### Throws

RPCError
Thrown when either operation fails chain validation.

#### Example

```ts
await client.broadcast.commentWithOptions(comment, {
  author: comment.author,
  permlink: comment.permlink,
  max_accepted_payout: '1000000.000 HBD',
  percent_hbd: 10000,
  allow_votes: true,
  allow_curation_rewards: true,
  extensions: []
}, postingKey)
```

***

### createTestAccount()

> **createTestAccount**(`options`, `key`): `Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Defined in: [src/helpers/broadcast.ts:359](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L359)

Creates and optionally delegates to a new account in test environments.

#### Parameters

##### options

[`CreateAccountOptions`](../interfaces/CreateAccountOptions.md)

New account name, authority source, creator, fee, optional
delegation, and metadata.

##### key

[`PrivateKey`](PrivateKey.md)

Private active key for `options.creator`.

#### Returns

`Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Transaction confirmation for the claim/create/delegate transaction.

#### Remarks

This helper is intentionally guarded for test suites. It can derive owner,
active, posting, and memo keys from a password or accept explicit authority
objects when tests need deterministic key material.

#### Throws

AssertionError
Thrown when called outside a Mocha-style test environment.

#### Throws

Error
Thrown when neither `password` nor `auths` is supplied, or when the provided
account-creation fee does not match chain properties.

#### Throws

RPCError
Thrown when the chain rejects the account creation transaction.

#### Example

```ts
await testnet.broadcast.createTestAccount(
  {
    username: 'pollen-dev',
    password: 'correct horse battery staple',
    creator: 'initminer',
    metadata: { app: 'pollen-tests' }
  },
  initminerActiveKey
)
```

***

### delegateVestingShares()

> **delegateVestingShares**(`options`, `key`): `Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Defined in: [src/helpers/broadcast.ts:505](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L505)

Delegates vesting shares from one account to another.

#### Parameters

##### options

Delegation payload containing delegator, delegatee, and
vesting share amount.

###### delegatee

`string`

The account receiving vesting shares.

###### delegator

`string`

The account delegating vesting shares.

###### vesting_shares

`string` \| [`Asset`](Asset.md)

The amount of vesting shares delegated.

##### key

[`PrivateKey`](PrivateKey.md)

Private active key for `options.delegator`.

#### Returns

`Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Transaction confirmation containing the generated transaction id.

#### Remarks

Delegated VESTS remain owned by the delegator, but voting influence and
resource capacity move to the delegatee. Setting `vesting_shares` to zero
removes the delegation; removed shares enter the protocol cooldown period
before they can vote again.

#### Throws

RPCError
Thrown when the delegator lacks active authority, the asset is invalid, or
the chain rejects the delegation.

#### Example

```ts
await client.broadcast.delegateVestingShares(
  {
    delegator: 'srbde',
    delegatee: 'alice',
    vesting_shares: '100.000000 VESTS'
  },
  activeKey
)
```

***

### json()

> **json**(`data`, `key`): `Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Defined in: [src/helpers/broadcast.ts:320](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L320)

Broadcasts a `custom_json` operation for application-level protocols.

#### Parameters

##### data

Custom JSON payload, including id, required authorities, and
serialized JSON string.

###### id

`string`

ID string, must be less than 32 characters long.

###### json

`string`

JSON encoded string, must be valid JSON.

###### required_auths

`string`[]

###### required_posting_auths

`string`[]

##### key

[`PrivateKey`](PrivateKey.md)

Private posting or active key matching the required authority
arrays.

#### Returns

`Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Transaction confirmation containing the generated transaction id.

#### Throws

RPCError
Thrown when authority requirements are not met or the payload is invalid.

#### Example

```ts
await client.broadcast.json(
  {
    required_auths: [],
    required_posting_auths: ['srbde'],
    id: 'pollen.demo',
    json: JSON.stringify({ nectar: 'ready' })
  },
  postingKey
)
```

***

### send()

> **send**(`transaction`): `Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Defined in: [src/helpers/broadcast.ts:609](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L609)

Broadcasts an already signed transaction to the active RPC node.

#### Parameters

##### transaction

[`SignedTransaction`](../interfaces/SignedTransaction.md)

Signed transaction ready for network submission.

#### Returns

`Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Node confirmation enriched with the locally generated transaction id.

#### Throws

RPCError
Thrown when the node rejects the signed transaction.

#### Example

```ts
const signed = client.broadcast.sign(transaction, activeKey)
const confirmation = await client.broadcast.send(signed)
console.log(confirmation.id)
```

***

### sendOperations()

> **sendOperations**(`operations`, `key`): `Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Defined in: [src/helpers/broadcast.ts:538](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L538)

Builds, signs, and broadcasts a transaction containing one or more operations.

#### Parameters

##### operations

[`Operation`](../interfaces/Operation.md)[]

Ordered Hive operations to include in the transaction.

##### key

[`PrivateKey`](PrivateKey.md) \| [`PrivateKey`](PrivateKey.md)[]

Private key or keys required by the operation authorities.

#### Returns

`Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Transaction confirmation containing the generated transaction id.

#### Remarks

Pollen reads dynamic global properties to derive TAPOS reference fields,
assigns an expiration based on [expireTime](#expiretime), signs with the client's
chain id, and submits the final signed transaction.

#### Throws

RPCError
Thrown when property lookup or transaction broadcast fails.

#### Example

```ts
await client.broadcast.sendOperations(
  [['vote', {
    voter: 'srbde',
    author: 'alice',
    permlink: 'field-notes',
    weight: 5_000
  }]],
  postingKey
)
```

***

### sign()

> **sign**(`transaction`, `key`): [`SignedTransaction`](../interfaces/SignedTransaction.md)

Defined in: [src/helpers/broadcast.ts:589](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L589)

Signs a transaction with one or more private keys.

#### Parameters

##### transaction

[`Transaction`](../interfaces/Transaction.md)

Unsigned transaction with TAPOS fields and expiration.

##### key

[`PrivateKey`](PrivateKey.md) \| [`PrivateKey`](PrivateKey.md)[]

Private key or keys required by the transaction authorities.

#### Returns

[`SignedTransaction`](../interfaces/SignedTransaction.md)

The signed transaction with compact ECDSA signatures.

#### Remarks

The signature digest includes the client's chain id, preventing signatures
from being replayed across Hive-compatible networks.

#### Example

```ts
const signed = client.broadcast.sign(transaction, activeKey)
console.log(signed.signatures)
```

#### See

[cryptoUtils.signTransaction](../variables/cryptoUtils.md#signtransaction)

***

### transfer()

> **transfer**(`data`, `key`): `Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Defined in: [src/helpers/broadcast.ts:290](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L290)

Broadcasts a liquid HIVE or HBD transfer.

#### Parameters

##### data

Transfer payload with sender, recipient, amount, and memo.

###### amount

`string` \| [`Asset`](Asset.md)

Amount of HIVE or HBD to send.

###### from

`string`

Sending account name.

###### memo

`string`

Plain-text note attached to transaction.

###### to

`string`

Receiving account name.

##### key

[`PrivateKey`](PrivateKey.md)

Private active key for `data.from`.

#### Returns

`Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Transaction confirmation containing the generated transaction id.

#### Throws

RPCError
Thrown when the sender lacks funds, active authority is missing, or the node
rejects the transaction.

#### Example

```ts
await client.broadcast.transfer(
  {
    from: 'srbde',
    to: 'alice',
    amount: '1.000 HIVE',
    memo: 'Invoice 42'
  },
  activeKey
)
```

***

### updateAccount()

> **updateAccount**(`data`, `key`): `Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Defined in: [src/helpers/broadcast.ts:470](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L470)

Broadcasts an `account_update` operation.

#### Parameters

##### data

Account update payload, including optional authorities,
memo key, and JSON metadata.

###### account

`string`

###### active?

[`AuthorityType`](../interfaces/AuthorityType.md)

###### json_metadata

`string`

###### memo_key

`string` \| [`PublicKey`](PublicKey.md)

###### owner?

[`AuthorityType`](../interfaces/AuthorityType.md)

###### posting?

[`AuthorityType`](../interfaces/AuthorityType.md)

##### key

[`PrivateKey`](PrivateKey.md)

Private key with sufficient authority for the fields being
changed.

#### Returns

`Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Transaction confirmation containing the generated transaction id.

#### Throws

RPCError
Thrown when the update lacks required authority or violates account rules.

#### Example

```ts
await client.broadcast.updateAccount(
  {
    account: 'srbde',
    memo_key: memoPublicKey,
    json_metadata: JSON.stringify({ profile: { name: 'SRBDE' } }),
    owner: undefined,
    active: undefined,
    posting: undefined
  },
  activeKey
)
```

***

### vote()

> **vote**(`vote`, `key`): `Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Defined in: [src/helpers/broadcast.ts:261](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L261)

Broadcasts a vote operation.

#### Parameters

##### vote

Vote payload including voter, author, permlink, and weight.

###### author

`string`

###### permlink

`string`

###### voter

`string`

###### weight

`number`

Voting weight, 100% = 10000 (100_PERCENT).

##### key

[`PrivateKey`](PrivateKey.md)

Private posting key for `vote.voter`.

#### Returns

`Promise`\<[`TransactionConfirmation`](../interfaces/TransactionConfirmation.md)\>

Transaction confirmation containing the generated transaction id.

#### Throws

RPCError
Thrown when the vote is outside chain limits or the posting authority is
invalid.

#### Example

```ts
await client.broadcast.vote(
  {
    voter: 'srbde',
    author: 'alice',
    permlink: 'field-notes',
    weight: 10_000
  },
  postingKey
)
```
