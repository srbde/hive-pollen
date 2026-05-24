[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / cryptoUtils

# Variable: cryptoUtils

> `const` **cryptoUtils**: `object`

Defined in: [src/crypto.ts:676](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L676)

Low-level cryptographic utility namespace.

## Type Declaration

### decodePrivate

> **decodePrivate**: (`encodedKey`) => `Buffer`

Decode bs58+doubleSha256-checksum encoded private key.

#### Parameters

##### encodedKey

`string`

#### Returns

`Buffer`

### doubleSha256

> **doubleSha256**: (`input`) => `Buffer`

Return 2-round sha256 hash of input.

#### Parameters

##### input

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

### encodePrivate

> **encodePrivate**: (`key`) => `string`

Encode bs58+doubleSha256-checksum private key.

#### Parameters

##### key

`Buffer`

#### Returns

`string`

### encodePublic

> **encodePublic**: (`key`, `prefix`) => `string`

Encode public key with bs58+ripemd160-checksum.

#### Parameters

##### key

`Buffer`

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

`Buffer`

#### Returns

`boolean`

### isWif

> **isWif**: (`privWif`) => `boolean`

Return true if string is wif, otherwise false.

#### Parameters

##### privWif

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

### ripemd160

> **ripemd160**: (`input`) => `Buffer`

Return ripemd160 hash of input.

#### Parameters

##### input

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

### sha256

> **sha256**: (`input`) => `Buffer`

Return sha256 hash of input.

#### Parameters

##### input

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Buffer`

### signTransaction

> **signTransaction**: (`transaction`, `keys`, `chainId`) => [`SignedTransaction`](../interfaces/SignedTransaction.md)

Returns a copy of a transaction with one or more signatures appended.

#### Parameters

##### transaction

[`Transaction`](../interfaces/Transaction.md)

Transaction to sign.

##### keys

[`PrivateKey`](../classes/PrivateKey.md) \| [`PrivateKey`](../classes/PrivateKey.md)[]

Private key or keys to sign the transaction digest.

##### chainId?

`Buffer` = `DEFAULT_CHAIN_ID`

Chain id to include in the transaction digest.

#### Returns

[`SignedTransaction`](../interfaces/SignedTransaction.md)

A signed transaction copy.

#### Throws

SerializationError
Thrown when the transaction cannot be serialized before hashing.

#### Example

```ts
const signed = cryptoUtils.signTransaction(transaction, activeKey, client.chainId)
```

### transactionDigest

> **transactionDigest**: (`transaction`, `chainId`) => `Buffer`\<`ArrayBufferLike`\>

Return the sha256 transaction digest.

#### Parameters

##### transaction

[`Transaction`](../interfaces/Transaction.md) \| [`SignedTransaction`](../interfaces/SignedTransaction.md)

##### chainId?

`Buffer` = `DEFAULT_CHAIN_ID`

The chain id to use when creating the hash.

#### Returns

`Buffer`\<`ArrayBufferLike`\>

## Remarks

These helpers expose Hive-compatible hashing, key encoding, signature
canonicality, transaction digesting, and transaction id generation. Most apps
should prefer [PrivateKey](../classes/PrivateKey.md), [PublicKey](../classes/PublicKey.md), [Signature](../classes/Signature.md), and
`client.broadcast`, but the namespace is useful for protocol tooling and
educational examples in the Pollen documentation hub.

## Example

```ts
const digest = cryptoUtils.transactionDigest(transaction, client.chainId)
const signature = activeKey.sign(digest)
```
