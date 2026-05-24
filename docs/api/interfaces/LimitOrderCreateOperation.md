[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / LimitOrderCreateOperation

# Interface: LimitOrderCreateOperation

Defined in: [src/chain/operation.ts:750](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L750)

This operation creates a limit order and matches it against existing open orders.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"limit_order_create"`

Defined in: [src/chain/operation.ts:751](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L751)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:752](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L752)

#### amount\_to\_sell

> **amount\_to\_sell**: `string` \| [`Asset`](../classes/Asset.md)

#### expiration

> **expiration**: `string`

#### fill\_or\_kill

> **fill\_or\_kill**: `boolean`

#### min\_to\_receive

> **min\_to\_receive**: `string` \| [`Asset`](../classes/Asset.md)

#### orderid

> **orderid**: `number`

#### owner

> **owner**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
