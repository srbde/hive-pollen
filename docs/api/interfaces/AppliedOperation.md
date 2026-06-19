[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AppliedOperation

# Interface: AppliedOperation

Defined in: [src/chain/operation.ts:296](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L296)

Operation record annotated with block and transaction position.

## Remarks

`get_ops_in_block` and account-history calls return applied operations so
indexers can preserve exact chain order and distinguish virtual operations.

## Example

```ts
const operations = await client.database.getOperations(90_000_000)
console.log(operations[0].block, operations[0].op[0])
```

## Properties

### block

> **block**: `number`

Defined in: [src/chain/operation.ts:298](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L298)

***

### op

> **op**: [`Operation`](../type-aliases/Operation.md)

Defined in: [src/chain/operation.ts:303](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L303)

***

### op\_in\_trx

> **op\_in\_trx**: `number`

Defined in: [src/chain/operation.ts:300](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L300)

***

### timestamp

> **timestamp**: `string`

Defined in: [src/chain/operation.ts:302](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L302)

***

### trx\_id

> **trx\_id**: `string`

Defined in: [src/chain/operation.ts:297](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L297)

***

### trx\_in\_block

> **trx\_in\_block**: `number`

Defined in: [src/chain/operation.ts:299](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L299)

***

### virtual\_op

> **virtual\_op**: `number`

Defined in: [src/chain/operation.ts:301](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L301)
