[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / SetWithdrawVestingRouteOperation

# Interface: SetWithdrawVestingRouteOperation

Defined in: [src/chain/operation.ts:943](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L943)

Allows an account to setup a vesting withdraw but with the additional
request for the funds to be transferred directly to another account's
balance rather than the withdrawing account. In addition, those funds
can be immediately vested again, circumventing the conversion from
vests to hive and back, guaranteeing they maintain their value.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"set_withdraw_vesting_route"`

Defined in: [src/chain/operation.ts:944](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L944)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:945](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L945)

#### auto\_vest

> **auto\_vest**: `boolean`

#### from\_account

> **from\_account**: `string`

#### percent

> **percent**: `number`

#### to\_account

> **to\_account**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
