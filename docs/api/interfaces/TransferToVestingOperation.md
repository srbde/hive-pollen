[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / TransferToVestingOperation

# Interface: TransferToVestingOperation

Defined in: [src/chain/operation.ts:1031](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L1031)

This operation converts HIVE into VFS (Vesting Fund Shares) at
the current exchange rate. With this operation it is possible to
give another account vesting shares so that faucets can
pre-fund new accounts with vesting shares.
(A.k.a. Powering Up)

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"transfer_to_vesting"`

Defined in: [src/chain/operation.ts:1032](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L1032)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1033](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L1033)

#### amount

> **amount**: `string` \| [`Asset`](../classes/Asset.md)

Amount to power up, must be HIVE

#### from

> **from**: `string`

#### to

> **to**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
