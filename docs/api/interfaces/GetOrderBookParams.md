[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / GetOrderBookParams

# Interface: GetOrderBookParams

Defined in: [src/helpers/market.ts:96](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L96)

## Properties

### limit

> **limit**: `number`

Defined in: [src/helpers/market.ts:101](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L101)

Entries per side. Maximum 500 — requests above this return 0 results
(silent truncation, not an error). No offset/pagination is available.
