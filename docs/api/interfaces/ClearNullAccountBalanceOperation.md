[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ClearNullAccountBalanceOperation

# Interface: ClearNullAccountBalanceOperation

Defined in: [src/chain/operation.ts:1518](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1518)

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

> **0**: `"clear_null_account_balance"`

Defined in: [src/chain/operation.ts:1519](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1519)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1520](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1520)

#### total\_cleared

> **total\_cleared**: (`string` \| [`Asset`](../classes/Asset.md))[]

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
