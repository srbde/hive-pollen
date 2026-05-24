[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / TransferToVestingOperation

# Interface: TransferToVestingOperation

Defined in: [src/chain/operation.ts:1134](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1134)

This operation converts HIVE into VFS (Vesting Fund Shares) at
the current exchange rate. With this operation it is possible to
give another account vesting shares so that faucets can
pre-fund new accounts with vesting shares.
(A.k.a. Powering Up)

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"transfer_to_vesting"`

Defined in: [src/chain/operation.ts:1135](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1135)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1136](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1136)

#### amount

> **amount**: `string` \| [`Asset`](../classes/Asset.md)

Amount to power up, must be HIVE

#### from

> **from**: `string`

#### to

> **to**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
