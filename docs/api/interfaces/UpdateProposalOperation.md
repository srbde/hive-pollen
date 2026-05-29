[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / UpdateProposalOperation

# Interface: UpdateProposalOperation

Defined in: [src/chain/operation.ts:1309](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1309)

Updates mutable fields on an existing DHF proposal.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"update_proposal"`

Defined in: [src/chain/operation.ts:1310](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1310)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1311](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1311)

#### creator

> **creator**: `string`

#### daily\_pay

> **daily\_pay**: `string` \| [`Asset`](../classes/Asset.md)

#### extensions

> **extensions**: `any`[]

#### permlink

> **permlink**: `string`

#### proposal\_id

> **proposal\_id**: `number`

#### subject

> **subject**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
