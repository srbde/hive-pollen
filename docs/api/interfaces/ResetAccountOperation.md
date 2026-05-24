[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ResetAccountOperation

# Interface: ResetAccountOperation

Defined in: [src/chain/operation.ts:1017](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1017)

This operation allows recovery_account to change account_to_reset's owner authority to
new_owner_authority after 60 days of inactivity.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"reset_account"`

Defined in: [src/chain/operation.ts:1018](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1018)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1019](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1019)

#### account\_to\_reset

> **account\_to\_reset**: `string`

#### new\_owner\_authority

> **new\_owner\_authority**: [`AuthorityType`](AuthorityType.md)

#### reset\_account

> **reset\_account**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
