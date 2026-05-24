[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ClaimAccountOperation

# Interface: ClaimAccountOperation

Defined in: [src/chain/operation.ts:401](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L401)

Claims a discounted account creation ticket.

## Remarks

Claimed tickets can later be consumed by
[CreateClaimedAccountOperation](CreateClaimedAccountOperation.md). A zero fee is valid when the chain has
free account subsidies available.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"claim_account"`

Defined in: [src/chain/operation.ts:402](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L402)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:403](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L403)

#### creator

> **creator**: `string`

#### extensions

> **extensions**: `any`[]

Extensions. Not currently used.

#### fee

> **fee**: `string` \| [`Asset`](../classes/Asset.md)

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
