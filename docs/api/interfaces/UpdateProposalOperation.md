[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / UpdateProposalOperation

# Interface: UpdateProposalOperation

Defined in: [src/chain/operation.ts:1206](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L1206)

Updates mutable fields on an existing DHF proposal.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"update_proposal"`

Defined in: [src/chain/operation.ts:1207](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L1207)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1208](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L1208)

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

[`Operation`](Operation.md).[`1`](Operation.md#1)
