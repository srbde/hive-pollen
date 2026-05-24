import { BinaryReader } from '../utils.js'
import { PublicKey } from '../crypto.js'

/**
 * Function signature for reading one Hive protocol value from a binary reader.
 *
 * @param reader - Source binary reader.
 * @returns The decoded protocol value.
 *
 * @remarks
 * Deserializers mirror the serializer registry for the limited binary payloads
 * Pollen needs to decode, currently focused on encrypted memo envelopes.
 *
 * @example
 * ```ts
 * const memo = types.EncryptedMemoD(buffer)
 * console.log(memo.from.toString())
 * ```
 */
export type Deserializer = (reader: BinaryReader) => any

const PublicKeyDeserializer = (reader: BinaryReader) => {
  const bytes = reader.readBytes(33)
  return PublicKey.fromBuffer(Buffer.from(bytes))
}

const UInt64Deserializer = (reader: BinaryReader) => reader.readUint64()

const UInt32Deserializer = (reader: BinaryReader) => reader.readUint32()

const BinaryDeserializer = (reader: BinaryReader) => {
  return Buffer.from(reader.readBytes(reader.readVarint32()))
}

const BufferDeserializer = (keyDeserializers: [string, Deserializer][]) => (
  buffer: Uint8Array | Buffer
) => {
  const reader = new BinaryReader(buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer))
  const obj: any = {}
  for (const [key, deserializer] of keyDeserializers) {
    try {
      obj[key] = deserializer(reader)
    } catch (error: any) {
      error.message = `${key}: ${error.message}`
      throw error
    }
  }
  return obj
}

const EncryptedMemoDeserializer: any = BufferDeserializer([
  ['from', PublicKeyDeserializer],
  ['to', PublicKeyDeserializer],
  ['nonce', UInt64Deserializer],
  ['check', UInt32Deserializer],
  ['encrypted', BinaryDeserializer]
])

/**
 * Hive protocol deserializer registry.
 *
 * @remarks
 * The exported registry intentionally stays small. Pollen primarily receives
 * JSON from RPC nodes, but encrypted memos arrive as binary payloads nested
 * inside base58 strings and need a dedicated decoder.
 *
 * @example
 * ```ts
 * const decoded = types.EncryptedMemoD(Buffer.from(bytes))
 * console.log(decoded.nonce.toString())
 * ```
 */
export const types = {
  EncryptedMemoD: EncryptedMemoDeserializer
}
