[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / TransactionStatusAPI

# Class: TransactionStatusAPI

Defined in: [src/helpers/transaction.ts:49](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/helpers/transaction.ts#L49)

Helper for checking Hive transaction inclusion status.

## Remarks

The transaction status plugin reports whether a transaction is still unknown,
in the mempool, included in a reversible block, included irreversibly, or too
old to track. This is useful for user-facing broadcast confirmation flows.

## Example

```ts
const { status } = await client.transaction.findTransaction(txId)
console.log(status)
```

## Constructors

### Constructor

> **new TransactionStatusAPI**(`client`): `TransactionStatusAPI`

Defined in: [src/helpers/transaction.ts:55](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/helpers/transaction.ts#L55)

Creates a transaction-status helper bound to a client.

#### Parameters

##### client

[`Client`](Client.md)

Client used to call `transaction_status_api`.

#### Returns

`TransactionStatusAPI`

## Properties

### client

> `readonly` **client**: [`Client`](Client.md)

Defined in: [src/helpers/transaction.ts:55](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/helpers/transaction.ts#L55)

Client used to call `transaction_status_api`.

## Methods

### call()

> **call**\<`T`\>(`method`, `params?`): `Promise`\<`T`\>

Defined in: [src/helpers/transaction.ts:75](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/helpers/transaction.ts#L75)

Sends a raw `transaction_status_api` call.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### method

`string`

Transaction-status API method name.

##### params?

`unknown`

Method-specific parameter object.

#### Returns

`Promise`\<`T`\>

The decoded RPC result.

#### Throws

RPCError
Thrown when the active node does not expose the transaction-status plugin
or rejects the request.

#### Example

```ts
const result = await client.transaction.call('find_transaction', {
  transaction_id: txId
})
```

***

### findTransaction()

> **findTransaction**(`transaction_id`, `expiration?`): `Promise`\<\{ `status`: [`TransactionStatus`](../type-aliases/TransactionStatus.md); \}\>

Defined in: [src/helpers/transaction.ts:102](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/helpers/transaction.ts#L102)

Finds the current lifecycle status of a transaction id.

#### Parameters

##### transaction\_id

`string`

Hex transaction id to inspect.

##### expiration?

`string`

Optional transaction expiration timestamp, used by the
plugin to distinguish expired transactions from unknown ones.

#### Returns

`Promise`\<\{ `status`: [`TransactionStatus`](../type-aliases/TransactionStatus.md); \}\>

The transaction status reported by the node.

#### Throws

RPCError
Thrown when the plugin is unavailable or the transaction id is malformed.

#### Example

```ts
const { status } = await client.transaction.findTransaction(
  confirmation.id,
  transaction.expiration
)

if (status === 'within_irreversible_block') {
  console.log('Final')
}
```
