[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / OpenOrder

# Interface: OpenOrder

Defined in: [src/helpers/database.ts:61](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L61)

A single open limit order as returned by `condenser_api.get_open_orders`.

## Remarks

`sell_price` here uses human-readable asset strings (`"1.000 HIVE"`) rather
than [HiveAsset](HiveAsset.md) objects — this differs from [LimitOrder](LimitOrder.md) returned
by `database_api.list_limit_orders`. Use the provided `real_price` instead of
computing price from `sell_price`.

`sell_price.base` reflects the **original** order amount; `for_sale` is what
remains and will be less than the original when the order is partially filled.

## Properties

### created

> **created**: `string`

Defined in: [src/helpers/database.ts:64](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L64)

ISO-8601 without trailing Z.

***

### expiration

> **expiration**: `string`

Defined in: [src/helpers/database.ts:66](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L66)

ISO-8601 without trailing Z.

***

### for\_sale

> **for\_sale**: `number`

Defined in: [src/helpers/database.ts:70](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L70)

Millis of the remaining base asset — may be less than original if partially filled.

***

### id

> **id**: `number`

Defined in: [src/helpers/database.ts:62](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L62)

***

### orderid

> **orderid**: `number`

Defined in: [src/helpers/database.ts:68](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L68)

***

### real\_price

> **real\_price**: `string`

Defined in: [src/helpers/database.ts:78](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L78)

Pre-computed HBD-per-HIVE price as a decimal string.

***

### rewarded

> **rewarded**: `boolean`

Defined in: [src/helpers/database.ts:80](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L80)

Legacy field, always false.

***

### sell\_price

> **sell\_price**: `object`

Defined in: [src/helpers/database.ts:71](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L71)

#### base

> **base**: `string`

Human-readable original order amount, e.g. `"11089.628 HIVE"`.

#### quote

> **quote**: `string`

Human-readable desired amount, e.g. `"655.397 HBD"`.

***

### seller

> **seller**: `string`

Defined in: [src/helpers/database.ts:67](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L67)
