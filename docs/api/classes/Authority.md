[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Authority

# Class: Authority

Defined in: [src/chain/account.ts:74](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/account.ts#L74)

Convenience wrapper for Hive owner, active, and posting authorities.

## Remarks

`Authority` can be created from a single public key for simple one-signature
accounts or from a full weighted authority object for multisig setups.

## Example

```ts
const posting = Authority.from(postingPublicKey)
```

## Implements

- [`AuthorityType`](../interfaces/AuthorityType.md)

## Constructors

### Constructor

> **new Authority**(`authority`): `Authority`

Defined in: [src/chain/account.ts:84](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/account.ts#L84)

Creates an authority from explicit threshold and auth lists.

#### Parameters

##### authority

[`AuthorityType`](../interfaces/AuthorityType.md)

Raw authority fields from Hive.

#### Returns

`Authority`

## Properties

### account\_auths

> **account\_auths**: \[`string`, `number`\][]

Defined in: [src/chain/account.ts:76](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/account.ts#L76)

#### Implementation of

[`AuthorityType`](../interfaces/AuthorityType.md).[`account_auths`](../interfaces/AuthorityType.md#account_auths)

***

### key\_auths

> **key\_auths**: \[`string` \| [`PublicKey`](PublicKey.md), `number`\][]

Defined in: [src/chain/account.ts:77](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/account.ts#L77)

#### Implementation of

[`AuthorityType`](../interfaces/AuthorityType.md).[`key_auths`](../interfaces/AuthorityType.md#key_auths)

***

### weight\_threshold

> **weight\_threshold**: `number`

Defined in: [src/chain/account.ts:75](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/account.ts#L75)

#### Implementation of

[`AuthorityType`](../interfaces/AuthorityType.md).[`weight_threshold`](../interfaces/AuthorityType.md#weight_threshold)

## Methods

### from()

> `static` **from**(`value`): `Authority`

Defined in: [src/chain/account.ts:102](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/account.ts#L102)

Normalizes a public key or raw authority into an Authority.

#### Parameters

##### value

`string` \| [`AuthorityType`](../interfaces/AuthorityType.md) \| [`PublicKey`](PublicKey.md)

Public key string, [PublicKey](PublicKey.md), existing authority, or
raw authority object.

#### Returns

`Authority`

A normalized authority.

#### Example

```ts
const authority = Authority.from('STM8m5UgaFAAYQRuaNejYdS8FVLVp9Ss3K1qAVk5de6F8s3HnVbvA')
```
