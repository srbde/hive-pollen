[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountCreateOperation

# Interface: AccountCreateOperation

Defined in: [src/chain/operation.ts:225](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L225)

Legacy paid account creation operation.

## Remarks

This operation creates an account by paying `fee` directly. Modern Hive
account creation often uses claimed account tickets through
[ClaimAccountOperation](ClaimAccountOperation.md) and [CreateClaimedAccountOperation](CreateClaimedAccountOperation.md).

## Example

```ts
const op: AccountCreateOperation = ['account_create', {
  fee: '3.000 HIVE',
  creator: 'srbde',
  new_account_name: 'new-user',
  owner,
  active,
  posting,
  memo_key,
  json_metadata: '{}'
}]
```

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"account_create"`

Defined in: [src/chain/operation.ts:226](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L226)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:227](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L227)

#### active

> **active**: [`AuthorityType`](AuthorityType.md)

#### creator

> **creator**: `string`

#### fee

> **fee**: `string` \| [`Asset`](../classes/Asset.md)

#### json\_metadata

> **json\_metadata**: `string`

#### memo\_key

> **memo\_key**: `string` \| [`PublicKey`](../classes/PublicKey.md)

#### new\_account\_name

> **new\_account\_name**: `string`

#### owner

> **owner**: [`AuthorityType`](AuthorityType.md)

#### posting

> **posting**: [`AuthorityType`](AuthorityType.md)

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
