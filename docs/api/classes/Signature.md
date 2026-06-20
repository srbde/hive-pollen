[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Signature

# Class: Signature

Defined in: [src/crypto.ts:350](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L350)

Compact recoverable secp256k1 signature.

## Constructors

### Constructor

> **new Signature**(`data`, `recovery`): `Signature`

Defined in: [src/crypto.ts:351](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L351)

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

Defined in: [src/crypto.ts:352](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L352)

***

### recovery

> **recovery**: `number`

Defined in: [src/crypto.ts:353](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L353)

## Methods

### recover()

> **recover**(`message`, `prefix?`): [`PublicKey`](PublicKey.md)

Defined in: [src/crypto.ts:376](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L376)

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

Defined in: [src/crypto.ts:384](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L384)

#### Returns

`Uint8Array`\<`ArrayBuffer`\>

***

### toString()

> **toString**(): `string`

Defined in: [src/crypto.ts:392](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L392)

#### Returns

`string`

***

### fromBuffer()

> `static` **fromBuffer**(`buffer`): `Signature`

Defined in: [src/crypto.ts:358](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L358)

#### Parameters

##### buffer

`Uint8Array`

#### Returns

`Signature`

***

### fromString()

> `static` **fromString**(`string`): `Signature`

Defined in: [src/crypto.ts:369](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L369)

#### Parameters

##### string

`string`

#### Returns

`Signature`
