[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountUpdate2Operation

# Interface: AccountUpdate2Operation

Defined in: [src/chain/operation.ts:1143](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1143)

Modern account update operation with posting JSON metadata.

## Remarks

This operation extends the legacy account update shape by allowing separate
profile/application metadata in `posting_json_metadata`.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"account_update2"`

Defined in: [src/chain/operation.ts:1144](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1144)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1145](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L1145)

#### account

> **account**: `string`

#### active?

> `optional` **active?**: [`AuthorityType`](AuthorityType.md)

#### extensions

> **extensions**: `any`[]

#### json\_metadata

> **json\_metadata**: `string`

#### memo\_key?

> `optional` **memo\_key?**: `string` \| [`PublicKey`](../classes/PublicKey.md)

#### owner?

> `optional` **owner?**: [`AuthorityType`](AuthorityType.md)

#### posting?

> `optional` **posting?**: [`AuthorityType`](AuthorityType.md)

#### posting\_json\_metadata

> **posting\_json\_metadata**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
