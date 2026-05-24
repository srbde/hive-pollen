[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CommentOptionsOperation

# Interface: CommentOptionsOperation

Defined in: [src/chain/operation.ts:453](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L453)

Sets payout, vote, curation, and beneficiary options for a comment.

## Remarks

This usually travels in the same transaction as [CommentOperation](CommentOperation.md) so a
new post never exists with unintended payout settings.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"comment_options"`

Defined in: [src/chain/operation.ts:454](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L454)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:455](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L455)

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

[`Operation`](Operation.md).[`1`](Operation.md#1)
