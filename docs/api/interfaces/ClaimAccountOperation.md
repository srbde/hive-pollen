[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ClaimAccountOperation

# Interface: ClaimAccountOperation

Defined in: [src/chain/operation.ts:504](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L504)

Claims a discounted account creation ticket.

## Remarks

Claimed tickets can later be consumed by
[CreateClaimedAccountOperation](CreateClaimedAccountOperation.md). A zero fee is valid when the chain has
free account subsidies available.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"claim_account"`

Defined in: [src/chain/operation.ts:505](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L505)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:506](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L506)

#### creator

> **creator**: `string`

#### extensions

> **extensions**: `any`[]

Extensions. Not currently used.

#### fee

> **fee**: `string` \| [`Asset`](../classes/Asset.md)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
