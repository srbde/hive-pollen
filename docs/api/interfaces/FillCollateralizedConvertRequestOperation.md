[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / FillCollateralizedConvertRequestOperation

# Interface: FillCollateralizedConvertRequestOperation

Defined in: [src/chain/operation.ts:1665](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1665)

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

> **0**: `"fill_collateralized_convert_request"`

Defined in: [src/chain/operation.ts:1666](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1666)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1667](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1667)

#### amount\_in

> **amount\_in**: `string` \| [`Asset`](../classes/Asset.md)

#### amount\_out

> **amount\_out**: `string` \| [`Asset`](../classes/Asset.md)

#### excess\_collateral

> **excess\_collateral**: `string` \| [`Asset`](../classes/Asset.md)

#### owner

> **owner**: `string`

#### requestid

> **requestid**: `number`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
