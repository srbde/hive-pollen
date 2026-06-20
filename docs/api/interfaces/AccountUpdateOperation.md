[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountUpdateOperation

# Interface: AccountUpdateOperation

Defined in: [src/chain/operation.ts:384](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L384)

Updates account authorities, memo key, or legacy JSON metadata.

## Remarks

Authority changes require the appropriate owner or active signatures. Use
[AccountUpdate2Operation](AccountUpdate2Operation.md) when posting JSON metadata is needed.

## Example

```ts
const op: AccountUpdateOperation = ['account_update', {
  account: 'srbde',
  memo_key,
  json_metadata: '{}'
}]
```

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"account_update"`

Defined in: [src/chain/operation.ts:385](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L385)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:386](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L386)

#### account

> **account**: `string`

#### active?

> `optional` **active?**: [`AuthorityType`](AuthorityType.md)

#### json\_metadata

> **json\_metadata**: `string`

#### memo\_key

> **memo\_key**: `string` \| [`PublicKey`](../classes/PublicKey.md)

#### owner?

> `optional` **owner?**: [`AuthorityType`](AuthorityType.md)

#### posting?

> `optional` **posting?**: [`AuthorityType`](AuthorityType.md)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
