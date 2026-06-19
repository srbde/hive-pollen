[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / FillOrderOperation

# Interface: FillOrderOperation

Defined in: [src/chain/operation.ts:1444](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1444)

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

> **0**: `"fill_order"`

Defined in: [src/chain/operation.ts:1445](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1445)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1446](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1446)

#### current\_orderid

> **current\_orderid**: `number`

#### current\_owner

> **current\_owner**: `string`

#### current\_pays

> **current\_pays**: `string` \| [`Asset`](../classes/Asset.md)

#### open\_orderid

> **open\_orderid**: `number`

#### open\_owner

> **open\_owner**: `string`

#### open\_pays

> **open\_pays**: `string` \| [`Asset`](../classes/Asset.md)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
