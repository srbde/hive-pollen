[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / VoteOperation

# Interface: VoteOperation

Defined in: [src/chain/operation.ts:1163](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1163)

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

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"vote"`

Defined in: [src/chain/operation.ts:1164](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1164)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1165](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1165)

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

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
