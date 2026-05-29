[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountUpdate2Operation

# Interface: AccountUpdate2Operation

Defined in: [src/chain/operation.ts:1246](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1246)

Modern account update operation with posting JSON metadata.

## Remarks

This operation extends the legacy account update shape by allowing separate
profile/application metadata in `posting_json_metadata`.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"account_update2"`

Defined in: [src/chain/operation.ts:1247](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1247)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1248](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L1248)

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

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
