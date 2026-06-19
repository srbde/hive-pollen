[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CommentRewardOperation

# Interface: CommentRewardOperation

Defined in: [src/chain/operation.ts:1404](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1404)

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

> **0**: `"comment_reward"`

Defined in: [src/chain/operation.ts:1405](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1405)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1406](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1406)

#### author

> **author**: `string`

#### author\_rewards

> **author\_rewards**: `string` \| `number`

#### beneficiary\_payout\_value

> **beneficiary\_payout\_value**: `string` \| [`Asset`](../classes/Asset.md)

#### curator\_payout\_value

> **curator\_payout\_value**: `string` \| [`Asset`](../classes/Asset.md)

#### payout

> **payout**: `string` \| [`Asset`](../classes/Asset.md)

#### permlink

> **permlink**: `string`

#### total\_payout\_value

> **total\_payout\_value**: `string` \| [`Asset`](../classes/Asset.md)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
