[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / PublicKey

# Class: PublicKey

Defined in: [src/crypto.ts:161](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L161)

Hive public key backed by the secp256k1 elliptic curve.

## Constructors

### Constructor

> **new PublicKey**(`key`, `prefix?`): `PublicKey`

Defined in: [src/crypto.ts:164](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L164)

#### Parameters

##### key

`Uint8Array`

##### prefix?

`string` = `DEFAULT_ADDRESS_PREFIX`

#### Returns

`PublicKey`

## Properties

### key

> `readonly` **key**: `Uint8Array`

Defined in: [src/crypto.ts:165](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L165)

***

### prefix

> `readonly` **prefix**: `string` = `DEFAULT_ADDRESS_PREFIX`

Defined in: [src/crypto.ts:166](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L166)

***

### uncompressed

> `readonly` **uncompressed**: `Uint8Array`

Defined in: [src/crypto.ts:162](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L162)

## Methods

### inspect()

> **inspect**(): `string`

Defined in: [src/crypto.ts:233](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L233)

Used by `utils.inspect` and `console.log` in node.js.

#### Returns

`string`

***

### toJSON()

> **toJSON**(): `string`

Defined in: [src/crypto.ts:226](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L226)

Return JSON representation of this key, same as toString().

#### Returns

`string`

***

### toString()

> **toString**(): `string`

Defined in: [src/crypto.ts:219](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L219)

Renders the key as a Hive public-key string.

#### Returns

`string`

***

### verify()

> **verify**(`message`, `signature`): `boolean`

Defined in: [src/crypto.ts:204](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L204)

Verifies a compact ECDSA signature against a 32-byte digest.

#### Parameters

##### message

`Uint8Array`

##### signature

[`Signature`](Signature.md)

#### Returns

`boolean`

***

### from()

> `static` **from**(`value`): `PublicKey`

Defined in: [src/crypto.ts:193](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L193)

Normalizes a public-key input into a PublicKey instance.

#### Parameters

##### value

`string` \| `PublicKey`

#### Returns

`PublicKey`

***

### fromBuffer()

> `static` **fromBuffer**(`key`): `PublicKey`

Defined in: [src/crypto.ts:178](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L178)

#### Parameters

##### key

`Uint8Array`

#### Returns

`PublicKey`

***

### fromString()

> `static` **fromString**(`wif`): `PublicKey`

Defined in: [src/crypto.ts:185](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/crypto.ts#L185)

Creates a public key from its Hive string representation.

#### Parameters

##### wif

`string`

#### Returns

`PublicKey`
