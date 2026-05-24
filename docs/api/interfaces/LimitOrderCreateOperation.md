[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / LimitOrderCreateOperation

# Interface: LimitOrderCreateOperation

Defined in: [src/chain/operation.ts:750](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L750)

This operation creates a limit order and matches it against existing open orders.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"limit_order_create"`

Defined in: [src/chain/operation.ts:751](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L751)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:752](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L752)

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
