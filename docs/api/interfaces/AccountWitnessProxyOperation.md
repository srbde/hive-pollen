[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountWitnessProxyOperation

# Interface: AccountWitnessProxyOperation

Defined in: [src/chain/operation.ts:403](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L403)

Sets or clears the witness voting proxy for an account.

## Remarks

When a proxy is set, the account delegates witness-vote influence to another
account instead of voting witnesses directly.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"account_witness_proxy"`

Defined in: [src/chain/operation.ts:404](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L404)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:405](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L405)

#### account

> **account**: `string`

#### proxy

> **proxy**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
