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

import assert from "assert";
import { SerializationError } from "./errors.js";
import { Types } from "./chain/serializer.js";
import { SignedTransaction, Transaction } from "./chain/transaction.js";
import { DEFAULT_ADDRESS_PREFIX, DEFAULT_CHAIN_ID } from "./client.js";
import { copy, BinaryWriter, toHex, fromHex, concat, bytesEqual } from "./utils.js";

import { base58 } from "@scure/base";
import { ripemd160 as nobleRipemd160 } from "@noble/hashes/legacy.js";
import { sha256 as nobleSha256, sha512 as nobleSha512 } from "@noble/hashes/sha2.js";
import { secp256k1 as nobleSecp256k1 } from "@noble/curves/secp256k1.js";

/**
 * Network marker byte used by Hive WIF private keys.
 */
export const NETWORK_ID = new Uint8Array([0x80]);

/**
 * Return ripemd160 hash of input.
 */
function ripemd160(input: Uint8Array | string): Uint8Array {
  const data = typeof input === "string" ? new TextEncoder().encode(input) : input;
  return nobleRipemd160(data);
}

/**
 * Return sha256 hash of input.
 */
function sha256(input: Uint8Array | string): Uint8Array {
  const data = typeof input === "string" ? new TextEncoder().encode(input) : input;
  return nobleSha256(data);
}

/**
 * Return sha512 hash of input
 */
function sha512(input: Uint8Array | string): Uint8Array {
  const data = typeof input === "string" ? new TextEncoder().encode(input) : input;
  return nobleSha512(data);
}

/**
 * Return 2-round sha256 hash of input.
 */
function doubleSha256(input: Uint8Array | string): Uint8Array {
  return sha256(sha256(input));
}

/**
 * Encode public key with bs58+ripemd160-checksum.
 */
function encodePublic(key: Uint8Array, prefix: string): string {
  const checksum = ripemd160(key);
  return prefix + base58.encode(concat([key, checksum.slice(0, 4)]));
}

/**
 * Decode bs58+ripemd160-checksum encoded public key.
 */
function decodePublic(encodedKey: string): { key: Uint8Array; prefix: string } {
  const prefix = encodedKey.slice(0, 3);
  assert.equal(prefix.length, 3, "public key invalid prefix");
  encodedKey = encodedKey.slice(3);
  const buffer = base58.decode(encodedKey);
  const checksum = buffer.slice(-4);
  const key = buffer.slice(0, -4);
  const checksumVerify = ripemd160(key).slice(0, 4);
  assert.deepEqual(checksumVerify, checksum, "public key checksum mismatch");
  return { key, prefix };
}

/**
 * Encode bs58+doubleSha256-checksum private key.
 */
function encodePrivate(key: Uint8Array): string {
  assert.equal(key[0], 0x80, "private key network id mismatch");
  const checksum = doubleSha256(key);
  return base58.encode(concat([key, checksum.slice(0, 4)]));
}

/**
 * Decode bs58+doubleSha256-checksum encoded private key.
 */
function decodePrivate(encodedKey: string): Uint8Array {
  const buffer = base58.decode(encodedKey);
  assert.deepEqual(buffer.slice(0, 1), NETWORK_ID, "private key network id mismatch");
  const checksum = buffer.slice(-4);
  const key = buffer.slice(0, -4);
  const checksumVerify = doubleSha256(key).slice(0, 4);
  assert.deepEqual(checksumVerify, checksum, "private key checksum mismatch");
  return key;
}

/**
 * Return true if signature is canonical, otherwise false.
 */
function isCanonicalSignature(signature: Uint8Array): boolean {
  return (
    !(signature[0] & 0x80) &&
    !(signature[0] === 0 && !(signature[1] & 0x80)) &&
    !(signature[32] & 0x80) &&
    !(signature[32] === 0 && !(signature[33] & 0x80))
  );
}

/**
 * Return true if string is wif, otherwise false.
 */
function isWif(privWif: string | Uint8Array): boolean {
  try {
    const wifStr = typeof privWif === "string" ? privWif : new TextDecoder().decode(privWif);
    const bufWif = base58.decode(wifStr);
    const privKey = bufWif.slice(0, -4);
    const checksum = bufWif.slice(-4);
    let newChecksum = sha256(privKey);
    newChecksum = sha256(newChecksum);
    newChecksum = newChecksum.slice(0, 4);
    return bytesEqual(checksum, newChecksum);
  } catch (e: any) {
    return false;
  }
}

/**
 * Hive public key backed by the secp256k1 elliptic curve.
 */
export class PublicKey {
  public readonly uncompressed: Uint8Array;

  constructor(
    public readonly key: Uint8Array,
    public readonly prefix = DEFAULT_ADDRESS_PREFIX,
  ) {
    try {
      // Validate key and store uncompressed version
      const k = new Uint8Array(key);
      const point = (nobleSecp256k1 as any).Point.fromHex(toHex(k));
      this.uncompressed = point.toBytes(false);
    } catch (err: any) {
      throw new Error(`invalid public key: ${err.message}`);
    }
  }

  public static fromBuffer(key: Uint8Array) {
    return new PublicKey(key);
  }

  /**
   * Creates a public key from its Hive string representation.
   */
  public static fromString(wif: string) {
    const { key, prefix } = decodePublic(wif);
    return new PublicKey(key, prefix);
  }

  /**
   * Normalizes a public-key input into a {@link PublicKey} instance.
   */
  public static from(value: string | PublicKey) {
    if (value instanceof PublicKey) {
      return value;
    } else {
      return PublicKey.fromString(value);
    }
  }

  /**
   * Verifies a compact ECDSA signature against a 32-byte digest.
   */
  public verify(message: Uint8Array, signature: Signature): boolean {
    try {
      // In noble v2, verify accepts compact signature bytes directly
      return nobleSecp256k1.verify(signature.data, message, this.key, {
        prehash: false,
        lowS: true,
      });
    } catch (e: any) {
      return false;
    }
  }

  /**
   * Renders the key as a Hive public-key string.
   */
  public toString() {
    return encodePublic(this.key, this.prefix);
  }

  /**
   * Return JSON representation of this key, same as toString().
   */
  public toJSON() {
    return this.toString();
  }

  /**
   * Used by `utils.inspect` and `console.log` in node.js.
   */
  public inspect() {
    return `PublicKey: ${this.toString()}`;
  }
}

/**
 * Hive authority role used for password-derived account keys.
 */
export type KeyRole = "owner" | "active" | "posting" | "memo";

/**
 * Hive private key backed by the secp256k1 elliptic curve.
 */
export class PrivateKey {
  constructor(private key: Uint8Array) {
    try {
      assert(nobleSecp256k1.utils.isValidSecretKey(key), "invalid private key");
    } catch (e: any) {
      assert(false, "invalid private key");
    }
  }

  /**
   * Normalizes a WIF string or raw 32-byte secret into a private key.
   *
   * @remarks
   * Raw secrets are accepted as `Uint8Array` values so Pollen's key path stays
   * independent of Node `Buffer` while still working in browser builds.
   */
  public static from(value: string | Uint8Array) {
    if (typeof value === "string") {
      return PrivateKey.fromString(value);
    } else {
      return new PrivateKey(value);
    }
  }

  /**
   * Parses a WIF-encoded Hive private key.
   */
  public static fromString(wif: string) {
    return new PrivateKey(decodePrivate(wif).slice(1));
  }

  /**
   * Derives a private key by hashing an arbitrary seed string.
   */
  public static fromSeed(seed: string) {
    return new PrivateKey(sha256(seed));
  }

  /**
   * Derives a Hive role key from an account name and master password.
   */
  public static fromLogin(username: string, password: string, role: KeyRole = "active") {
    const seed = username + role + password;
    return PrivateKey.fromSeed(seed);
  }

  /**
   * Signs a 32-byte digest with this private key.
   */
  public sign(message: Uint8Array): Signature {
    let attempts = 0;
    let sigRaw: Uint8Array;
    do {
      attempts++;
      const extra = sha256(concat([message, new Uint8Array([attempts])]));
      // Use format: 'recovered' to get 65 bytes [recovery, r, s]
      sigRaw = nobleSecp256k1.sign(message, this.key, {
        extraEntropy: extra,
        prehash: false,
        lowS: true,
        format: "recovered",
      });
    } while (!isCanonicalSignature(sigRaw.slice(1)));

    // Hive expects recovery 0-3 internally (stored as 31-34 in signature buffer)
    return new Signature(sigRaw.slice(1), sigRaw[0]);
  }

  /**
   * Derives the compressed public key for this private key.
   */
  public createPublic(prefix?: string): PublicKey {
    const pubKey = nobleSecp256k1.getPublicKey(this.key, true);
    return new PublicKey(pubKey, prefix);
  }

  /**
   * Renders the private key as a WIF string.
   */
  public toString() {
    return encodePrivate(concat([NETWORK_ID, this.key]));
  }

  /**
   * Used by `utils.inspect` and `console.log` in node.js.
   */
  public inspect() {
    const key = this.toString();
    return `PrivateKey: ${key.slice(0, 6)}...${key.slice(-6)}`;
  }

  /**
   * Derives the shared secret used by encrypted Hive memos.
   */
  public get_shared_secret(public_key: PublicKey): Uint8Array {
    const S = nobleSecp256k1.getSharedSecret(this.key, public_key.key, false);
    // Hive uses the X coordinate (32 bytes after the 0x04 prefix)
    return sha512(S.slice(1, 33));
  }
}

/**
 * Compact recoverable secp256k1 signature.
 */
export class Signature {
  constructor(
    public data: Uint8Array,
    public recovery: number,
  ) {
    assert.equal(data.length, 64, "invalid signature");
  }

  public static fromBuffer(buffer: Uint8Array) {
    assert.equal(buffer.length, 65, "invalid signature");
    // Hive uses 27-30 or 31-34. Noble wants 0-3.
    let recovery = buffer[0];
    if (recovery >= 31) recovery -= 31;
    else if (recovery >= 27) recovery -= 27;

    const data = buffer.slice(1);
    return new Signature(data, recovery);
  }

  public static fromString(string: string) {
    return Signature.fromBuffer(fromHex(string));
  }

  /**
   * Recovers the public key that produced this signature.
   */
  public recover(message: Uint8Array, prefix?: string) {
    // In noble v2, recoverPublicKey expects (signature65, messageHash, { prehash: false })
    // signature65 format is [recovery, r, s]
    const sigRaw = concat([new Uint8Array([this.recovery % 4]), this.data]);
    const pubKeyBytes = nobleSecp256k1.recoverPublicKey(sigRaw, message, { prehash: false });
    return new PublicKey(pubKeyBytes, prefix);
  }

  public toBuffer() {
    const buffer = new Uint8Array(65);
    // Hive convention: recovery + 31
    buffer[0] = this.recovery + 31;
    buffer.set(this.data, 1);
    return buffer;
  }

  public toString() {
    return toHex(this.toBuffer());
  }
}

/**
 * Return the sha256 transaction digest.
 */
function transactionDigest(
  transaction: Transaction | SignedTransaction,
  chainId: Uint8Array = DEFAULT_CHAIN_ID,
) {
  const writer = new BinaryWriter();
  try {
    Types.Transaction(writer, transaction);
  } catch (cause: any) {
    throw new SerializationError("Unable to serialize transaction", cause);
  }
  const transactionData = writer.getBuffer();
  const digest = sha256(concat([chainId, transactionData]));
  return digest;
}

/**
 * Returns a copy of a transaction with one or more signatures appended.
 */
function signTransaction(
  transaction: Transaction,
  keys: PrivateKey | PrivateKey[],
  chainId: Uint8Array = DEFAULT_CHAIN_ID,
) {
  const digest = transactionDigest(transaction, chainId);
  const signedTransaction = copy(transaction) as SignedTransaction;
  if (!signedTransaction.signatures) {
    signedTransaction.signatures = [];
  }

  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  for (const key of keys) {
    const signature = key.sign(digest);
    signedTransaction.signatures.push(signature.toString());
  }

  return signedTransaction;
}

function generateTrxId(transaction: Transaction) {
  const writer = new BinaryWriter();
  try {
    Types.Transaction(writer, transaction);
  } catch (cause: any) {
    throw new SerializationError("Unable to serialize transaction", cause);
  }
  const transactionData = writer.getBuffer();
  return toHex(sha256(transactionData)).slice(0, 40);
}

/**
 * Low-level cryptographic utility namespace.
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
  transactionDigest,
};
