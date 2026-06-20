[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / cryptoUtils

# Variable: cryptoUtils

> `const` **cryptoUtils**: `object`

Defined in: [src/crypto.ts:454](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/crypto.ts#L454)

Low-level cryptographic utility namespace.

## Type Declaration

### decodePrivate

> **decodePrivate**: (`encodedKey`) => `Uint8Array`

Decode bs58+doubleSha256-checksum encoded private key.

#### Parameters

##### encodedKey

`string`

#### Returns

`Uint8Array`

### doubleSha256

> **doubleSha256**: (`input`) => `Uint8Array`

Return 2-round sha256 hash of input.

#### Parameters

##### input

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`Uint8Array`

### encodePrivate

> **encodePrivate**: (`key`) => `string`

Encode bs58+doubleSha256-checksum private key.

#### Parameters

##### key

`Uint8Array`

#### Returns

`string`

### encodePublic

> **encodePublic**: (`key`, `prefix`) => `string`

Encode public key with bs58+ripemd160-checksum.

#### Parameters

##### key

`Uint8Array`

##### prefix

`string`

#### Returns

`string`

### generateTrxId

> **generateTrxId**: (`transaction`) => `string`

#### Parameters

##### transaction

[`Transaction`](../interfaces/Transaction.md)

#### Returns

`string`

### isCanonicalSignature

> **isCanonicalSignature**: (`signature`) => `boolean`

Return true if signature is canonical, otherwise false.

#### Parameters

##### signature

`Uint8Array`

#### Returns

`boolean`

### isWif

> **isWif**: (`privWif`) => `boolean`

Return true if string is wif, otherwise false.

#### Parameters

##### privWif

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`boolean`

### ripemd160

> **ripemd160**: (`input`) => `Uint8Array`

Return ripemd160 hash of input.

#### Parameters

##### input

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`Uint8Array`

### sha256

> **sha256**: (`input`) => `Uint8Array`

Return sha256 hash of input.

#### Parameters

##### input

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`Uint8Array`

### signTransaction

> **signTransaction**: (`transaction`, `keys`, `chainId`) => [`SignedTransaction`](../interfaces/SignedTransaction.md)

Returns a copy of a transaction with one or more signatures appended.

#### Parameters

##### transaction

[`Transaction`](../interfaces/Transaction.md)

##### keys

[`PrivateKey`](../classes/PrivateKey.md) \| [`PrivateKey`](../classes/PrivateKey.md)[]

##### chainId?

`Uint8Array` = `DEFAULT_CHAIN_ID`

#### Returns

[`SignedTransaction`](../interfaces/SignedTransaction.md)

### transactionDigest

> **transactionDigest**: (`transaction`, `chainId`) => `Uint8Array`\<`ArrayBufferLike`\>

Return the sha256 transaction digest.

#### Parameters

##### transaction

[`Transaction`](../interfaces/Transaction.md) \| [`SignedTransaction`](../interfaces/SignedTransaction.md)

##### chainId?

`Uint8Array` = `DEFAULT_CHAIN_ID`

#### Returns

`Uint8Array`\<`ArrayBufferLike`\>
