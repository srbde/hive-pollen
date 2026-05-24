[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / RecurrentTransferOperation

# Interface: RecurrentTransferOperation

Defined in: [src/chain/operation.ts:1250](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1250)

Schedules a recurring transfer.

## Remarks

`recurrence` is the interval in hours and `executions` is the number of
times the transfer should execute.

## Example

```ts
const op: RecurrentTransferOperation = ['recurrent_transfer', {
  from: 'srbde',
  to: 'alice',
  amount: '1.000 HIVE',
  memo: 'monthly support',
  recurrence: 720,
  executions: 3,
  extensions: []
}]
```

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"recurrent_transfer"`

Defined in: [src/chain/operation.ts:1251](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1251)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1252](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1252)

#### amount

> **amount**: `string` \| [`Asset`](../classes/Asset.md)

#### executions

> **executions**: `number`

#### extensions

> **extensions**: `any`[]

#### from

> **from**: `string`

#### memo

> **memo**: `string`

#### recurrence

> **recurrence**: `number`

#### to

> **to**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
