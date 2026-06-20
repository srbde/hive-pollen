[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Transaction

# Interface: Transaction

Defined in: [src/chain/transaction.ts:57](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/transaction.ts#L57)

Unsigned Hive transaction ready for serialization and signing.

## Remarks

`ref_block_num` and `ref_block_prefix` provide TAPOS protection by anchoring
the transaction to a recent block. `expiration` bounds how long witnesses may
accept the transaction.

## Example

```ts
const transaction: Transaction = {
  ref_block_num,
  ref_block_prefix,
  expiration,
  operations: [['vote', vote]],
  extensions: []
}
```

## Extended by

- [`SignedTransaction`](SignedTransaction.md)

## Properties

### expiration

> **expiration**: `string`

Defined in: [src/chain/transaction.ts:69](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/transaction.ts#L69)

UTC expiration timestamp without a trailing timezone suffix.

***

### extensions

> **extensions**: `unknown`[]

Defined in: [src/chain/transaction.ts:78](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/transaction.ts#L78)

Transaction extension values. Hive currently expects this to be empty for
the operations supported by Pollen.

***

### operations

> **operations**: [`Operation`](../type-aliases/Operation.md)[]

Defined in: [src/chain/transaction.ts:73](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/transaction.ts#L73)

Ordered operation list executed atomically by the chain.

***

### ref\_block\_num

> **ref\_block\_num**: `number`

Defined in: [src/chain/transaction.ts:61](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/transaction.ts#L61)

Lower 16 bits of the referenced head block number.

***

### ref\_block\_prefix

> **ref\_block\_prefix**: `number`

Defined in: [src/chain/transaction.ts:65](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/transaction.ts#L65)

Prefix extracted from the referenced block id.
