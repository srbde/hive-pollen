[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AppliedOperation

# Interface: AppliedOperation

Defined in: [src/chain/operation.ts:193](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L193)

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

Defined in: [src/chain/operation.ts:195](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L195)

***

### op

> **op**: [`Operation`](Operation.md)

Defined in: [src/chain/operation.ts:200](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L200)

***

### op\_in\_trx

> **op\_in\_trx**: `number`

Defined in: [src/chain/operation.ts:197](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L197)

***

### timestamp

> **timestamp**: `string`

Defined in: [src/chain/operation.ts:199](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L199)

***

### trx\_id

> **trx\_id**: `string`

Defined in: [src/chain/operation.ts:194](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L194)

***

### trx\_in\_block

> **trx\_in\_block**: `number`

Defined in: [src/chain/operation.ts:196](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L196)

***

### virtual\_op

> **virtual\_op**: `number`

Defined in: [src/chain/operation.ts:198](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L198)
