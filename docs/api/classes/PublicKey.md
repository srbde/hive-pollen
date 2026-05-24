[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / PublicKey

# Class: PublicKey

Defined in: [src/crypto.ts:162](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L162)

Hive public key backed by the secp256k1 elliptic curve.

## Constructors

### Constructor

> **new PublicKey**(`key`, `prefix?`): `PublicKey`

Defined in: [src/crypto.ts:165](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L165)

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

Defined in: [src/crypto.ts:166](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L166)

***

### prefix

> `readonly` **prefix**: `string` = `DEFAULT_ADDRESS_PREFIX`

Defined in: [src/crypto.ts:167](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L167)

***

### uncompressed

> `readonly` **uncompressed**: `Uint8Array`

Defined in: [src/crypto.ts:163](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L163)

## Methods

### inspect()

> **inspect**(): `string`

Defined in: [src/crypto.ts:234](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L234)

Used by `utils.inspect` and `console.log` in node.js.

#### Returns

`string`

***

### toJSON()

> **toJSON**(): `string`

Defined in: [src/crypto.ts:227](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L227)

Return JSON representation of this key, same as toString().

#### Returns

`string`

***

### toString()

> **toString**(): `string`

Defined in: [src/crypto.ts:220](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L220)

Renders the key as a Hive public-key string.

#### Returns

`string`

***

### verify()

> **verify**(`message`, `signature`): `boolean`

Defined in: [src/crypto.ts:205](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L205)

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

Defined in: [src/crypto.ts:194](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L194)

Normalizes a public-key input into a PublicKey instance.

#### Parameters

##### value

`string` \| `PublicKey`

#### Returns

`PublicKey`

***

### fromBuffer()

> `static` **fromBuffer**(`key`): `PublicKey`

Defined in: [src/crypto.ts:179](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L179)

#### Parameters

##### key

`Uint8Array`

#### Returns

`PublicKey`

***

### fromString()

> `static` **fromString**(`wif`): `PublicKey`

Defined in: [src/crypto.ts:186](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L186)

Creates a public key from its Hive string representation.

#### Parameters

##### wif

`string`

#### Returns

`PublicKey`
