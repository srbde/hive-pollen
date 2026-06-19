[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CreateProposalOperation

# Interface: CreateProposalOperation

Defined in: [src/chain/operation.ts:1267](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1267)

Creates a Decentralized Hive Fund proposal.

## Remarks

Proposal payments are made to `receiver` between `start_date` and `end_date`
when the proposal receives sufficient stake-weighted approval.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"create_proposal"`

Defined in: [src/chain/operation.ts:1268](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1268)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1269](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1269)

#### creator

> **creator**: `string`

#### daily\_pay

> **daily\_pay**: `string` \| [`Asset`](../classes/Asset.md)

#### end\_date

> **end\_date**: `string`

#### extensions

> **extensions**: `any`[]

#### permlink

> **permlink**: `string`

#### receiver

> **receiver**: `string`

#### start\_date

> **start\_date**: `string`

#### subject

> **subject**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
