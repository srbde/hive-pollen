[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ResetAccountOperation

# Interface: ResetAccountOperation

Defined in: [src/chain/operation.ts:914](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L914)

This operation allows recovery_account to change account_to_reset's owner authority to
new_owner_authority after 60 days of inactivity.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"reset_account"`

Defined in: [src/chain/operation.ts:915](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L915)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:916](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L916)

#### account\_to\_reset

> **account\_to\_reset**: `string`

#### new\_owner\_authority

> **new\_owner\_authority**: [`AuthorityType`](AuthorityType.md)

#### reset\_account

> **reset\_account**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
