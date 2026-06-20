[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ClaimRewardBalanceOperation

# Interface: ClaimRewardBalanceOperation

Defined in: [src/chain/operation.ts:486](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L486)

Claims pending author, curation, and vesting rewards.

## Remarks

Any reward field may be `0.000` in its respective asset. Hive requires the
operation to name all three reward buckets explicitly.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"claim_reward_balance"`

Defined in: [src/chain/operation.ts:487](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L487)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:488](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L488)

#### account

> **account**: `string`

#### reward\_hbd

> **reward\_hbd**: `string` \| [`Asset`](../classes/Asset.md)

#### reward\_hive

> **reward\_hive**: `string` \| [`Asset`](../classes/Asset.md)

#### reward\_vests

> **reward\_vests**: `string` \| [`Asset`](../classes/Asset.md)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
