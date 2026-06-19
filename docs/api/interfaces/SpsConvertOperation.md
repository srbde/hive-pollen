[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / SpsConvertOperation

# Interface: SpsConvertOperation

Defined in: [src/chain/operation.ts:1603](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1603)

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

> **0**: `"sps_convert"`

Defined in: [src/chain/operation.ts:1604](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1604)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1605](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1605)

#### hbd\_amount\_out

> **hbd\_amount\_out**: `string` \| [`Asset`](../classes/Asset.md)

#### hive\_amount\_in

> **hive\_amount\_in**: `string` \| [`Asset`](../classes/Asset.md)

#### treasury

> **treasury**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
