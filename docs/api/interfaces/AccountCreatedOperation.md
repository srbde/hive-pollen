[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountCreatedOperation

# Interface: AccountCreatedOperation

Defined in: [src/chain/operation.ts:1655](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1655)

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

> **0**: `"account_created"`

Defined in: [src/chain/operation.ts:1656](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1656)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1657](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1657)

#### creator

> **creator**: `string`

#### initial\_delegation

> **initial\_delegation**: `string` \| [`Asset`](../classes/Asset.md)

#### initial\_vesting\_shares

> **initial\_vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

#### new\_account\_name

> **new\_account\_name**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
