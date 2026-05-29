[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ConsolidateTreasuryBalanceOperation

# Interface: ConsolidateTreasuryBalanceOperation

Defined in: [src/chain/operation.ts:1574](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1574)

Generic Hive operation tuple.

## Remarks

Position `0` is the operation name; position `1` is the payload object. Use
the specific operation interfaces when constructing transactions so TypeScript
can validate the payload shape.

## Example

```ts
const op: Operation = ['transfer', {
  from: 'srbde',
  to: 'alice',
  amount: '1.000 HIVE',
  memo: 'Pollen'
}]
```

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"consolidate_treasury_balance"`

Defined in: [src/chain/operation.ts:1575](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1575)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1576](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1576)

#### total\_cleared?

> `optional` **total\_cleared?**: (`string` \| [`Asset`](../classes/Asset.md))[]

#### total\_moved?

> `optional` **total\_moved?**: (`string` \| [`Asset`](../classes/Asset.md))[]

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
