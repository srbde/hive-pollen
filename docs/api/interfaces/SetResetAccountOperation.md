[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / SetResetAccountOperation

# Interface: SetResetAccountOperation

Defined in: [src/chain/operation.ts:1030](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1030)

This operation allows 'account' owner to control which account has the power
to execute the 'reset_account_operation' after 60 days.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"set_reset_account"`

Defined in: [src/chain/operation.ts:1031](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1031)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1032](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1032)

#### account

> **account**: `string`

#### current\_reset\_account

> **current\_reset\_account**: `string`

#### reset\_account

> **reset\_account**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
