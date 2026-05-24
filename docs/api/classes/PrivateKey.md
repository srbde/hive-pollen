[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / PrivateKey

# Class: PrivateKey

Defined in: [src/crypto.ts:341](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L341)

Hive private key backed by the secp256k1 elliptic curve.

## Remarks

Private keys sign transaction digests, derive Hive public keys, and produce
memo shared secrets. Pollen uses Noble secp256k1 for validation, signing, and
ECDH-style point multiplication instead of legacy curve packages.

## Example

```ts
import { PrivateKey } from '@srbde/pollen'

const key = PrivateKey.fromString(process.env.HIVE_ACTIVE_KEY!)
const publicKey = key.createPublic()

console.log(publicKey.toString())
```

## Constructors

### Constructor

> **new PrivateKey**(`key`): `PrivateKey`

Defined in: [src/crypto.ts:344](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L344)

#### Parameters

##### key

`Buffer`

#### Returns

`PrivateKey`

## Properties

### secret

> **secret**: `Buffer`

Defined in: [src/crypto.ts:342](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L342)

## Methods

### createPublic()

> **createPublic**(`prefix?`): [`PublicKey`](PublicKey.md)

Defined in: [src/crypto.ts:481](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L481)

Derives the compressed public key for this private key.

#### Parameters

##### prefix?

`string`

Optional network prefix for the rendered public key.

#### Returns

[`PublicKey`](PublicKey.md)

A [PublicKey](PublicKey.md) matching this secret.

#### Example

```ts
const publicKey = privateKey.createPublic('STM')
```

***

### get\_shared\_secret()

> **get\_shared\_secret**(`public_key`): `Buffer`

Defined in: [src/crypto.ts:524](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L524)

Derives the shared secret used by encrypted Hive memos.

#### Parameters

##### public\_key

[`PublicKey`](PublicKey.md)

Counterparty memo public key.

#### Returns

`Buffer`

SHA-512 hash of the secp256k1 ECDH x-coordinate.

#### Remarks

The returned bytes feed the AES memo helper; callers normally use
`Memo.encode` and `Memo.decode` instead of handling this secret directly.

#### Example

```ts
const shared = memoPrivateKey.get_shared_secret(recipientMemoPublicKey)
```

***

### inspect()

> **inspect**(): `string`

Defined in: [src/crypto.ts:504](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L504)

Used by `utils.inspect` and `console.log` in node.js. Does not show the full key
to get the full encoded key you need to explicitly call [toString](#tostring).

#### Returns

`string`

***

### multiply()

> **multiply**(`pub`): `Buffer`

Defined in: [src/crypto.ts:438](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L438)

#### Parameters

##### pub

`any`

#### Returns

`Buffer`

***

### sign()

> **sign**(`message`): [`Signature`](Signature.md)

Defined in: [src/crypto.ts:460](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L460)

Signs a 32-byte digest with this private key.

#### Parameters

##### message

`Buffer`

Digest to sign.

#### Returns

[`Signature`](Signature.md)

A compact recoverable signature.

#### Remarks

Pollen feeds Noble secp256k1 deterministic extra entropy and retries until
the signature is canonical for Hive transaction acceptance.

#### Example

```ts
const digest = cryptoUtils.sha256(Buffer.from('nectar'))
const signature = privateKey.sign(digest)
```

***

### toString()

> **toString**(): `string`

Defined in: [src/crypto.ts:496](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L496)

Renders the private key as a WIF string.

#### Returns

`string`

Base58Check key with Hive's WIF network marker.

#### Example

```ts
const wif = privateKey.toString()
```

***

### from()

> `static` **from**(`value`): `PrivateKey`

Defined in: [src/crypto.ts:366](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L366)

Normalizes a WIF string or raw secret buffer into a private key.

#### Parameters

##### value

`string` \| `Buffer`\<`ArrayBufferLike`\>

WIF-encoded key string or 32-byte secret buffer.

#### Returns

`PrivateKey`

A validated PrivateKey.

#### Throws

AssertionError
Thrown when the key bytes are not a valid secp256k1 secret.

#### Example

```ts
const key = PrivateKey.from(process.env.HIVE_ACTIVE_KEY!)
```

***

### fromLogin()

> `static` **fromLogin**(`username`, `password`, `role?`): `PrivateKey`

Defined in: [src/crypto.ts:429](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L429)

Derives a Hive role key from an account name and master password.

#### Parameters

##### username

`string`

Hive account name.

##### password

`string`

Account master password.

##### role?

[`KeyRole`](../type-aliases/KeyRole.md) = `'active'`

Authority role to derive. Defaults to `active`.

#### Returns

`PrivateKey`

The deterministic role private key.

#### Remarks

Hive's conventional derivation concatenates account name, role, and master
password before hashing. Pollen preserves that behavior for compatibility
with existing Hive wallets.

#### Example

```ts
const postingKey = PrivateKey.fromLogin('srbde', masterPassword, 'posting')
```

***

### fromSeed()

> `static` **fromSeed**(`seed`): `PrivateKey`

Defined in: [src/crypto.ts:407](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L407)

Derives a private key by hashing an arbitrary seed string.

#### Parameters

##### seed

`string`

Deterministic seed material.

#### Returns

`PrivateKey`

A private key derived from `sha256(seed)`.

#### Remarks

This is useful for deterministic test fixtures. For production accounts,
prefer importing existing account keys or using Hive's login derivation.

#### Example

```ts
const fixtureKey = PrivateKey.fromSeed('pollen:test:active')
```

***

### fromString()

> `static` **fromString**(`wif`): `PrivateKey`

Defined in: [src/crypto.ts:388](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L388)

Parses a WIF-encoded Hive private key.

#### Parameters

##### wif

`string`

Base58Check private key string.

#### Returns

`PrivateKey`

A validated private key.

#### Throws

AssertionError
Thrown when the network marker, checksum, or key bytes are invalid.

#### Example

```ts
const activeKey = PrivateKey.fromString(process.env.HIVE_ACTIVE_KEY!)
```
