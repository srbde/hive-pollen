[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ReportOverProductionOperation

# Interface: ReportOverProductionOperation

Defined in: [src/chain/operation.ts:851](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L851)

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

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"report_over_production"`

Defined in: [src/chain/operation.ts:852](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L852)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:853](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L853)

#### first\_block

> **first\_block**: [`SignedBlockHeader`](SignedBlockHeader.md)

#### reporter

> **reporter**: `string`

#### second\_block

> **second\_block**: [`SignedBlockHeader`](SignedBlockHeader.md)

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
