[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / FillOrderOp

# Interface: FillOrderOp

Defined in: [src/helpers/database.ts:94](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L94)

The payload of a `fill_order` virtual operation.

## Remarks

Amounts are human-readable strings (`"602.975 HIVE"`), not millis integers.
Parse with `s.split(' ')` → `[Number(amount), symbol]`. Do **not** multiply
by 0.001. The same trade generates one entry in both the maker's and taker's
account history — deduplicate on `trx_id + op_in_trx` when joining across accounts.

## Properties

### current\_orderid

> **current\_orderid**: `number`

Defined in: [src/helpers/database.ts:97](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L97)

***

### current\_owner

> **current\_owner**: `string`

Defined in: [src/helpers/database.ts:96](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L96)

Taker — account whose order triggered the match.

***

### current\_pays

> **current\_pays**: `string`

Defined in: [src/helpers/database.ts:99](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L99)

Human-readable asset string, e.g. `"602.975 HIVE"`.

***

### open\_orderid

> **open\_orderid**: `number`

Defined in: [src/helpers/database.ts:102](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L102)

***

### open\_owner

> **open\_owner**: `string`

Defined in: [src/helpers/database.ts:101](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L101)

Maker — account whose resting order was matched.

***

### open\_pays

> **open\_pays**: `string`

Defined in: [src/helpers/database.ts:104](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L104)

Human-readable asset string, e.g. `"29.787 HBD"`.
