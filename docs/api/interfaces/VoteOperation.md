[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / VoteOperation

# Interface: VoteOperation

Defined in: [src/chain/operation.ts:1060](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1060)

Casts, updates, or removes a vote on a post or comment.

## Remarks

Weight is a signed integer where `10000` is a full upvote, `0` removes the
vote, and negative values are downvotes.

## Example

```ts
const op: VoteOperation = ['vote', {
  voter: 'srbde',
  author: 'alice',
  permlink: 'field-notes',
  weight: 10_000
}]
```

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"vote"`

Defined in: [src/chain/operation.ts:1061](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1061)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1062](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1062)

#### author

> **author**: `string`

#### permlink

> **permlink**: `string`

#### voter

> **voter**: `string`

#### weight

> **weight**: `number`

Voting weight, 100% = 10000 (100_PERCENT).

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
