[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Signature

# Class: Signature

Defined in: [src/crypto.ts:351](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L351)

Compact recoverable secp256k1 signature.

## Constructors

### Constructor

> **new Signature**(`data`, `recovery`): `Signature`

Defined in: [src/crypto.ts:352](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L352)

#### Parameters

##### data

`Uint8Array`

##### recovery

`number`

#### Returns

`Signature`

## Properties

### data

> **data**: `Uint8Array`

Defined in: [src/crypto.ts:353](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L353)

***

### recovery

> **recovery**: `number`

Defined in: [src/crypto.ts:354](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L354)

## Methods

### recover()

> **recover**(`message`, `prefix?`): [`PublicKey`](PublicKey.md)

Defined in: [src/crypto.ts:377](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L377)

Recovers the public key that produced this signature.

#### Parameters

##### message

`Uint8Array`

##### prefix?

`string`

#### Returns

[`PublicKey`](PublicKey.md)

***

### toBuffer()

> **toBuffer**(): `Uint8Array`\<`ArrayBuffer`\>

Defined in: [src/crypto.ts:385](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L385)

#### Returns

`Uint8Array`\<`ArrayBuffer`\>

***

### toString()

> **toString**(): `string`

Defined in: [src/crypto.ts:393](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L393)

#### Returns

`string`

***

### fromBuffer()

> `static` **fromBuffer**(`buffer`): `Signature`

Defined in: [src/crypto.ts:359](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L359)

#### Parameters

##### buffer

`Uint8Array`

#### Returns

`Signature`

***

### fromString()

> `static` **fromString**(`string`): `Signature`

Defined in: [src/crypto.ts:370](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/crypto.ts#L370)

#### Parameters

##### string

`string`

#### Returns

`Signature`
