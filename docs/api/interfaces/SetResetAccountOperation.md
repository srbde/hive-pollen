[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / SetResetAccountOperation

# Interface: SetResetAccountOperation

Defined in: [src/chain/operation.ts:1030](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1030)

This operation allows 'account' owner to control which account has the power
to execute the 'reset_account_operation' after 60 days.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"set_reset_account"`

Defined in: [src/chain/operation.ts:1031](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1031)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1032](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1032)

#### account

> **account**: `string`

#### current\_reset\_account

> **current\_reset\_account**: `string`

#### reset\_account

> **reset\_account**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
