[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / EscrowApproveOperation

# Interface: EscrowApproveOperation

Defined in: [src/chain/operation.ts:617](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L617)

The agent and to accounts must approve an escrow transaction for it to be valid on
the blockchain. Once a part approves the escrow, the cannot revoke their approval.
Subsequent escrow approve operations, regardless of the approval, will be rejected.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"escrow_approve"`

Defined in: [src/chain/operation.ts:618](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L618)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:619](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L619)

#### agent

> **agent**: `string`

#### approve

> **approve**: `boolean`

#### escrow\_id

> **escrow\_id**: `number`

#### from

> **from**: `string`

#### to

> **to**: `string`

#### who

> **who**: `string`

Either to or agent.

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
