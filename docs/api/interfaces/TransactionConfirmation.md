[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / TransactionConfirmation

# Interface: TransactionConfirmation

Defined in: [src/chain/transaction.ts:114](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/transaction.ts#L114)

Confirmation returned after broadcasting a transaction.

## Remarks

The local transaction id is added by Pollen after signing, while block and
transaction indexes are supplied by the RPC node when available.

## Example

```ts
const confirmation = await client.broadcast.transfer(transfer, activeKey)
console.log(confirmation.id, confirmation.block_num)
```

## Properties

### block\_num

> **block\_num**: `number`

Defined in: [src/chain/transaction.ts:122](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/transaction.ts#L122)

Block number that accepted the transaction.

***

### expired

> **expired**: `boolean`

Defined in: [src/chain/transaction.ts:130](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/transaction.ts#L130)

Whether the node considered the transaction expired.

***

### id

> **id**: `string`

Defined in: [src/chain/transaction.ts:118](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/transaction.ts#L118)

Transaction id.

***

### trx\_num

> **trx\_num**: `number`

Defined in: [src/chain/transaction.ts:126](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/transaction.ts#L126)

Transaction index within the accepting block.
