[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / RecurrentTransferOperation

# Interface: RecurrentTransferOperation

Defined in: [src/chain/operation.ts:1353](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1353)

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

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"recurrent_transfer"`

Defined in: [src/chain/operation.ts:1354](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1354)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1355](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1355)

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

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
