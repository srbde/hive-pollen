[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountHistoryEntry

# Interface: AccountHistoryEntry

Defined in: [src/helpers/database.ts:114](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L114)

A single entry from `condenser_api.get_account_history`.

## Remarks

Results are returned as `[index, AccountHistoryEntry]` tuples. Narrow the
operation type with `entry.op[0] === 'fill_order'` before casting `entry.op[1]`.

## Properties

### block

> **block**: `number`

Defined in: [src/helpers/database.ts:117](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L117)

***

### op

> **op**: \[`string`, `unknown`\]

Defined in: [src/helpers/database.ts:116](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L116)

Operation tuple: `[operationName, payload]`.

***

### op\_in\_trx

> **op\_in\_trx**: `number`

Defined in: [src/helpers/database.ts:119](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L119)

***

### timestamp

> **timestamp**: `string`

Defined in: [src/helpers/database.ts:121](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L121)

ISO-8601 without trailing Z.

***

### trx\_id

> **trx\_id**: `string`

Defined in: [src/helpers/database.ts:118](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L118)

***

### virtual\_op

> **virtual\_op**: `boolean`

Defined in: [src/helpers/database.ts:122](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L122)
