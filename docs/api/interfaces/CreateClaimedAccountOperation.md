[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CreateClaimedAccountOperation

# Interface: CreateClaimedAccountOperation

Defined in: [src/chain/operation.ts:588](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L588)

Consumes a claimed account ticket to create a new account.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"create_claimed_account"`

Defined in: [src/chain/operation.ts:589](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L589)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:590](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L590)

#### active

> **active**: [`AuthorityType`](AuthorityType.md)

#### creator

> **creator**: `string`

#### extensions

> **extensions**: `any`[]

Extensions. Not currently used.

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
