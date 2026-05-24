[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / PublicKey

# Class: PublicKey

Defined in: [src/crypto.ts:192](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L192)

Hive public key backed by the secp256k1 elliptic curve.

## Remarks

Pollen validates key material with the Noble secp256k1 implementation and
renders public keys with Hive's base58 plus RIPEMD-160 checksum format. The
default prefix is mainnet `STM`, but custom networks can supply their own
prefix when constructing or deriving keys.

## Example

```ts
import { PublicKey } from '@srbde/pollen'

const key = PublicKey.fromString('STM8m5UgaFAAYQRuaNejYdS8FVLVp9Ss3K1qAVk5de6F8s3HnVbvA')
console.log(key.toString())
```

## Constructors

### Constructor

> **new PublicKey**(`key`, `prefix?`): `PublicKey`

Defined in: [src/crypto.ts:196](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L196)

#### Parameters

##### key

`any`

##### prefix?

`string` = `DEFAULT_ADDRESS_PREFIX`

#### Returns

`PublicKey`

## Properties

### key

> `readonly` **key**: `any`

Defined in: [src/crypto.ts:197](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L197)

***

### prefix

> `readonly` **prefix**: `string` = `DEFAULT_ADDRESS_PREFIX`

Defined in: [src/crypto.ts:198](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L198)

***

### uncompressed

> `readonly` **uncompressed**: `Buffer`

Defined in: [src/crypto.ts:194](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L194)

## Methods

### inspect()

> **inspect**(): `string`

Defined in: [src/crypto.ts:307](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L307)

Used by `utils.inspect` and `console.log` in node.js.

#### Returns

`string`

***

### toJSON()

> **toJSON**(): `string`

Defined in: [src/crypto.ts:300](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L300)

Return JSON representation of this key, same as toString().

#### Returns

`string`

***

### toString()

> **toString**(): `string`

Defined in: [src/crypto.ts:293](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L293)

Renders the key as a Hive public-key string.

#### Returns

`string`

Prefix plus base58-encoded key and checksum.

#### Example

```ts
console.log(publicKey.toString())
```

***

### verify()

> **verify**(`message`, `signature`): `boolean`

Defined in: [src/crypto.ts:274](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L274)

Verifies a compact ECDSA signature against a 32-byte digest.

#### Parameters

##### message

`Buffer`

Digest that was signed. Pollen expects prehashed 32-byte
data and passes `prehash: false` to Noble.

##### signature

[`Signature`](Signature.md)

Signature to verify.

#### Returns

`boolean`

True when the signature is valid for this public key.

#### Remarks

Invalid signature encodings return `false` rather than throwing, which keeps
verification paths simple for API consumers checking user-provided data.

#### Example

```ts
const signature = privateKey.sign(digest)
const ok = privateKey.createPublic().verify(digest, signature)
```

***

### from()

> `static` **from**(`value`): `PublicKey`

Defined in: [src/crypto.ts:248](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L248)

Normalizes a public-key input into a PublicKey instance.

#### Parameters

##### value

`string` \| `PublicKey`

Existing public key or Hive public-key string.

#### Returns

`PublicKey`

`value` unchanged when it is already a key, otherwise a parsed key.

#### Example

```ts
const key = PublicKey.from(account.memo_key)
```

***

### fromBuffer()

> `static` **fromBuffer**(`key`): `any`

Defined in: [src/crypto.ts:208](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L208)

#### Parameters

##### key

`Uint8Array`\<`ArrayBufferLike`\> \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`any`

***

### fromString()

> `static` **fromString**(`wif`): `PublicKey`

Defined in: [src/crypto.ts:232](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L232)

Creates a public key from its Hive string representation.

#### Parameters

##### wif

`string`

Public key string with a three-character network prefix.

#### Returns

`PublicKey`

A validated PublicKey.

#### Throws

AssertionError
Thrown when the prefix or RIPEMD-160 checksum is invalid.

#### Example

```ts
const publicKey = PublicKey.fromString('STM8m5UgaFAAYQRuaNejYdS8FVLVp9Ss3K1qAVk5de6F8s3HnVbvA')
```
