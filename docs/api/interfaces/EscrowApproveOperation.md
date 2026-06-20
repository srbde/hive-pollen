[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / EscrowApproveOperation

# Interface: EscrowApproveOperation

Defined in: [src/chain/operation.ts:720](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L720)

The agent and to accounts must approve an escrow transaction for it to be valid on
the blockchain. Once a part approves the escrow, the cannot revoke their approval.
Subsequent escrow approve operations, regardless of the approval, will be rejected.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"escrow_approve"`

Defined in: [src/chain/operation.ts:721](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L721)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:722](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L722)

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

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
