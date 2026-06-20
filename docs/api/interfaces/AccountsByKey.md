[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountsByKey

# Interface: AccountsByKey

Defined in: [src/helpers/key.ts:9](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/key.ts#L9)

## Properties

### accounts

> **accounts**: `string`[][]

Defined in: [src/helpers/key.ts:17](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/key.ts#L17)

Account names grouped by the queried public key order.

#### Remarks

Each inner array contains the accounts that reference the corresponding
public key in owner or active authorities.
