[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / TransferOperation

# Interface: TransferOperation

Defined in: [src/chain/operation.ts:970](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L970)

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

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"transfer"`

Defined in: [src/chain/operation.ts:971](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L971)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:972](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L972)

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

[`Operation`](Operation.md).[`1`](Operation.md#1)
