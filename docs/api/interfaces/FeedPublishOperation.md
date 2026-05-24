[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / FeedPublishOperation

# Interface: FeedPublishOperation

Defined in: [src/chain/operation.ts:728](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L728)

Publishes a witness price feed.

## Remarks

Witness feeds influence the median HIVE/HBD price used by conversions and
debt-ratio mechanics.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"feed_publish"`

Defined in: [src/chain/operation.ts:729](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L729)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:730](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L730)

#### exchange\_rate

> **exchange\_rate**: [`PriceType`](../type-aliases/PriceType.md)

#### publisher

> **publisher**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
