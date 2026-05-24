import assert from 'assert'
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes
} from 'crypto'
import { PrivateKey, PublicKey } from '../crypto.js'
import { BinaryReader, BinaryWriter } from '../utils.js'
import JSBI from 'jsbi'

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
  message: Buffer,
  nonce = uniqueNonce()
): any => crypt(private_key, public_key, nonce, message)

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
  nonce: string | JSBI,
  message: any,
  checksum: number
): any => crypt(private_key, public_key, nonce, message, checksum).message

/**
 * @arg {Buffer} message - Encrypted or plain text message (see checksum)
 * @arg {number} checksum - shared secret checksum (null to encrypt, non-null to decrypt)
 */
const crypt = (
  private_key: PrivateKey,
  public_key: PublicKey,
  nonce: string | JSBI,
  message: Buffer,
  checksum?: number
): {
  nonce: JSBI
  message: Buffer
  checksum: number
} => {
  const nonceL = JSBI.BigInt(nonce.toString())
  const S = private_key.get_shared_secret(public_key)
  
  const writer = new BinaryWriter()
  writer.writeUint64(nonceL)
  writer.writeBytes(S)
  const ebuf = Buffer.from(writer.getBuffer())

  const encryption_key = createHash('sha512').update(ebuf).digest()
  const iv = encryption_key.slice(32, 48)
  const tag = encryption_key.slice(0, 32)

  // check if first 64 bit of sha256 hash treated as uint64_t truncated to 32 bits.
  const check = createHash('sha256').update(encryption_key).digest().slice(0, 4)
  const reader = new BinaryReader(new Uint8Array(check))
  const check32 = reader.readUint32()

  if (checksum) {
    if (check32 !== checksum) {
      throw new Error('Invalid key')
    }
    message = cryptoJsDecrypt(message, tag, iv)
  } else {
    message = cryptoJsEncrypt(message, tag, iv)
  }
  return { nonce: nonceL, message, checksum: check32 }
}

/**
 * Decrypts AES-256-CBC bytes without memo checksum validation.
 *
 * @param message - Ciphertext bytes.
 * @param tag - AES key bytes.
 * @param iv - Initialization vector.
 * @returns Decrypted bytes.
 *
 * @remarks
 * This is a low-level primitive. Call {@link decrypt} for Hive memo payloads so
 * the shared-secret checksum is validated before plaintext is trusted.
 *
 * @throws AssertionError
 * Thrown when `message` is missing.
 *
 * @example
 * ```ts
 * const plaintext = cryptoJsDecrypt(ciphertext, key, iv)
 * ```
 */
export const cryptoJsDecrypt = (message: Buffer, tag: Buffer, iv: Buffer): Buffer => {
  assert(message, 'Missing cipher text')
  const decipher = createDecipheriv('aes-256-cbc', tag, iv)
  return Buffer.concat([decipher.update(message), decipher.final()])
}

/**
 * Encrypts bytes with AES-256-CBC without adding a memo checksum.
 *
 * @param message - Plaintext bytes.
 * @param tag - AES key bytes.
 * @param iv - Initialization vector.
 * @returns Ciphertext bytes.
 *
 * @remarks
 * This is a low-level primitive. Call {@link encrypt} for Hive memo payloads so
 * Pollen derives the key and returns the checksum expected by the memo envelope.
 *
 * @throws AssertionError
 * Thrown when `message` is missing.
 *
 * @example
 * ```ts
 * const ciphertext = cryptoJsEncrypt(plaintext, key, iv)
 * ```
 */
export const cryptoJsEncrypt = (message: Buffer, tag: Buffer, iv: Buffer): Buffer => {
  assert(message, 'Missing plain text')
  const cipher = createCipheriv('aes-256-cbc', tag, iv)
  return Buffer.concat([cipher.update(message), cipher.final()])
}

/** @return {string} unique 64 bit unsigned number string.  Being time based,
 * this is careful to never choose the same nonce twice.  This value could
 * clsbe recorded in the blockchain for a long time.
 */
let unique_nonce_entropy: number | null = null

const uniqueNonce = (): string => {
  if (unique_nonce_entropy === null) {
    unique_nonce_entropy = randomBytes(2).readUInt16BE(0)
  }
  let long = JSBI.BigInt(Date.now())
  const entropy = ++unique_nonce_entropy % 0xffff
  long = JSBI.bitwiseOr(JSBI.leftShift(long, JSBI.BigInt(16)), JSBI.BigInt(entropy))
  return long.toString()
}
