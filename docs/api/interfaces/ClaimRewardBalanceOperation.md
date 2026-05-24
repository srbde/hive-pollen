[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ClaimRewardBalanceOperation

# Interface: ClaimRewardBalanceOperation

Defined in: [src/chain/operation.ts:383](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L383)

Claims pending author, curation, and vesting rewards.

## Remarks

Any reward field may be `0.000` in its respective asset. Hive requires the
operation to name all three reward buckets explicitly.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"claim_reward_balance"`

Defined in: [src/chain/operation.ts:384](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L384)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:385](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L385)

#### account

> **account**: `string`

#### reward\_hbd

> **reward\_hbd**: `string` \| [`Asset`](../classes/Asset.md)

#### reward\_hive

> **reward\_hive**: `string` \| [`Asset`](../classes/Asset.md)

#### reward\_vests

> **reward\_vests**: `string` \| [`Asset`](../classes/Asset.md)

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
