[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Signature

# Class: Signature

Defined in: [src/crypto.ts:546](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L546)

Compact recoverable secp256k1 signature.

## Remarks

Hive serializes transaction signatures as a recovery byte followed by the
64-byte `(r, s)` signature payload. Pollen stores the payload and recovery id
separately while preserving the canonical wire representation.

## Example

```ts
const signature = privateKey.sign(digest)
const publicKey = signature.recover(digest)
```

## Constructors

### Constructor

> **new Signature**(`data`, `recovery`): `Signature`

Defined in: [src/crypto.ts:547](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L547)

#### Parameters

##### data

`Buffer`

##### recovery

`number`

#### Returns

`Signature`

## Properties

### data

> **data**: `Buffer`

Defined in: [src/crypto.ts:547](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L547)

***

### recovery

> **recovery**: `number`

Defined in: [src/crypto.ts:547](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L547)

## Methods

### recover()

> **recover**(`message`, `prefix?`): [`PublicKey`](PublicKey.md)

Defined in: [src/crypto.ts:575](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L575)

Recovers the public key that produced this signature.

#### Parameters

##### message

`Buffer`

32-byte digest that was originally signed.

##### prefix?

`string`

Optional network prefix for the recovered key.

#### Returns

[`PublicKey`](PublicKey.md)

The recovered public key.

#### Example

```ts
const recovered = signature.recover(digest, 'STM')
console.log(recovered.toString())
```

***

### toBuffer()

> **toBuffer**(): `Buffer`\<`ArrayBuffer`\>

Defined in: [src/crypto.ts:581](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L581)

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### toString()

> **toString**(): `string`

Defined in: [src/crypto.ts:588](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L588)

#### Returns

`string`

***

### fromBuffer()

> `static` **fromBuffer**(`buffer`): `Signature`

Defined in: [src/crypto.ts:551](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L551)

#### Parameters

##### buffer

`Buffer`

#### Returns

`Signature`

***

### fromString()

> `static` **fromString**(`string`): `Signature`

Defined in: [src/crypto.ts:558](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L558)

#### Parameters

##### string

`string`

#### Returns

`Signature`
