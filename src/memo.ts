import { base58 as bs58 } from "@scure/base";
import { types } from "./chain/deserializer.js";
import { Types } from "./chain/serializer.js";
import { PrivateKey, PublicKey } from "./crypto.js";
import * as Aes from "./helpers/aes.js";
import { BinaryReader, BinaryWriter } from "./utils.js";

/**
 * Encodes a Hive memo, encrypting messages that begin with `#`.
 *
 * @param private_key - Sender memo private key, either as a {@link PrivateKey}
 * instance or WIF string.
 * @param public_key - Recipient memo public key, either as a {@link PublicKey}
 * instance or Hive public-key string.
 * @param memo - Plain memo text. Only values beginning with `#` are encrypted;
 * unprefixed memos are returned unchanged.
 * @param testNonce - Optional deterministic nonce used by tests.
 * @returns The original plaintext memo or a `#`-prefixed encrypted memo payload.
 *
 * @remarks
 * Pollen serializes the memo with its binary writer before AES-CBC encryption so
 * Unicode text and Hive's encrypted memo structure round-trip consistently.
 *
 * @throws Error
 * Thrown when the runtime cannot support memo encryption or key conversion
 * fails.
 *
 * @example
 * ```ts
 * const encrypted = Memo.encode(senderMemoKey, recipientMemoPublicKey, '#hello nectar')
 * ```
 */
const encode = (
  private_key: PrivateKey | string,
  public_key: PublicKey | string,
  memo: string,
  testNonce?: string,
): string => {
  if (!memo.startsWith("#")) {
    return memo;
  }
  memo = memo.substring(1);
  checkEncryption();
  private_key = toPrivateObj(private_key);
  public_key = toPublicObj(public_key);

  const writer = new BinaryWriter();
  writer.writeString(memo);
  const memoBuffer = writer.getBuffer();

  const { nonce, message, checksum } = Aes.encrypt(private_key, public_key, memoBuffer, testNonce);

  const writer2 = new BinaryWriter();
  Types.EncryptedMemo(writer2, {
    check: checksum,
    encrypted: message,
    from: private_key.createPublic(),
    nonce,
    to: public_key,
  });
  const data = writer2.getBuffer();
  return "#" + bs58.encode(data);
};

/**
 * Decodes a Hive memo, decrypting messages that begin with `#`.
 *
 * @param private_key - Recipient or sender memo private key, either as a
 * {@link PrivateKey} instance or WIF string.
 * @param memo - Memo text or encrypted memo payload.
 * @returns The original memo text. Encrypted memos remain `#`-prefixed after
 * decryption to preserve Hive memo semantics.
 *
 * @remarks
 * The decryptor determines the counterparty public key from the encrypted memo
 * envelope, derives the AES key through the memo shared secret, and supports
 * legacy payloads that were not length-prefixed.
 *
 * @throws Error
 * Thrown when the runtime cannot support memo encryption, the key is invalid,
 * or AES checksum validation fails.
 *
 * @example
 * ```ts
 * const plaintext = Memo.decode(recipientMemoKey, encryptedMemo)
 * console.log(plaintext)
 * ```
 */
const decode = (private_key: PrivateKey | string, memo: string): string => {
  if (!memo.startsWith("#")) {
    return memo;
  }
  memo = memo.substring(1);
  checkEncryption();
  private_key = toPrivateObj(private_key);
  const decodedMemo = bs58.decode(memo);
  const memoBuffer: any = types.EncryptedMemoD(new BinaryReader(decodedMemo));
  const { from, to, nonce, check, encrypted } = memoBuffer;
  const pubkey = private_key.createPublic().toString();
  const otherpub =
    pubkey === new PublicKey(from.key).toString() ? new PublicKey(to.key) : new PublicKey(from.key);

  const decrypted = Aes.decrypt(private_key, otherpub, nonce, encrypted, check);
  const reader = new BinaryReader(decrypted);
  try {
    return "#" + reader.readString();
  } catch (e: any) {
    // Sender did not length-prefix the memo
    return "#" + new TextDecoder().decode(decrypted);
  }
};

let encodeTest: boolean | undefined;
const checkEncryption: any = () => {
  if (encodeTest === undefined) {
    let plaintext: string | undefined;
    encodeTest = true; // prevent infinate looping
    try {
      const wif = "5JdeC9P7Pbd1uGdFVEsJ41EkEnADbbHGq6p1BwFxm6txNBsQnsw";
      const pubkey = "STM8m5UgaFAAYQRuaNejYdS8FVLVp9Ss3K1qAVk5de6F8s3HnVbvA";
      const cyphertext = encode(wif, pubkey, "#memo爱");
      plaintext = decode(wif, cyphertext);
    } catch (e: any) {
      throw new Error(e.message || String(e));
    } finally {
      encodeTest = plaintext === "#memo爱";
    }
  }
  if (encodeTest === false) {
    throw new Error("This environment does not support encryption.");
  }
};

const toPrivateObj = (o: any): PrivateKey =>
  o ? (o.key ? o : PrivateKey.fromString(o)) : o; /* null or undefined*/
const toPublicObj = (o: any): PublicKey =>
  o ? (o.key ? o : PublicKey.fromString(o)) : o; /* null or undefined*/

/**
 * Hive encrypted memo helper.
 *
 * @remarks
 * `Memo` exposes the two operations most applications need: encode before
 * broadcasting a transfer memo and decode after reading a transfer memo from
 * account history. The helper follows Hive's convention that only memos
 * beginning with `#` are encrypted.
 *
 * @example
 * ```ts
 * import { Memo } from '@srbde/pollen'
 *
 * const encrypted = Memo.encode(senderMemoKey, recipientMemoPublicKey, '#for your eyes')
 * const plaintext = Memo.decode(recipientMemoKey, encrypted)
 * ```
 */
export const Memo = {
  decode,
  encode,
};
