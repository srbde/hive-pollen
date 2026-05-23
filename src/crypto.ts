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
import ByteBuffer from '@ecency/bytebuffer'
import { VError } from 'verror'
import { Types } from './chain/serializer.js'
import { SignedTransaction, Transaction } from './chain/transaction.js'
import { DEFAULT_ADDRESS_PREFIX, DEFAULT_CHAIN_ID } from './client.js'
import { copy } from './utils.js'

import { base58 } from '@scure/base'
import { ripemd160 as nobleRipemd160 } from '@noble/hashes/legacy.js'
import { sha256 as nobleSha256, sha512 as nobleSha512 } from '@noble/hashes/sha2.js'
import { secp256k1 as nobleSecp256k1 } from '@noble/curves/secp256k1.js'

/**
 * Network id used in WIF-encoding.
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
  } catch (e) {
      return false
  }
}

/**
 * ECDSA (secp256k1) public key.
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

  public static fromBuffer(key: Buffer | ByteBuffer) {
    const buffer = Buffer.isBuffer(key) ? key : Buffer.from((key as any).toBuffer())
    try {
      nobleSecp256k1.Point.fromBytes(buffer)
    } catch (err) {
      assert(false, 'invalid buffer as public key')
    }
    return { key: buffer } as any
  }

  /**
   * Create a new instance from a WIF-encoded key.
   */
  public static fromString(wif: string) {
    const { key, prefix } = decodePublic(wif)
    return new PublicKey(key, prefix)
  }

  /**
   * Create a new instance.
   */
  public static from(value: string | PublicKey) {
    if (value instanceof PublicKey) {
      return value
    } else {
      return PublicKey.fromString(value)
    }
  }

  /**
   * Verify a 32-byte signature.
   * @param message 32-byte message to verify.
   * @param signature Signature to verify.
   */
  public verify(message: Buffer, signature: Signature): boolean {
    try {
      const sig = new nobleSecp256k1.Signature(BigInt('0x' + signature.data.slice(0,32).toString('hex')), BigInt('0x' + signature.data.slice(32).toString('hex')))
      return nobleSecp256k1.verify(sig.toBytes(), message, this.key, { prehash: false, lowS: true })
    } catch (e) {
      return false
    }
  }

  /**
   * Return a WIF-encoded representation of the key.
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

export type KeyRole = 'owner' | 'active' | 'posting' | 'memo'

/**
 * ECDSA (secp256k1) private key.
 */
export class PrivateKey {
  public secret: Buffer

  constructor(private key: Buffer) {
    try {
      assert(nobleSecp256k1.utils.isValidSecretKey(key), 'invalid private key')
    } catch (e) {
      assert(false, 'invalid private key')
    }
  }

  /**
   * Convenience to create a new instance from WIF string or buffer.
   */
  public static from(value: string | Buffer) {
    if (typeof value === 'string') {
      return PrivateKey.fromString(value)
    } else {
      return new PrivateKey(value)
    }
  }

  /**
   * Create a new instance from a WIF-encoded key.
   */
  public static fromString(wif: string) {
    return new PrivateKey(decodePrivate(wif).slice(1))
  }

  /**
   * Create a new instance from a seed.
   */
  public static fromSeed(seed: string) {
    return new PrivateKey(sha256(seed))
  }

  /**
   * Create key from username and password.
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
   * Sign message.
   * @param message 32-byte message.
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
   * Derive the public key for this private key.
   */
  public createPublic(prefix?: string): PublicKey {
    const pubKey = nobleSecp256k1.getPublicKey(this.key, true)
    return new PublicKey(Buffer.from(pubKey), prefix)
  }

  /**
   * Return a WIF-encoded representation of the key.
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
   * Get shared secret for memo cryptography
   */
  public get_shared_secret(public_key: PublicKey): Buffer {
    const point = nobleSecp256k1.Point.fromBytes(public_key.uncompressed)
    const P = point.multiply(BigInt('0x' + this.key.toString('hex')))
    const S = P.x.toString(16).padStart(64, '0')
    return sha512(Buffer.from(S, 'hex'))
  }
}

/**
 * ECDSA (secp256k1) signature.
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
   * Recover public key from signature by providing original signed message.
   * @param message 32-byte message that was used to create the signature.
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
  const buffer = new ByteBuffer(
    ByteBuffer.DEFAULT_CAPACITY,
    ByteBuffer.LITTLE_ENDIAN
  )
  try {
    Types.Transaction(buffer, transaction)
  } catch (cause) {
    throw new VError(
      { cause, name: 'SerializationError' },
      'Unable to serialize transaction'
    )
  }
  buffer.flip()

  const transactionData = Buffer.from(buffer.toBuffer())
  const digest = sha256(Buffer.concat([chainId, transactionData]))
  return digest
}

/**
 * Return copy of transaction with signature appended to signatures array.
 * @param transaction Transaction to sign.
 * @param keys Key(s) to sign transaction with.
 * @param options Chain id and address prefix, compatible with {@link Client}.
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
  const buffer = new ByteBuffer(
    ByteBuffer.DEFAULT_CAPACITY,
    ByteBuffer.LITTLE_ENDIAN
  )
  try {
    Types.Transaction(buffer, transaction)
  } catch (cause) {
    throw new VError(
      { cause, name: 'SerializationError' },
      'Unable to serialize transaction'
    )
  }
  buffer.flip()
  const transactionData = Buffer.from(buffer.toBuffer())
  return cryptoUtils.sha256(transactionData).toString('hex').slice(0, 40)
}

/** Misc crypto utility functions. */
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
