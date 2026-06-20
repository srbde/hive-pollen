[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ChangedRecoveryAccountOperation

# Interface: ChangedRecoveryAccountOperation

Defined in: [src/chain/operation.ts:1619](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1619)

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

> **0**: `"changed_recovery_account"`

Defined in: [src/chain/operation.ts:1620](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1620)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1621](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1621)

#### account

> **account**: `string`

#### new\_recovery\_account

> **new\_recovery\_account**: `string`

#### old\_recovery\_account

> **old\_recovery\_account**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
