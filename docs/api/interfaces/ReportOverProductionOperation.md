[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ReportOverProductionOperation

# Interface: ReportOverProductionOperation

Defined in: [src/chain/operation.ts:954](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L954)

This operation is used to report a miner who signs two blocks
at the same time. To be valid, the violation must be reported within
MAX_WITNESSES blocks of the head block (1 round) and the
producer must be in the ACTIVE witness set.

Users not in the ACTIVE witness set should not have to worry about their
key getting compromised and being used to produced multiple blocks so
the attacker can report it and steel their vesting hive.

The result of the operation is to transfer the full VESTING HIVE balance
of the block producer to the reporter.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"report_over_production"`

Defined in: [src/chain/operation.ts:955](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L955)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:956](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L956)

#### first\_block

> **first\_block**: [`SignedBlockHeader`](SignedBlockHeader.md)

#### reporter

> **reporter**: `string`

#### second\_block

> **second\_block**: [`SignedBlockHeader`](SignedBlockHeader.md)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
