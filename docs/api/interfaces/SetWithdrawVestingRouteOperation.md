[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / SetWithdrawVestingRouteOperation

# Interface: SetWithdrawVestingRouteOperation

Defined in: [src/chain/operation.ts:1046](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1046)

Allows an account to setup a vesting withdraw but with the additional
request for the funds to be transferred directly to another account's
balance rather than the withdrawing account. In addition, those funds
can be immediately vested again, circumventing the conversion from
vests to hive and back, guaranteeing they maintain their value.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"set_withdraw_vesting_route"`

Defined in: [src/chain/operation.ts:1047](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1047)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1048](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1048)

#### auto\_vest

> **auto\_vest**: `boolean`

#### from\_account

> **from\_account**: `string`

#### percent

> **percent**: `number`

#### to\_account

> **to\_account**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
