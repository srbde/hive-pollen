[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CommentBenefactorRewardOperation

# Interface: CommentBenefactorRewardOperation

Defined in: [src/chain/operation.ts:1497](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1497)

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

> **0**: `"comment_benefactor_reward"`

Defined in: [src/chain/operation.ts:1498](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1498)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1499](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1499)

#### author

> **author**: `string`

#### benefactor

> **benefactor**: `string`

#### hbd\_payout

> **hbd\_payout**: `string` \| [`Asset`](../classes/Asset.md)

#### hive\_payout

> **hive\_payout**: `string` \| [`Asset`](../classes/Asset.md)

#### payout\_must\_be\_claimed

> **payout\_must\_be\_claimed**: `boolean`

#### permlink

> **permlink**: `string`

#### vesting\_payout

> **vesting\_payout**: `string` \| [`Asset`](../classes/Asset.md)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
