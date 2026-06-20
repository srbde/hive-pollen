[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ListLimitOrdersParams

# Interface: ListLimitOrdersParams

Defined in: [src/helpers/database.ts:152](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L152)

## Properties

### limit

> **limit**: `number`

Defined in: [src/helpers/database.ts:159](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L159)

Maximum entries per page. Up to 1000.

***

### order

> **order**: `"by_account"`

Defined in: [src/helpers/database.ts:164](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L164)

Must be `"by_account"`. The `"by_price"` value throws a
`bad_cast_exception` on all tested nodes.

***

### start

> **start**: \[`string`, `number`\]

Defined in: [src/helpers/database.ts:157](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L157)

Pagination cursor as `[seller_account, orderid]`.
Use `["", 0]` to start from the beginning.
