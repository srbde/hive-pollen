[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ConvertOperation

# Interface: ConvertOperation

Defined in: [src/chain/operation.ts:576](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L576)

Converts HBD to HIVE through the standard conversion request flow.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"convert"`

Defined in: [src/chain/operation.ts:577](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L577)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:578](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L578)

#### amount

> **amount**: `string` \| [`Asset`](../classes/Asset.md)

#### owner

> **owner**: `string`

#### requestid

> **requestid**: `number`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
