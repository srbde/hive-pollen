[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Memo

# Variable: Memo

> `const` **Memo**: `object`

Defined in: [src/memo.ts:156](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/memo.ts#L156)

Hive encrypted memo helper.

## Type Declaration

### decode

> **decode**: (`private_key`, `memo`) => `string`

Decodes a Hive memo, decrypting messages that begin with `#`.

#### Parameters

##### private\_key

`string` \| [`PrivateKey`](../classes/PrivateKey.md)

Recipient or sender memo private key, either as a
[PrivateKey](../classes/PrivateKey.md) instance or WIF string.

##### memo

`string`

Memo text or encrypted memo payload.

#### Returns

`string`

The original memo text. Encrypted memos remain `#`-prefixed after
decryption to preserve Hive memo semantics.

#### Remarks

The decryptor determines the counterparty public key from the encrypted memo
envelope, derives the AES key through the memo shared secret, and supports
legacy payloads that were not length-prefixed.

#### Throws

Error
Thrown when the runtime cannot support memo encryption, the key is invalid,
or AES checksum validation fails.

#### Example

```ts
const plaintext = Memo.decode(recipientMemoKey, encryptedMemo)
console.log(plaintext)
```

### encode

> **encode**: (`private_key`, `public_key`, `memo`, `testNonce?`) => `string`

Encodes a Hive memo, encrypting messages that begin with `#`.

#### Parameters

##### private\_key

`string` \| [`PrivateKey`](../classes/PrivateKey.md)

Sender memo private key, either as a [PrivateKey](../classes/PrivateKey.md)
instance or WIF string.

##### public\_key

`string` \| [`PublicKey`](../classes/PublicKey.md)

Recipient memo public key, either as a [PublicKey](../classes/PublicKey.md)
instance or Hive public-key string.

##### memo

`string`

Plain memo text. Only values beginning with `#` are encrypted;
unprefixed memos are returned unchanged.

##### testNonce?

`string`

Optional deterministic nonce used by tests.

#### Returns

`string`

The original plaintext memo or a `#`-prefixed encrypted memo payload.

#### Remarks

Pollen serializes the memo with its binary writer before AES-CBC encryption so
Unicode text and Hive's encrypted memo structure round-trip consistently.

#### Throws

Error
Thrown when the runtime cannot support memo encryption or key conversion
fails.

#### Example

```ts
const encrypted = Memo.encode(senderMemoKey, recipientMemoPublicKey, '#hello nectar')
```

## Remarks

`Memo` exposes the two operations most applications need: encode before
broadcasting a transfer memo and decode after reading a transfer memo from
account history. The helper follows Hive's convention that only memos
beginning with `#` are encrypted.

## Example

```ts
import { Memo } from '@srbde/pollen'

const encrypted = Memo.encode(senderMemoKey, recipientMemoPublicKey, '#for your eyes')
const plaintext = Memo.decode(recipientMemoKey, encrypted)
```
