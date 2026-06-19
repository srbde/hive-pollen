[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / FillTransferFromSavingsOperation

# Interface: FillTransferFromSavingsOperation

Defined in: [src/chain/operation.ts:1463](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1463)

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

> **0**: `"fill_transfer_from_savings"`

Defined in: [src/chain/operation.ts:1464](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1464)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1465](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1465)

#### amount

> **amount**: `string` \| [`Asset`](../classes/Asset.md)

#### from

> **from**: `string`

#### memo

> **memo**: `string`

#### request\_id

> **request\_id**: `number`

#### to

> **to**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
