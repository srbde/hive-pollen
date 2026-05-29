[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / TransferOperation

# Interface: TransferOperation

Defined in: [src/chain/operation.ts:1073](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1073)

Transfers asset from one account to another.

## Remarks

Transfers require active authority from `from`. Use `Memo.encode` before
broadcasting when the memo should be encrypted for the recipient.

## Example

```ts
const op: TransferOperation = ['transfer', {
  from: 'srbde',
  to: 'alice',
  amount: '1.000 HIVE',
  memo: 'Invoice 42'
}]
```

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"transfer"`

Defined in: [src/chain/operation.ts:1074](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1074)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1075](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1075)

#### amount

> **amount**: `string` \| [`Asset`](../classes/Asset.md)

Amount of HIVE or HBD to send.

#### from

> **from**: `string`

Sending account name.

#### memo

> **memo**: `string`

Plain-text note attached to transaction.

#### to

> **to**: `string`

Receiving account name.

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
