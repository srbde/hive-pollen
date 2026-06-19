[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / FillConvertRequestOperation

# Interface: FillConvertRequestOperation

Defined in: [src/chain/operation.ts:1370](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1370)

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

> **0**: `"fill_convert_request"`

Defined in: [src/chain/operation.ts:1371](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1371)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1372](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1372)

#### amount\_in

> **amount\_in**: `string` \| [`Asset`](../classes/Asset.md)

#### amount\_out

> **amount\_out**: `string` \| [`Asset`](../classes/Asset.md)

#### owner

> **owner**: `string`

#### requestid

> **requestid**: `number`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
