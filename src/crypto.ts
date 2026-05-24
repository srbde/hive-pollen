/**
 * @file Hive crypto helpers.
 * @author Johan Nordberg <code@johan-nordberg.com>
 * @license
 * Copyright (c) 2017 Johan Nordberg. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * You acknowledge that this software is not designed, licensed or intended for use
 * in the design, construction, operation or maintenance of any military facility.
 */

import assert from 'assert'
import { createHash } from 'crypto'
import { SerializationError } from './errors.js'
import { Types } from './chain/serializer.js'
import { SignedTransaction, Transaction } from './chain/transaction.js'
import { DEFAULT_ADDRESS_PREFIX, DEFAULT_CHAIN_ID } from './client.js'
import { copy, BinaryWriter } from './utils.js'

import { base58 } from '@scure/base'
import { ripemd160 as nobleRipemd160 } from '@noble/hashes/legacy.js'
import { sha256 as nobleSha256, sha512 as nobleSha512 } from '@noble/hashes/sha2.js'
import { secp256k1 as nobleSecp256k1 } from '@noble/curves/secp256k1.js'

/**
 * Network marker byte used by Hive WIF private keys.
 *
 * @remarks
 * Hive private keys use the same `0x80` prefix convention as Bitcoin-style WIF
 * keys before adding the double-SHA-256 checksum.
 *
 * @example
 * ```ts
 * import { NETWORK_ID } from '@srbde/pollen'
 *
 * console.log(NETWORK_ID.toString('hex')) // "80"
 * ```
 */
export const NETWORK_ID = Buffer.from([0x80])

/**
 * Return ripemd160 hash of input.
 */
function ripemd160(input: Buffer | string): Buffer {
  const data = typeof input === 'string' ? Buffer.from(input, 'utf8') : input
  return Buffer.from(nobleRipemd160(data))
}

/**
 * Return sha256 hash of input.
 */
function sha256(input: Buffer | string): Buffer {
  const data = typeof input === 'string' ? Buffer.from(input, 'utf8') : input
  return Buffer.from(nobleSha256(data))
}

/**
 * Return sha512 hash of input
 */
function sha512(input: Buffer | string): Buffer {
  const data = typeof input === 'string' ? Buffer.from(input, 'utf8') : input
  return Buffer.from(nobleSha512(data))
}

/**
 * Return 2-round sha256 hash of input.
 */
function doubleSha256(input: Buffer | string): Buffer {
  return sha256(sha256(input))
}

/**
 * Encode public key with bs58+ripemd160-checksum.
 */
function encodePublic(key: Buffer, prefix: string): string {
  const checksum = ripemd160(key)
  return prefix + base58.encode(Buffer.concat([key, checksum.slice(0, 4)]))
}

/**
 * Decode bs58+ripemd160-checksum encoded public key.
 */
function decodePublic(encodedKey: string): { key: Buffer; prefix: string } {
  const prefix = encodedKey.slice(0, 3)
  assert.equal(prefix.length, 3, 'public key invalid prefix')
  encodedKey = encodedKey.slice(3)
  const buffer: Buffer = Buffer.from(base58.decode(encodedKey))
  const checksum = buffer.slice(-4)
  const key = buffer.slice(0, -4)
  const checksumVerify = ripemd160(key).slice(0, 4)
  assert.deepEqual(checksumVerify, checksum, 'public key checksum mismatch')
  return { key, prefix }
}

/**
 * Encode bs58+doubleSha256-checksum private key.
 */
function encodePrivate(key: Buffer): string {
  assert.equal(key.readUInt8(0), 0x80, 'private key network id mismatch')
  const checksum = doubleSha256(key)
  return base58.encode(Buffer.concat([key, checksum.slice(0, 4)]))
}

/**
 * Decode bs58+doubleSha256-checksum encoded private key.
 */
function decodePrivate(encodedKey: string): Buffer {
  const buffer: Buffer = Buffer.from(base58.decode(encodedKey))
  assert.deepEqual(
    buffer.slice(0, 1),
    NETWORK_ID,
    'private key network id mismatch'
  )
  const checksum = buffer.slice(-4)
  const key = buffer.slice(0, -4)
  const checksumVerify = doubleSha256(key).slice(0, 4)
  assert.deepEqual(checksumVerify, checksum, 'private key checksum mismatch')
  return key
}

/**
 * Return true if signature is canonical, otherwise false.
 */
function isCanonicalSignature(signature: Buffer): boolean {
  return (
    !(signature[0] & 0x80) &&
    !(signature[0] === 0 && !(signature[1] & 0x80)) &&
    !(signature[32] & 0x80) &&
    !(signature[32] === 0 && !(signature[33] & 0x80))
  )
}

/**
 * Return true if string is wif, otherwise false.
 */
function isWif(privWif: string | Buffer): boolean {
  try {
      const wifStr = typeof privWif === 'string' ? privWif : privWif.toString('utf8')
      const bufWif = Buffer.from(base58.decode(wifStr))
      const privKey = bufWif.slice(0, -4)
      const checksum = bufWif.slice(-4)
      let newChecksum = sha256(privKey)
      newChecksum = sha256(newChecksum)
      newChecksum = newChecksum.slice(0, 4)
      return (checksum.toString('hex') === newChecksum.toString('hex'))
  } catch (e: any) {
      return false
  }
}

/**
 * Hive public key backed by the secp256k1 elliptic curve.
 *
 * @remarks
 * Pollen validates key material with the Noble secp256k1 implementation and
 * renders public keys with Hive's base58 plus RIPEMD-160 checksum format. The
 * default prefix is mainnet `STM`, but custom networks can supply their own
 * prefix when constructing or deriving keys.
 *
 * @example
 * ```ts
 * import { PublicKey } from '@srbde/pollen'
 *
 * const key = PublicKey.fromString('STM8m5UgaFAAYQRuaNejYdS8FVLVp9Ss3K1qAVk5de6F8s3HnVbvA')
 * console.log(key.toString())
 * ```
 */
export class PublicKey {

  public readonly uncompressed: Buffer

  constructor(
    public readonly key: any,
    public readonly prefix = DEFAULT_ADDRESS_PREFIX,
  ) {
    try {
      const point = nobleSecp256k1.Point.fromBytes(key)
      this.uncompressed = Buffer.from(point.toBytes(false))
    } catch (err) {
      assert(false, 'invalid public key')
    }
  }

  public static fromBuffer(key: Buffer | Uint8Array) {
    const buffer = Buffer.isBuffer(key) ? key : Buffer.from(key)
    try {
      nobleSecp256k1.Point.fromBytes(buffer)
    } catch (err) {
      assert(false, 'invalid buffer as public key')
    }
    return { key: buffer } as any
  }

  /**
   * Creates a public key from its Hive string representation.
   *
   * @param wif - Public key string with a three-character network prefix.
   * @returns A validated {@link PublicKey}.
   *
   * @throws AssertionError
   * Thrown when the prefix or RIPEMD-160 checksum is invalid.
   *
   * @example
   * ```ts
   * const publicKey = PublicKey.fromString('STM8m5UgaFAAYQRuaNejYdS8FVLVp9Ss3K1qAVk5de6F8s3HnVbvA')
   * ```
   */
  public static fromString(wif: string) {
    const { key, prefix } = decodePublic(wif)
    return new PublicKey(key, prefix)
  }

  /**
   * Normalizes a public-key input into a {@link PublicKey} instance.
   *
   * @param value - Existing public key or Hive public-key string.
   * @returns `value` unchanged when it is already a key, otherwise a parsed key.
   *
   * @example
   * ```ts
   * const key = PublicKey.from(account.memo_key)
   * ```
   */
  public static from(value: string | PublicKey) {
    if (value instanceof PublicKey) {
      return value
    } else {
      return PublicKey.fromString(value)
    }
  }

  /**
   * Verifies a compact ECDSA signature against a 32-byte digest.
   *
   * @param message - Digest that was signed. Pollen expects prehashed 32-byte
   * data and passes `prehash: false` to Noble.
   * @param signature - Signature to verify.
   * @returns True when the signature is valid for this public key.
   *
   * @remarks
   * Invalid signature encodings return `false` rather than throwing, which keeps
   * verification paths simple for API consumers checking user-provided data.
   *
   * @example
   * ```ts
   * const signature = privateKey.sign(digest)
   * const ok = privateKey.createPublic().verify(digest, signature)
   * ```
   */
  public verify(message: Buffer, signature: Signature): boolean {
    try {
      const sig = new nobleSecp256k1.Signature(BigInt('0x' + signature.data.slice(0,32).toString('hex')), BigInt('0x' + signature.data.slice(32).toString('hex')))
      return nobleSecp256k1.verify(sig.toBytes(), message, this.key, { prehash: false, lowS: true })
    } catch (e: any) {
      return false
    }
  }

  /**
   * Renders the key as a Hive public-key string.
   *
   * @returns Prefix plus base58-encoded key and checksum.
   *
   * @example
   * ```ts
   * console.log(publicKey.toString())
   * ```
   */
  public toString() {
    return encodePublic(this.key, this.prefix)
  }

  /**
   * Return JSON representation of this key, same as toString().
   */
  public toJSON() {
    return this.toString()
  }

  /**
   * Used by `utils.inspect` and `console.log` in node.js.
   */
  public inspect() {
    return `PublicKey: ${ this.toString() }`
  }
}

/**
 * Hive authority role used for password-derived account keys.
 *
 * @example
 * ```ts
 * const role: KeyRole = 'posting'
 * const key = PrivateKey.fromLogin('srbde', masterPassword, role)
 * ```
 */
export type KeyRole = 'owner' | 'active' | 'posting' | 'memo'

/**
 * Hive private key backed by the secp256k1 elliptic curve.
 *
 * @remarks
 * Private keys sign transaction digests, derive Hive public keys, and produce
 * memo shared secrets. Pollen uses Noble secp256k1 for validation, signing, and
 * ECDH-style point multiplication instead of legacy curve packages.
 *
 * @example
 * ```ts
 * import { PrivateKey } from '@srbde/pollen'
 *
 * const key = PrivateKey.fromString(process.env.HIVE_ACTIVE_KEY!)
 * const publicKey = key.createPublic()
 *
 * console.log(publicKey.toString())
 * ```
 */
export class PrivateKey {
  public secret!: Buffer

  constructor(private key: Buffer) {
    try {
      assert(nobleSecp256k1.utils.isValidSecretKey(key), 'invalid private key')
    } catch (e: any) {
      assert(false, 'invalid private key')
    }
  }

  /**
   * Normalizes a WIF string or raw secret buffer into a private key.
   *
   * @param value - WIF-encoded key string or 32-byte secret buffer.
   * @returns A validated {@link PrivateKey}.
   *
   * @throws AssertionError
   * Thrown when the key bytes are not a valid secp256k1 secret.
   *
   * @example
   * ```ts
   * const key = PrivateKey.from(process.env.HIVE_ACTIVE_KEY!)
   * ```
   */
  public static from(value: string | Buffer) {
    if (typeof value === 'string') {
      return PrivateKey.fromString(value)
    } else {
      return new PrivateKey(value)
    }
  }

  /**
   * Parses a WIF-encoded Hive private key.
   *
   * @param wif - Base58Check private key string.
   * @returns A validated private key.
   *
   * @throws AssertionError
   * Thrown when the network marker, checksum, or key bytes are invalid.
   *
   * @example
   * ```ts
   * const activeKey = PrivateKey.fromString(process.env.HIVE_ACTIVE_KEY!)
   * ```
   */
  public static fromString(wif: string) {
    return new PrivateKey(decodePrivate(wif).slice(1))
  }

  /**
   * Derives a private key by hashing an arbitrary seed string.
   *
   * @param seed - Deterministic seed material.
   * @returns A private key derived from `sha256(seed)`.
   *
   * @remarks
   * This is useful for deterministic test fixtures. For production accounts,
   * prefer importing existing account keys or using Hive's login derivation.
   *
   * @example
   * ```ts
   * const fixtureKey = PrivateKey.fromSeed('pollen:test:active')
   * ```
   */
  public static fromSeed(seed: string) {
    return new PrivateKey(sha256(seed))
  }

  /**
   * Derives a Hive role key from an account name and master password.
   *
   * @param username - Hive account name.
   * @param password - Account master password.
   * @param role - Authority role to derive. Defaults to `active`.
   * @returns The deterministic role private key.
   *
   * @remarks
   * Hive's conventional derivation concatenates account name, role, and master
   * password before hashing. Pollen preserves that behavior for compatibility
   * with existing Hive wallets.
   *
   * @example
   * ```ts
   * const postingKey = PrivateKey.fromLogin('srbde', masterPassword, 'posting')
   * ```
   */
  public static fromLogin(
    username: string,
    password: string,
    role: KeyRole = 'active'
  ) {
    const seed = username + role + password
    return PrivateKey.fromSeed(seed)
  }

  public multiply(pub: any): Buffer {
    const point = nobleSecp256k1.Point.fromBytes(pub.key)
    const result = point.multiply(BigInt('0x' + this.secret.toString('hex')))
    return Buffer.from(result.toBytes(false))
  }

  /**
   * Signs a 32-byte digest with this private key.
   *
   * @param message - Digest to sign.
   * @returns A compact recoverable signature.
   *
   * @remarks
   * Pollen feeds Noble secp256k1 deterministic extra entropy and retries until
   * the signature is canonical for Hive transaction acceptance.
   *
   * @example
   * ```ts
   * const digest = cryptoUtils.sha256(Buffer.from('nectar'))
   * const signature = privateKey.sign(digest)
   * ```
   */
  public sign(message: Buffer): Signature {
    let rawSig: Uint8Array
    let attempts = 0
    do {
      const extra = sha256(Buffer.concat([message, Buffer.alloc(1, ++attempts)]))
      rawSig = nobleSecp256k1.sign(message, this.key, { extraEntropy: extra, format: 'recovered', prehash: false, lowS: true })
    } while (!isCanonicalSignature(Buffer.from(rawSig.slice(1))))
    return new Signature(Buffer.from(rawSig.slice(1)), rawSig[0])
  }

  /**
   * Derives the compressed public key for this private key.
   *
   * @param prefix - Optional network prefix for the rendered public key.
   * @returns A {@link PublicKey} matching this secret.
   *
   * @example
   * ```ts
   * const publicKey = privateKey.createPublic('STM')
   * ```
   */
  public createPublic(prefix?: string): PublicKey {
    const pubKey = nobleSecp256k1.getPublicKey(this.key, true)
    return new PublicKey(Buffer.from(pubKey), prefix)
  }

  /**
   * Renders the private key as a WIF string.
   *
   * @returns Base58Check key with Hive's WIF network marker.
   *
   * @example
   * ```ts
   * const wif = privateKey.toString()
   * ```
   */
  public toString() {
    return encodePrivate(Buffer.concat([NETWORK_ID, this.key]))
  }

  /**
   * Used by `utils.inspect` and `console.log` in node.js. Does not show the full key
   * to get the full encoded key you need to explicitly call {@link toString}.
   */
  public inspect() {
    const key = this.toString()
    return `PrivateKey: ${ key.slice(0, 6) }...${ key.slice(-6) }`
  }

  /**
   * Derives the shared secret used by encrypted Hive memos.
   *
   * @param public_key - Counterparty memo public key.
   * @returns SHA-512 hash of the secp256k1 ECDH x-coordinate.
   *
   * @remarks
   * The returned bytes feed the AES memo helper; callers normally use
   * `Memo.encode` and `Memo.decode` instead of handling this secret directly.
   *
   * @example
   * ```ts
   * const shared = memoPrivateKey.get_shared_secret(recipientMemoPublicKey)
   * ```
   */
  public get_shared_secret(public_key: PublicKey): Buffer {
    const point = nobleSecp256k1.Point.fromBytes(public_key.uncompressed)
    const P = point.multiply(BigInt('0x' + this.key.toString('hex')))
    const S = P.x.toString(16).padStart(64, '0')
    return sha512(Buffer.from(S, 'hex'))
  }
}

/**
 * Compact recoverable secp256k1 signature.
 *
 * @remarks
 * Hive serializes transaction signatures as a recovery byte followed by the
 * 64-byte `(r, s)` signature payload. Pollen stores the payload and recovery id
 * separately while preserving the canonical wire representation.
 *
 * @example
 * ```ts
 * const signature = privateKey.sign(digest)
 * const publicKey = signature.recover(digest)
 * ```
 */
export class Signature {
  constructor(public data: Buffer, public recovery: number) {
    assert.equal(data.length, 64, 'invalid signature')
  }

  public static fromBuffer(buffer: Buffer) {
    assert.equal(buffer.length, 65, 'invalid signature')
    const recovery = buffer.readUInt8(0) - 31
    const data = buffer.slice(1)
    return new Signature(data, recovery)
  }

  public static fromString(string: string) {
    return Signature.fromBuffer(Buffer.from(string, 'hex'))
  }

  /**
   * Recovers the public key that produced this signature.
   *
   * @param message - 32-byte digest that was originally signed.
   * @param prefix - Optional network prefix for the recovered key.
   * @returns The recovered public key.
   *
   * @example
   * ```ts
   * const recovered = signature.recover(digest, 'STM')
   * console.log(recovered.toString())
   * ```
   */
  public recover(message: Buffer, prefix?: string) {
    const sig = new nobleSecp256k1.Signature(BigInt('0x' + this.data.slice(0,32).toString('hex')), BigInt('0x' + this.data.slice(32).toString('hex'))).addRecoveryBit(this.recovery)
    const pubKey = sig.recoverPublicKey(message).toBytes(true)
    return new PublicKey(Buffer.from(pubKey), prefix)
  }

  public toBuffer() {
    const buffer = Buffer.alloc(65)
    buffer.writeUInt8(this.recovery + 31, 0)
    this.data.copy(buffer, 1)
    return buffer
  }

  public toString() {
    return this.toBuffer().toString('hex')
  }
}
/**
 * Return the sha256 transaction digest.
 * @param chainId The chain id to use when creating the hash.
 */
function transactionDigest(
  transaction: Transaction | SignedTransaction,
  chainId: Buffer = DEFAULT_CHAIN_ID
) {
  const writer = new BinaryWriter()
  try {
    Types.Transaction(writer, transaction)
  } catch (cause: any) {
    throw new SerializationError('Unable to serialize transaction', cause)
  }
  const transactionData = writer.getBuffer()
  const digest = sha256(Buffer.concat([chainId, transactionData]))
  return digest
}

/**
 * Returns a copy of a transaction with one or more signatures appended.
 *
 * @param transaction - Transaction to sign.
 * @param keys - Private key or keys to sign the transaction digest.
 * @param chainId - Chain id to include in the transaction digest.
 * @returns A signed transaction copy.
 *
 * @throws SerializationError
 * Thrown when the transaction cannot be serialized before hashing.
 *
 * @example
 * ```ts
 * const signed = cryptoUtils.signTransaction(transaction, activeKey, client.chainId)
 * ```
 */
function signTransaction(
  transaction: Transaction,
  keys: PrivateKey | PrivateKey[],
  chainId: Buffer = DEFAULT_CHAIN_ID
) {
  const digest = transactionDigest(transaction, chainId)
  const signedTransaction = copy(transaction) as SignedTransaction
  if (!signedTransaction.signatures) {
    signedTransaction.signatures = []
  }

  if (!Array.isArray(keys)) {
    keys = [keys]
  }
  for (const key of keys) {
    const signature = key.sign(digest)
    signedTransaction.signatures.push(signature.toString())
  }

  return signedTransaction
}

function generateTrxId(transaction: Transaction) {
  const writer = new BinaryWriter()
  try {
    Types.Transaction(writer, transaction)
  } catch (cause: any) {
    throw new SerializationError('Unable to serialize transaction', cause)
  }
  const transactionData = writer.getBuffer()
  return cryptoUtils.sha256(Buffer.from(transactionData)).toString('hex').slice(0, 40)
}

/**
 * Low-level cryptographic utility namespace.
 *
 * @remarks
 * These helpers expose Hive-compatible hashing, key encoding, signature
 * canonicality, transaction digesting, and transaction id generation. Most apps
 * should prefer {@link PrivateKey}, {@link PublicKey}, {@link Signature}, and
 * `client.broadcast`, but the namespace is useful for protocol tooling and
 * educational examples in the Pollen documentation hub.
 *
 * @example
 * ```ts
 * const digest = cryptoUtils.transactionDigest(transaction, client.chainId)
 * const signature = activeKey.sign(digest)
 * ```
 */
export const cryptoUtils = {
  decodePrivate,
  doubleSha256,
  encodePrivate,
  encodePublic,
  generateTrxId,
  isCanonicalSignature,
  isWif,
  ripemd160,
  sha256,
  signTransaction,
  transactionDigest
}
