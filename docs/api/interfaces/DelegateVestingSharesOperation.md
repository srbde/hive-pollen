[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DelegateVestingSharesOperation

# Interface: DelegateVestingSharesOperation

Defined in: [src/chain/operation.ts:583](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L583)

Delegates vesting shares from one account to another.

## Remarks

Set `vesting_shares` to `0.000000 VESTS` to remove an existing delegation.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"delegate_vesting_shares"`

Defined in: [src/chain/operation.ts:584](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L584)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:585](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L585)

#### delegatee

> **delegatee**: `string`

The account receiving vesting shares.

#### delegator

> **delegator**: `string`

The account delegating vesting shares.

#### vesting\_shares

> **vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

The amount of vesting shares delegated.

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
