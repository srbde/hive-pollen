[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / LimitOrderCancelOperation

# Interface: LimitOrderCancelOperation

Defined in: [src/chain/operation.ts:739](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L739)

Cancels an order and returns the balance to owner.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"limit_order_cancel"`

Defined in: [src/chain/operation.ts:740](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L740)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:741](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L741)

#### orderid

> **orderid**: `number`

#### owner

> **owner**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
