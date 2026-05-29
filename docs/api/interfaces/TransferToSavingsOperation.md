[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / TransferToSavingsOperation

# Interface: TransferToSavingsOperation

Defined in: [src/chain/operation.ts:1116](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1116)

Moves liquid HIVE or HBD into an account's savings balance.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"transfer_to_savings"`

Defined in: [src/chain/operation.ts:1117](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1117)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1118](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1118)

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
