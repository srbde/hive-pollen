[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / TransferFromSavingsOperation

# Interface: TransferFromSavingsOperation

Defined in: [src/chain/operation.ts:999](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L999)

Withdraws funds from savings to liquid balance after the savings delay.

## Remarks

The request can be cancelled with [CancelTransferFromSavingsOperation](CancelTransferFromSavingsOperation.md)
before it completes.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"transfer_from_savings"`

Defined in: [src/chain/operation.ts:1000](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1000)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1001](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1001)

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

[`Operation`](Operation.md).[`1`](Operation.md#1)
