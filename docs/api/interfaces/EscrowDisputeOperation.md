[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / EscrowDisputeOperation

# Interface: EscrowDisputeOperation

Defined in: [src/chain/operation.ts:637](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L637)

If either the sender or receiver of an escrow payment has an issue, they can
raise it for dispute. Once a payment is in dispute, the agent has authority over
who gets what.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"escrow_dispute"`

Defined in: [src/chain/operation.ts:638](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L638)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:639](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L639)

#### agent

> **agent**: `string`

#### escrow\_id

> **escrow\_id**: `number`

#### from

> **from**: `string`

#### to

> **to**: `string`

#### who

> **who**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
