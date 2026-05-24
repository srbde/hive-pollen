[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / LimitOrderCreate2Operation

# Interface: LimitOrderCreate2Operation

Defined in: [src/chain/operation.ts:869](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L869)

This operation is identical to limit_order_create except it serializes the price rather
than calculating it from other fields.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"limit_order_create2"`

Defined in: [src/chain/operation.ts:870](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L870)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:871](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L871)

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

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
