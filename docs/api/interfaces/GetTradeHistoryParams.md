[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / GetTradeHistoryParams

# Interface: GetTradeHistoryParams

Defined in: [src/helpers/market.ts:44](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L44)

## Properties

### end

> **end**: `string`

Defined in: [src/helpers/market.ts:48](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L48)

ISO-8601 datetime without Z.

***

### limit

> **limit**: `number`

Defined in: [src/helpers/market.ts:50](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L50)

Maximum 1000. To paginate, advance start by 1 ms past the last returned date.

***

### start

> **start**: `string`

Defined in: [src/helpers/market.ts:46](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L46)

ISO-8601 datetime without Z.
