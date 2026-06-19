[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AuthorRewardOperation

# Interface: AuthorRewardOperation

Defined in: [src/chain/operation.ts:1380](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1380)

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

> **0**: `"author_reward"`

Defined in: [src/chain/operation.ts:1381](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1381)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1382](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1382)

#### author

> **author**: `string`

#### curators\_vesting\_payout

> **curators\_vesting\_payout**: `string` \| [`Asset`](../classes/Asset.md)

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
