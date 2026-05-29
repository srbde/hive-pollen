[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountCreateOperation

# Interface: AccountCreateOperation

Defined in: [src/chain/operation.ts:328](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L328)

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

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"account_create"`

Defined in: [src/chain/operation.ts:329](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L329)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:330](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/operation.ts#L330)

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

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
