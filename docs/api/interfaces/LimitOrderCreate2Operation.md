[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / LimitOrderCreate2Operation

# Interface: LimitOrderCreate2Operation

Defined in: [src/chain/operation.ts:766](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L766)

This operation is identical to limit_order_create except it serializes the price rather
than calculating it from other fields.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"limit_order_create2"`

Defined in: [src/chain/operation.ts:767](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L767)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:768](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L768)

#### amount\_to\_sell

> **amount\_to\_sell**: `string` \| [`Asset`](../classes/Asset.md)

#### exchange\_rate

> **exchange\_rate**: [`PriceType`](../type-aliases/PriceType.md)

#### expiration

> **expiration**: `string`

#### fill\_or\_kill

> **fill\_or\_kill**: `boolean`

#### orderid

> **orderid**: `number`

#### owner

> **owner**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
