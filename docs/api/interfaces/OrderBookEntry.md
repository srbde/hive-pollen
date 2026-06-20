[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / OrderBookEntry

# Interface: OrderBookEntry

Defined in: [src/helpers/market.ts:81](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L81)

## Properties

### created

> **created**: `string`

Defined in: [src/helpers/market.ts:93](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L93)

ISO-8601 without trailing Z.

***

### hbd

> **hbd**: `number`

Defined in: [src/helpers/market.ts:91](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L91)

HBD in the order (millis).

***

### hive

> **hive**: `number`

Defined in: [src/helpers/market.ts:89](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L89)

HIVE in the order (millis).

***

### order\_price

> **order\_price**: `object`

Defined in: [src/helpers/market.ts:82](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L82)

#### base

> **base**: [`HiveAsset`](HiveAsset.md)

#### quote

> **quote**: [`HiveAsset`](HiveAsset.md)

***

### real\_price

> **real\_price**: `string`

Defined in: [src/helpers/market.ts:87](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L87)

Decimal string, e.g. "0.04928000000000000".
