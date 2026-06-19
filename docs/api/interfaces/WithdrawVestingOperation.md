[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / WithdrawVestingOperation

# Interface: WithdrawVestingOperation

Defined in: [src/chain/operation.ts:1188](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1188)

At any given point in time an account can be withdrawing from their
vesting shares. A user may change the number of shares they wish to
cash out at any time between 0 and their total vesting stake.

After applying this operation, vesting_shares will be withdrawn
at a rate of vesting_shares/104 per week for two years starting
one week after this operation is included in the blockchain.

This operation is not valid if the user has no vesting shares.
(A.k.a. Powering Down)

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"withdraw_vesting"`

Defined in: [src/chain/operation.ts:1189](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1189)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1190](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1190)

#### account

> **account**: `string`

#### vesting\_shares

> **vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Amount to power down, must be VESTS.

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
