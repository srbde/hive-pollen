import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { PrivateKey, PublicKey } from "../crypto.js";
import { BinaryReader, BinaryWriter, concat } from "../utils.js";
import { sha256 as nobleSha256, sha512 as nobleSha512 } from "@noble/hashes/sha2.js";

/**
 * Encrypts a binary memo payload with Hive memo key agreement.
 *
 * @param private_key - Sender memo private key.
 * @param public_key - Recipient memo public key.
 * @param message - Serialized plaintext memo bytes.
 * @param nonce - Optional nonce string for deterministic tests.
 * @returns Nonce, ciphertext, and checksum for an encrypted memo envelope.
 *
 * @remarks
 * The AES key is derived from the secp256k1 shared secret and nonce, matching
 * Hive's encrypted memo convention. Application code should normally use
 * `Memo.encode`, which handles string framing and base58 packaging.
 *
 * @example
 * ```ts
 * const encrypted = encrypt(senderMemoKey, recipientMemoPublicKey, memoBytes)
 * ```
 */
export const encrypt = (
  private_key: PrivateKey,
  public_key: PublicKey,
  message: Uint8Array,
  nonce: string | bigint = uniqueNonce(),
): { nonce: bigint; message: Uint8Array; checksum: number } =>
  crypt(private_key, public_key, nonce, message);

/**
 * Decrypts a binary memo payload with Hive memo key agreement.
 *
 * @param private_key - Recipient or sender memo private key.
 * @param public_key - Counterparty memo public key.
 * @param nonce - Memo nonce from the encrypted envelope.
 * @param message - Ciphertext bytes.
 * @param checksum - Shared-secret checksum from the encrypted envelope.
 * @returns Decrypted memo bytes.
 *
 * @throws Error
 * Thrown when the checksum does not match the derived shared secret.
 *
 * @example
 * ```ts
 * const plaintext = decrypt(memoKey, otherMemoPublicKey, nonce, encrypted, check)
 * ```
 */
export const decrypt = (
  private_key: PrivateKey,
  public_key: PublicKey,
  nonce: string | bigint,
  message: Uint8Array,
  checksum: number,
): Uint8Array => crypt(private_key, public_key, nonce, message, checksum).message;

/**
 * Encrypts or decrypts memo bytes using Hive's shared-secret derivation.
 *
 * @param private_key - Local memo private key.
 * @param public_key - Counterparty memo public key.
 * @param nonce - Memo nonce as a decimal string or native `bigint`.
 * @param message - Plaintext bytes when encrypting, ciphertext bytes when
 * decrypting.
 * @param checksum - Shared-secret checksum when decrypting. Omit when
 * encrypting.
 * @returns Normalized nonce, transformed bytes, and checksum.
 *
 * @remarks
 * The nonce is written with `BinaryWriter.writeUint64`, so native `bigint`
 * values travel through the same little-endian byte engine used by transaction
 * serialization. The AES key material is derived with Noble SHA-512 rather than
 * Node-specific hash wrappers.
 *
 * @throws Error
 * Thrown when a supplied checksum does not match the derived shared secret.
 */
const crypt = (
  private_key: PrivateKey,
  public_key: PublicKey,
  nonce: string | bigint,
  message: Uint8Array,
  checksum?: number,
): {
  nonce: bigint;
  message: Uint8Array;
  checksum: number;
} => {
  const nonceL = BigInt(nonce.toString());
  const S = private_key.get_shared_secret(public_key);

  const writer = new BinaryWriter();
  writer.writeUint64(nonceL);
  writer.writeBytes(S);
  const ebuf = writer.getBuffer();

  const encryption_key = nobleSha512(ebuf);
  const iv = encryption_key.slice(32, 48);
  const tag = encryption_key.slice(0, 32);

  // check if first 64 bit of sha256 hash treated as uint64_t truncated to 32 bits.
  const check = nobleSha256(encryption_key).slice(0, 4);
  const reader = new BinaryReader(check);
  const check32 = reader.readUint32();

  let result: Uint8Array;
  if (checksum) {
    if (check32 !== checksum) {
      throw new Error("Invalid key");
    }
    result = cryptoJsDecrypt(message, tag, iv);
  } else {
    result = cryptoJsEncrypt(message, tag, iv);
  }
  return {
    checksum: check32,
    message: result,
    nonce: nonceL,
  };
};

/**
 * Encrypts raw bytes with AES-256-CBC.
 *
 * @param message - Plaintext bytes.
 * @param key - 32-byte AES key.
 * @param iv - 16-byte initialization vector.
 * @returns Ciphertext bytes.
 */
const cryptoJsEncrypt = (message: Uint8Array, key: Uint8Array, iv: Uint8Array): Uint8Array => {
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  return concat([cipher.update(message), cipher.final()]);
};

/**
 * Decrypts raw bytes with AES-256-CBC.
 *
 * @param message - Ciphertext bytes.
 * @param key - 32-byte AES key.
 * @param iv - 16-byte initialization vector.
 * @returns Plaintext bytes.
 */
const cryptoJsDecrypt = (message: Uint8Array, key: Uint8Array, iv: Uint8Array): Uint8Array => {
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  return concat([decipher.update(message), decipher.final()]);
};

/**
 * Generates a unique 64-bit memo nonce.
 *
 * @returns A native `bigint` nonce.
 *
 * @remarks
 * The high bits come from current time and the low bits from cryptographic
 * entropy, producing the unsigned 64-bit value expected by Hive memo envelopes.
 */
const uniqueNonce = () => {
  const entropy = randomBytes(2);
  let long = BigInt(Date.now());
  long = (long << 16n) | BigInt((entropy[0] << 8) | entropy[1]);
  return long;
};
