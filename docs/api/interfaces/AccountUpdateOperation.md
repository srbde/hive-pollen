[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountUpdateOperation

# Interface: AccountUpdateOperation

Defined in: [src/chain/operation.ts:281](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L281)

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

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"account_update"`

Defined in: [src/chain/operation.ts:282](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L282)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:283](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L283)

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

[`Operation`](Operation.md).[`1`](Operation.md#1)
