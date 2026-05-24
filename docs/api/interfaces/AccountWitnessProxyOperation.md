[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountWitnessProxyOperation

# Interface: AccountWitnessProxyOperation

Defined in: [src/chain/operation.ts:300](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L300)

Sets or clears the witness voting proxy for an account.

## Remarks

When a proxy is set, the account delegates witness-vote influence to another
account instead of voting witnesses directly.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"account_witness_proxy"`

Defined in: [src/chain/operation.ts:301](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L301)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:302](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L302)

#### account

> **account**: `string`

#### proxy

> **proxy**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
