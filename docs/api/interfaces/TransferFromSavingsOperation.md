[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / TransferFromSavingsOperation

# Interface: TransferFromSavingsOperation

Defined in: [src/chain/operation.ts:1102](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1102)

Withdraws funds from savings to liquid balance after the savings delay.

## Remarks

The request can be cancelled with [CancelTransferFromSavingsOperation](CancelTransferFromSavingsOperation.md)
before it completes.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"transfer_from_savings"`

Defined in: [src/chain/operation.ts:1103](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1103)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1104](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1104)

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
