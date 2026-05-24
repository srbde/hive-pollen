import assert from 'assert'
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes
} from 'crypto'
import { PrivateKey, PublicKey } from '../crypto.js'
import { BinaryReader, BinaryWriter } from '../utils.js'

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
  nonce: string | bigint = uniqueNonce()
): { nonce: bigint; message: Buffer; checksum: number } => 
  crypt(private_key, public_key, nonce, message)

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
  message: Buffer,
  checksum: number
): Buffer => crypt(private_key, public_key, nonce, message, checksum).message

/**
 * @arg {Buffer} message - Encrypted or plain text message (see checksum)
 * @arg {number} checksum - shared secret checksum (null to encrypt, non-null to decrypt)
 */
const crypt = (
  private_key: PrivateKey,
  public_key: PublicKey,
  nonce: string | bigint,
  message: Buffer,
  checksum?: number
): {
  nonce: bigint
  message: Buffer
  checksum: number
} => {
  const nonceL = BigInt(nonce.toString())
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
  return {
    checksum: check32,
    message,
    nonce: nonceL
  }
}

/**
 * Encrypt a message using AES-256-CBC.
 */
const cryptoJsEncrypt = (message: Buffer, key: Buffer, iv: Buffer): Buffer => {
  const cipher = createCipheriv('aes-256-cbc', key, iv)
  return Buffer.concat([cipher.update(message), cipher.final()])
}

/**
 * Decrypt a message using AES-256-CBC.
 */
const cryptoJsDecrypt = (message: Buffer, key: Buffer, iv: Buffer): Buffer => {
  const decipher = createDecipheriv('aes-256-cbc', key, iv)
  return Buffer.concat([decipher.update(message), decipher.final()])
}

/**
 * Node code to generate a unique 64-bit nonce.
 */
const uniqueNonce = () => {
  const entropy = randomBytes(2)
  let long = BigInt(Date.now())
  long = (long << 16n) | BigInt(entropy.readUInt16BE(0))
  return long
}
