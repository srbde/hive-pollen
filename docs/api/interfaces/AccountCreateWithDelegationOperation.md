[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountCreateWithDelegationOperation

# Interface: AccountCreateWithDelegationOperation

Defined in: [src/chain/operation.ts:246](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L246)

Account creation operation that also delegates initial VESTS.

## Remarks

Delegation gives a new account immediate resource capacity without
transferring ownership of the underlying vesting shares.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"account_create_with_delegation"`

Defined in: [src/chain/operation.ts:247](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L247)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:248](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L248)

#### active

> **active**: [`AuthorityType`](AuthorityType.md)

#### creator

> **creator**: `string`

#### delegation

> **delegation**: `string` \| [`Asset`](../classes/Asset.md)

#### extensions

> **extensions**: `any`[]

Extensions. Not currently used.

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
