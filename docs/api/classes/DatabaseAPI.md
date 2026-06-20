[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DatabaseAPI

# Class: DatabaseAPI

Defined in: [src/helpers/database.ts:267](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L267)

Read-only helper for Hive condenser/database RPC methods.

## Remarks

`DatabaseAPI` wraps the broad read surface used by wallets, indexers, and
publishing tools. Methods here keep raw condenser names visible for protocol
familiarity while returning Pollen chain types such as [Asset](Asset.md),
[Price](Price.md), and [ExtendedAccount](../interfaces/ExtendedAccount.md) where richer parsing is useful.

## Example

```ts
import { Client } from '@srbde/pollen'

const client = new Client('https://api.hive.blog')
const [account] = await client.database.getAccounts(['srbde'])

console.log(account.reputation, account.posting_json_metadata)
```

## See

[Client.call](Client.md#call)

## Constructors

### Constructor

> **new DatabaseAPI**(`client`): `DatabaseAPI`

Defined in: [src/helpers/database.ts:273](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L273)

Creates a database helper bound to a client.

#### Parameters

##### client

[`Client`](Client.md)

Client used to send condenser API calls.

#### Returns

`DatabaseAPI`

## Properties

### client

> `readonly` **client**: [`Client`](Client.md)

Defined in: [src/helpers/database.ts:273](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L273)

Client used to send condenser API calls.

## Methods

### call()

> **call**\<`T`\>(`method`, `params?`): `Promise`\<`T`\>

Defined in: [src/helpers/database.ts:304](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L304)

Sends a raw condenser API call through the parent client.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### method

`string`

Bare condenser method name **without** the `condenser_api.`
prefix. This helper automatically prepends `condenser_api.` before
forwarding the call, so including the prefix yourself will produce a
double-prefixed method name (e.g. `condenser_api.condenser_api.foo`) that
every node will reject with an `RPCError: Unable to map request to endpoint`.

##### params?

`unknown`[]

Positional parameters for the method.

#### Returns

`Promise`\<`T`\>

The decoded RPC result.

#### Throws

RPCError
Thrown when the RPC node rejects the call or the method is unavailable.

#### Example

```ts
// Correct — 'condenser_api.' is added automatically
const result = await client.database.call('get_config')
console.log(result.HIVE_BLOCK_INTERVAL)

// Also correct
const votes = await client.database.call('list_proposal_votes', [
  [], 100, 'by_voter_proposal', 'ascending', 'votable'
])

// Wrong — sends condenser_api.condenser_api.list_proposal_votes → RPCError
const votes = await client.database.call('condenser_api.list_proposal_votes', [...])
```

***

### getAccountHistory()

> **getAccountHistory**(`account`, `from`, `limit`, `filter?`): `Promise`\<\[`number`, [`AccountHistoryEntry`](../interfaces/AccountHistoryEntry.md)\][]\>

Defined in: [src/helpers/database.ts:599](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L599)

Fetches historical operations for an account.

#### Parameters

##### account

`string`

Account whose history should be read.

##### from

`number`

Starting history index. Use `-1` for the most recent entry.
Walk backwards by using the lowest index from each batch minus 1 as the
next `from`.

##### limit

`number`

Maximum entries to return, up to 1000.

##### filter?

\[`bigint`, `bigint`\]

Optional `[low, high]` BigInt pair from [opFilter](../functions/opFilter.md).
Asks the node to return only the selected operation types, avoiding
client-side discard. Must stay as `bigint` through serialization — passing
`Number(bigint)` loses precision for bits ≥ 53 (e.g. `fill_order` is bit 57).

#### Returns

`Promise`\<\[`number`, [`AccountHistoryEntry`](../interfaces/AccountHistoryEntry.md)\][]\>

Array of `[index, AccountHistoryEntry]` tuples, newest-first when
walking from `-1`.

#### Example

```ts
import { OP, opFilter } from '@srbde/pollen'

const [low, high] = opFilter(OP.fill_order)
const history = await client.database.getAccountHistory('srbde', -1, 1000, [low, high])
const fills = history.filter(([, e]) => e.op[0] === 'fill_order')
```

***

### getAccounts()

> **getAccounts**(`usernames`): `Promise`\<[`ExtendedAccount`](../interfaces/ExtendedAccount.md)[]\>

Defined in: [src/helpers/database.ts:549](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L549)

Fetches extended account objects for one or more account names.

#### Parameters

##### usernames

`string`[]

Account names to fetch.

#### Returns

`Promise`\<[`ExtendedAccount`](../interfaces/ExtendedAccount.md)[]\>

Extended account records, including balances, authority metadata,
reputation, and JSON metadata.

#### Throws

RPCError
Thrown when the RPC node rejects the account lookup.

#### Example

```ts
const [account] = await client.database.getAccounts(['srbde'])
console.log(account.name, account.reputation)
```

***

### getBlock()

> **getBlock**(`blockNum`): `Promise`\<[`SignedBlock`](../interfaces/SignedBlock.md)\>

Defined in: [src/helpers/database.ts:473](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L473)

Fetches a full signed block by number.

#### Parameters

##### blockNum

`number`

One-based Hive block number.

#### Returns

`Promise`\<[`SignedBlock`](../interfaces/SignedBlock.md)\>

The signed block, including transactions and extensions.

#### Throws

RPCError
Thrown when the block does not exist or the node rejects the request.

#### Example

```ts
const block = await client.database.getBlock(90_000_000)
console.log(block.transactions.length)
```

***

### getBlockHeader()

> **getBlockHeader**(`blockNum`): `Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

Defined in: [src/helpers/database.ts:454](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L454)

Fetches the header for a specific block number.

#### Parameters

##### blockNum

`number`

One-based Hive block number.

#### Returns

`Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

The signed block header without transaction bodies.

#### Throws

RPCError
Thrown when the block does not exist or the node rejects the request.

#### Example

```ts
const header = await client.database.getBlockHeader(90_000_000)
console.log(header.previous)
```

***

### getChainProperties()

> **getChainProperties**(): `Promise`\<[`ChainProperties`](../interfaces/ChainProperties.md)\>

Defined in: [src/helpers/database.ts:341](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L341)

Fetches witness-voted median chain properties.

#### Returns

`Promise`\<[`ChainProperties`](../interfaces/ChainProperties.md)\>

Chain settings such as account creation fee and maximum block size.

#### Throws

RPCError
Thrown when the RPC node cannot read chain properties.

#### Example

```ts
const props = await client.database.getChainProperties()
console.log(props.account_creation_fee.toString())
```

***

### getConfig()

> **getConfig**(): `Promise`\<\{\[`name`: `string`\]: `string` \| `number` \| `boolean`; \}\>

Defined in: [src/helpers/database.ts:435](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L435)

Fetches static protocol constants exposed by the RPC node.

#### Returns

`Promise`\<\{\[`name`: `string`\]: `string` \| `number` \| `boolean`; \}\>

A name-value map of chain configuration constants.

#### Remarks

Config values are useful when deriving UI limits, validating operation
payloads, or teaching protocol defaults in the VitePress hub.

#### Throws

RPCError
Thrown when the node cannot serve `get_config`.

#### Example

```ts
const config = await client.database.getConfig()
console.log(config.HIVE_BLOCK_INTERVAL)
```

#### See

https://github.com/steemit/steem/blob/master/libraries/protocol/include/steemit/protocol/config.hpp

***

### getCurrentMedianHistoryPrice()

> **getCurrentMedianHistoryPrice**(): `Promise`\<[`Price`](Price.md)\>

Defined in: [src/helpers/database.ts:384](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L384)

Fetches the witness median market price for HIVE denominated in HBD.

#### Returns

`Promise`\<[`Price`](Price.md)\>

A parsed [Price](Price.md) containing the base and quote assets.

#### Throws

RPCError
Thrown when the RPC node cannot serve the price feed.

#### Example

```ts
const price = await client.database.getCurrentMedianHistoryPrice()
console.log(`${price.base} per ${price.quote}`)
```

***

### getDiscussions()

> **getDiscussions**(`by`, `query`): `Promise`\<[`Discussion`](../interfaces/Discussion.md)[]\>

Defined in: [src/helpers/database.ts:526](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L526)

Fetches discussion records such as posts, comments, blog entries, or feeds.

#### Parameters

##### by

[`DiscussionQueryCategory`](../type-aliases/DiscussionQueryCategory.md)

Discussion category that selects the condenser method suffix.

##### query

[`DisqussionQuery`](../interfaces/DisqussionQuery.md)

Category-specific query fields, including tag/account and
pagination values.

#### Returns

`Promise`\<[`Discussion`](../interfaces/Discussion.md)[]\>

Discussion objects as returned by condenser.

#### Remarks

For `blog` and `feed`, set `query.tag` to the account name. For tag-based
categories such as `trending`, set it to the community or content tag.

#### Throws

RPCError
Thrown when the query is invalid or the selected discussion method is
unavailable on the node.

#### Example

```ts
const posts = await client.database.getDiscussions('blog', {
  tag: 'srbde',
  limit: 5,
  truncate_body: 256
})

console.log(posts.map((post) => post.permlink))
```

***

### getDynamicGlobalProperties()

> **getDynamicGlobalProperties**(): `Promise`\<[`DynamicGlobalProperties`](../interfaces/DynamicGlobalProperties.md)\>

Defined in: [src/helpers/database.ts:323](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L323)

Fetches the dynamic global state maintained by the current RPC node.

#### Returns

`Promise`\<[`DynamicGlobalProperties`](../interfaces/DynamicGlobalProperties.md)\>

Head block, irreversible block, supply, vesting, witness, and
timing data used by Hive applications.

#### Throws

RPCError
Thrown when the node cannot serve `get_dynamic_global_properties`.

#### Example

```ts
const props = await client.database.getDynamicGlobalProperties()
console.log(props.head_block_number, props.time)
```

***

### getOpenOrders()

> **getOpenOrders**(`account`): `Promise`\<[`OpenOrder`](../interfaces/OpenOrder.md)[]\>

Defined in: [src/helpers/database.ts:636](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L636)

Fetches all currently open limit orders for a single account.

#### Parameters

##### account

`string`

Hive account name.

#### Returns

`Promise`\<[`OpenOrder`](../interfaces/OpenOrder.md)[]\>

All open orders for the account in a single call — no pagination.

#### Remarks

`sell_price` uses human-readable strings (`"11089.628 HIVE"`) rather than
[HiveAsset](../interfaces/HiveAsset.md) millis objects. Use `order.real_price` for the
pre-computed HBD-per-HIVE price. `for_sale` reflects the **remaining**
amount — compare to the parsed `sell_price.base` to detect partial fills.

To determine bid vs ask:
```ts
const isAsk = order.sell_price.base.endsWith('HIVE')  // selling HIVE for HBD
const isBid = order.sell_price.base.endsWith('HBD')   // selling HBD for HIVE
```

#### Example

```ts
const orders = await client.database.getOpenOrders('myaccount')
for (const order of orders) {
  console.log(order.orderid, order.real_price, order.for_sale)
}
```

***

### getOperations()

> **getOperations**(`blockNum`, `onlyVirtual?`): `Promise`\<[`AppliedOperation`](../interfaces/AppliedOperation.md)[]\>

Defined in: [src/helpers/database.ts:495](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L495)

Fetches applied operations recorded in a block.

#### Parameters

##### blockNum

`number`

One-based Hive block number.

##### onlyVirtual?

`boolean` = `false`

When true, returns only virtual operations generated by
chain processing.

#### Returns

`Promise`\<[`AppliedOperation`](../interfaces/AppliedOperation.md)[]\>

Applied operation records with transaction and operation indexes.

#### Throws

RPCError
Thrown when the block cannot be read or the operation-history plugin is not
available on the node.

#### Example

```ts
const operations = await client.database.getOperations(90_000_000)
console.log(operations.map((applied) => applied.op[0]))
```

***

### getState()

> **getState**(`path`): `Promise`\<`unknown`\>

Defined in: [src/helpers/database.ts:366](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L366)

Fetches condenser state for a Hive-style URL path.

#### Parameters

##### path

`string`

Path component using condenser's routing scheme, such as
`@srbde` or `trending/hive-139531`.

#### Returns

`Promise`\<`unknown`\>

The mixed state bundle returned by the condenser API.

#### Remarks

This method mirrors the legacy condenser state endpoint. Prefer focused
helpers such as [getAccounts](#getaccounts) or [getDiscussions](#getdiscussions) when an app
only needs one resource category.

#### Throws

RPCError
Thrown when the RPC node rejects the state lookup.

#### Example

```ts
const state = await client.database.getState('trending/hive-139531')
console.log(Object.keys(state.content))
```

***

### getTransaction()

> **getTransaction**(`txId`): `Promise`\<[`SignedTransaction`](../interfaces/SignedTransaction.md)\>

Defined in: [src/helpers/database.ts:571](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L571)

Fetches a signed transaction by transaction id.

#### Parameters

##### txId

`string`

Hex transaction id.

#### Returns

`Promise`\<[`SignedTransaction`](../interfaces/SignedTransaction.md)\>

The signed transaction stored by the account-history plugin.

#### Throws

RPCError
Thrown when the transaction is unknown or the node lacks transaction lookup
support.

#### Example

```ts
const transaction = await client.database.getTransaction(
  '0000000000000000000000000000000000000000'
)
console.log(transaction.operations)
```

***

### getVersion()

> **getVersion**(): `Promise`\<`object`\>

Defined in: [src/helpers/database.ts:717](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L717)

Fetches version information from the active RPC node.

#### Returns

`Promise`\<`object`\>

Version fields reported by the node software.

#### Throws

RPCError
Thrown when the node does not expose `get_version`.

#### Example

```ts
const version = await client.database.getVersion()
console.log(version)
```

***

### getVestingDelegations()

> **getVestingDelegations**(`account`, `from?`, `limit?`): `Promise`\<[`VestingDelegation`](../interfaces/VestingDelegation.md)[]\>

Defined in: [src/helpers/database.ts:407](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L407)

Fetches vesting delegations made by an account.

#### Parameters

##### account

`string`

Delegator account name.

##### from?

`string` = `""`

Delegatee account name to start after for pagination.

##### limit?

`number` = `1000`

Maximum number of delegations to return, up to 1000.

#### Returns

`Promise`\<[`VestingDelegation`](../interfaces/VestingDelegation.md)[]\>

Delegation records ordered by delegatee.

#### Throws

RPCError
Thrown when the account is invalid or the node rejects the request.

#### Example

```ts
const delegations = await client.database.getVestingDelegations('srbde', '', 50)
for (const delegation of delegations) {
  console.log(delegation.delegatee, delegation.vesting_shares.toString())
}
```

***

### listLimitOrders()

> **listLimitOrders**(`params`): `Promise`\<[`ListLimitOrdersResponse`](../interfaces/ListLimitOrdersResponse.md)\>

Defined in: [src/helpers/database.ts:699](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L699)

Lists open limit orders across the entire internal market, paginated by account.

#### Parameters

##### params

[`ListLimitOrdersParams`](../interfaces/ListLimitOrdersParams.md)

Cursor `start` as `["", 0]` for the first page, then the
last returned `[seller, orderid]` for subsequent pages. `limit` up to 1000.
`order` must be `"by_account"` — `"by_price"` throws a `bad_cast_exception`
on all tested nodes.

#### Returns

`Promise`\<[`ListLimitOrdersResponse`](../interfaces/ListLimitOrdersResponse.md)\>

Up to `limit` open orders with seller account names and full price data.

#### Remarks

Prefer this over `market_history_api.get_order_book` when seller identity or
the complete order book is needed: `get_order_book` caps at 500 entries per
side and omits the seller. As of 2026-06-19 the full market has ~1349 orders,
requiring two pages at `limit=1000`. Use `[seller, orderid]` of the last entry
as the next `start` and loop until batch size < limit.

To determine bid vs ask from `sell_price`:
```ts
import { HIVE_NAI, HBD_NAI } from '@srbde/pollen'

const isAsk = order.sell_price.base.nai === HIVE_NAI  // selling HIVE for HBD
const isBid = order.sell_price.base.nai === HBD_NAI   // selling HBD for HIVE
```

#### Example

```ts
const orders: LimitOrder[] = []
let cursor: [string, number] = ['', 0]
while (true) {
  const { orders: page } = await client.database.listLimitOrders({
    start: cursor, limit: 1000, order: 'by_account'
  })
  orders.push(...page)
  if (page.length < 1000) break
  cursor = [page.at(-1)!.seller, page.at(-1)!.orderid]
}
```

***

### verifyAuthority()

> **verifyAuthority**(`stx`): `Promise`\<`boolean`\>

Defined in: [src/helpers/database.ts:657](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L657)

Verifies that a signed transaction satisfies Hive authority rules.

#### Parameters

##### stx

[`SignedTransaction`](../interfaces/SignedTransaction.md)

Signed transaction to verify.

#### Returns

`Promise`\<`boolean`\>

True when the signatures satisfy the transaction's required
authorities.

#### Throws

RPCError
Thrown when the node rejects the transaction or cannot evaluate authority.

#### Example

```ts
const signed = client.broadcast.sign(transaction, privateKey)
const ok = await client.database.verifyAuthority(signed)
console.log(ok)
```
