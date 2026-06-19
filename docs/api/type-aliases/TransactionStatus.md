[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / TransactionStatus

# Type Alias: TransactionStatus

> **TransactionStatus** = `"unknown"` \| `"within_mempool"` \| `"within_reversible_block"` \| `"within_irreversible_block"` \| `"expired_reversible"` \| `"expired_irreversible"` \| `"too_old"`

Defined in: [src/helpers/transaction.ts:22](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/transaction.ts#L22)

Lifecycle state reported by Hive's transaction-status plugin.

## Remarks

`within_reversible_block` means the transaction is included but not final.
`within_irreversible_block` is the stable state most applications should wait
for before treating a transaction as final.

## Example

```ts
const { status } = await client.transaction.findTransaction(txId)
const final = status === 'within_irreversible_block'
```
