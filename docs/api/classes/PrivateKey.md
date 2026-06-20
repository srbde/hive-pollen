[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / PrivateKey

# Class: PrivateKey

Defined in: [src/crypto.ts:246](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L246)

Hive private key backed by the secp256k1 elliptic curve.

## Constructors

### Constructor

> **new PrivateKey**(`key`): `PrivateKey`

Defined in: [src/crypto.ts:247](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L247)

#### Parameters

##### key

`Uint8Array`

#### Returns

`PrivateKey`

## Methods

### createPublic()

> **createPublic**(`prefix?`): [`PublicKey`](PublicKey.md)

Defined in: [src/crypto.ts:317](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L317)

Derives the compressed public key for this private key.

#### Parameters

##### prefix?

`string`

#### Returns

[`PublicKey`](PublicKey.md)

***

### get\_shared\_secret()

> **get\_shared\_secret**(`public_key`): `Uint8Array`

Defined in: [src/crypto.ts:340](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L340)

Derives the shared secret used by encrypted Hive memos.

#### Parameters

##### public\_key

[`PublicKey`](PublicKey.md)

#### Returns

`Uint8Array`

***

### inspect()

> **inspect**(): `string`

Defined in: [src/crypto.ts:332](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L332)

Used by `utils.inspect` and `console.log` in node.js.

#### Returns

`string`

***

### sign()

> **sign**(`message`): [`Signature`](Signature.md)

Defined in: [src/crypto.ts:295](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L295)

Signs a 32-byte digest with this private key.

#### Parameters

##### message

`Uint8Array`

#### Returns

[`Signature`](Signature.md)

***

### toString()

> **toString**(): `string`

Defined in: [src/crypto.ts:325](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L325)

Renders the private key as a WIF string.

#### Returns

`string`

***

### from()

> `static` **from**(`value`): `PrivateKey`

Defined in: [src/crypto.ts:262](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L262)

Normalizes a WIF string or raw 32-byte secret into a private key.

#### Parameters

##### value

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`PrivateKey`

#### Remarks

Raw secrets are accepted as `Uint8Array` values so Pollen's key path stays
independent of Node `Buffer` while still working in browser builds.

***

### fromLogin()

> `static` **fromLogin**(`username`, `password`, `role?`): `PrivateKey`

Defined in: [src/crypto.ts:287](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L287)

Derives a Hive role key from an account name and master password.

#### Parameters

##### username

`string`

##### password

`string`

##### role?

[`KeyRole`](../type-aliases/KeyRole.md) = `"active"`

#### Returns

`PrivateKey`

***

### fromSeed()

> `static` **fromSeed**(`seed`): `PrivateKey`

Defined in: [src/crypto.ts:280](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L280)

Derives a private key by hashing an arbitrary seed string.

#### Parameters

##### seed

`string`

#### Returns

`PrivateKey`

***

### fromString()

> `static` **fromString**(`wif`): `PrivateKey`

Defined in: [src/crypto.ts:273](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L273)

Parses a WIF-encoded Hive private key.

#### Parameters

##### wif

`string`

#### Returns

`PrivateKey`
