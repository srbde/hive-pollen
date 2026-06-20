[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / FillVestingWithdrawOperation

# Interface: FillVestingWithdrawOperation

Defined in: [src/chain/operation.ts:1434](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1434)

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

> **0**: `"fill_vesting_withdraw"`

Defined in: [src/chain/operation.ts:1435](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1435)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1436](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1436)

#### deposited

> **deposited**: `string` \| [`Asset`](../classes/Asset.md)

#### from\_account

> **from\_account**: `string`

#### to\_account

> **to\_account**: `string`

#### withdrawn

> **withdrawn**: `string` \| [`Asset`](../classes/Asset.md)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
