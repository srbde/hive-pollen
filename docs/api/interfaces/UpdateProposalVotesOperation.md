[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / UpdateProposalVotesOperation

# Interface: UpdateProposalVotesOperation

Defined in: [src/chain/operation.ts:1284](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1284)

Approves or removes approvals for DHF proposal ids.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"update_proposal_votes"`

Defined in: [src/chain/operation.ts:1285](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1285)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1286](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1286)

#### approve

> **approve**: `boolean`

#### extensions

> **extensions**: `any`[]

#### proposal\_ids

> **proposal\_ids**: `number`[]

#### voter

> **voter**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
