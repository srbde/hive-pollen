[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / EffectiveCommentVoteOperation

# Interface: EffectiveCommentVoteOperation

Defined in: [src/chain/operation.ts:1582](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1582)

Generic Hive operation tuple.

## Remarks

Position `0` is the operation name; position `1` is the payload object. Use
the specific operation interfaces when constructing transactions so TypeScript
can validate the payload shape.

## Example

```ts
const op: Operation = ['transfer', {
  from: 'srbde',
  to: 'alice',
  amount: '1.000 HIVE',
  memo: 'Pollen'
}]
```

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"effective_comment_vote"`

Defined in: [src/chain/operation.ts:1583](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1583)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1584](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1584)

#### author

> **author**: `string`

#### pending\_payout

> **pending\_payout**: `string` \| [`Asset`](../classes/Asset.md)

#### permlink

> **permlink**: `string`

#### rshares

> **rshares**: `string` \| `number`

#### total\_vote\_weight

> **total\_vote\_weight**: `string` \| `number`

#### voter

> **voter**: `string`

#### weight

> **weight**: `string` \| `number`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
