[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / LimitOrderCancelOperation

# Interface: LimitOrderCancelOperation

Defined in: [src/chain/operation.ts:842](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L842)

Cancels an order and returns the balance to owner.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"limit_order_cancel"`

Defined in: [src/chain/operation.ts:843](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L843)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:844](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L844)

#### orderid

> **orderid**: `number`

#### owner

> **owner**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
