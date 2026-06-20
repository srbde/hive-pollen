[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / LimitOrder

# Interface: LimitOrder

Defined in: [src/helpers/database.ts:132](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L132)

A single open limit order on the Hive internal market, as returned by
`database_api.list_limit_orders`. Includes the seller account name and full
price data — fields not available from `market_history_api.get_order_book`.

## Properties

### created

> **created**: `string`

Defined in: [src/helpers/database.ts:135](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L135)

ISO-8601 without trailing Z.

***

### expiration

> **expiration**: `string`

Defined in: [src/helpers/database.ts:137](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L137)

ISO-8601 without trailing Z.

***

### for\_sale

> **for\_sale**: `number`

Defined in: [src/helpers/database.ts:143](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L143)

Amount remaining for sale, in millis of the base asset.

***

### id

> **id**: `number`

Defined in: [src/helpers/database.ts:133](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L133)

***

### orderid

> **orderid**: `number`

Defined in: [src/helpers/database.ts:141](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L141)

Seller-assigned order ID.

***

### sell\_price

> **sell\_price**: `object`

Defined in: [src/helpers/database.ts:144](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L144)

#### base

> **base**: [`HiveAsset`](HiveAsset.md)

Asset being sold.

#### quote

> **quote**: [`HiveAsset`](HiveAsset.md)

Asset wanted in return.

***

### seller

> **seller**: `string`

Defined in: [src/helpers/database.ts:139](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L139)

Hive account name of the order owner.
