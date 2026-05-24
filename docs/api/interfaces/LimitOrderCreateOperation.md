[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / LimitOrderCreateOperation

# Interface: LimitOrderCreateOperation

Defined in: [src/chain/operation.ts:853](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L853)

This operation creates a limit order and matches it against existing open orders.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"limit_order_create"`

Defined in: [src/chain/operation.ts:854](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L854)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:855](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L855)

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

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
