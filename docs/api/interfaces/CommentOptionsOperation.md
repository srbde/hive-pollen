[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CommentOptionsOperation

# Interface: CommentOptionsOperation

Defined in: [src/chain/operation.ts:556](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L556)

Sets payout, vote, curation, and beneficiary options for a comment.

## Remarks

This usually travels in the same transaction as [CommentOperation](CommentOperation.md) so a
new post never exists with unintended payout settings.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"comment_options"`

Defined in: [src/chain/operation.ts:557](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L557)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:558](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L558)

#### allow\_curation\_rewards

> **allow\_curation\_rewards**: `boolean`

Whether to allow post to recieve curation rewards.

#### allow\_votes

> **allow\_votes**: `boolean`

Whether to allow post to receive votes.

#### author

> **author**: `string`

#### extensions

> **extensions**: \[`0`, \{ `beneficiaries`: [`BeneficiaryRoute`](BeneficiaryRoute.md)[]; \}\][]

#### max\_accepted\_payout

> **max\_accepted\_payout**: `string` \| [`Asset`](../classes/Asset.md)

HBD value of the maximum payout this post will receive.

#### percent\_hbd

> **percent\_hbd**: `number`

The percent of Hive Dollars to key, unkept amounts will be received as Hive Power.

#### permlink

> **permlink**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
