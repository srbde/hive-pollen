[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / EscrowDisputeOperation

# Interface: EscrowDisputeOperation

Defined in: [src/chain/operation.ts:740](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L740)

If either the sender or receiver of an escrow payment has an issue, they can
raise it for dispute. Once a payment is in dispute, the agent has authority over
who gets what.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"escrow_dispute"`

Defined in: [src/chain/operation.ts:741](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L741)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:742](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L742)

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

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
