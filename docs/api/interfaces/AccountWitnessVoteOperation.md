[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountWitnessVoteOperation

# Interface: AccountWitnessVoteOperation

Defined in: [src/chain/operation.ts:423](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L423)

Approves or removes a witness vote.

## Example

```ts
const op: AccountWitnessVoteOperation = ['account_witness_vote', {
  account: 'srbde',
  witness: 'some-witness',
  approve: true
}]
```

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"account_witness_vote"`

Defined in: [src/chain/operation.ts:424](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L424)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:425](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L425)

#### account

> **account**: `string`

#### approve

> **approve**: `boolean`

#### witness

> **witness**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
