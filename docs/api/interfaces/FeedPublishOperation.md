[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / FeedPublishOperation

# Interface: FeedPublishOperation

Defined in: [src/chain/operation.ts:831](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L831)

Publishes a witness price feed.

## Remarks

Witness feeds influence the median HIVE/HBD price used by conversions and
debt-ratio mechanics.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"feed_publish"`

Defined in: [src/chain/operation.ts:832](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L832)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:833](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L833)

#### exchange\_rate

> **exchange\_rate**: [`PriceType`](../type-aliases/PriceType.md)

#### publisher

> **publisher**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
