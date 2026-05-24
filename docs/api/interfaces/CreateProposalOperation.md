[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CreateProposalOperation

# Interface: CreateProposalOperation

Defined in: [src/chain/operation.ts:1164](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1164)

Creates a Decentralized Hive Fund proposal.

## Remarks

Proposal payments are made to `receiver` between `start_date` and `end_date`
when the proposal receives sufficient stake-weighted approval.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"create_proposal"`

Defined in: [src/chain/operation.ts:1165](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1165)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1166](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1166)

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

[`Operation`](Operation.md).[`1`](Operation.md#1)
