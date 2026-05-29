[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CollateralizedConvertImmediateConversionOperation

# Interface: CollateralizedConvertImmediateConversionOperation

Defined in: [src/chain/operation.ts:1735](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1735)

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

> **0**: `"collateralized_convert_immediate_conversion"`

Defined in: [src/chain/operation.ts:1736](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1736)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1737](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1737)

#### hbd\_out

> **hbd\_out**: `string` \| [`Asset`](../classes/Asset.md)

#### owner

> **owner**: `string`

#### requestid

> **requestid**: `number`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
