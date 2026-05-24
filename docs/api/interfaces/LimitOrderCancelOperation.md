[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / LimitOrderCancelOperation

# Interface: LimitOrderCancelOperation

Defined in: [src/chain/operation.ts:739](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L739)

Cancels an order and returns the balance to owner.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"limit_order_cancel"`

Defined in: [src/chain/operation.ts:740](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L740)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:741](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L741)

#### orderid

> **orderid**: `number`

#### owner

> **owner**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
