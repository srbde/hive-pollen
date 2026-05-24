/**
 * @file Native error classes for Pollen.
 * @license BSD-3-Clause-No-Military-License
 */

/**
 * Base error class for all Pollen-specific failures.
 *
 * @remarks
 * Pollen error classes preserve the original contextual payload on `info` so
 * applications can log RPC details, serialization causes, or protocol metadata
 * without parsing the message string.
 *
 * @example
 * ```ts
 * try {
 *   await client.database.getAccounts(['srbde'])
 * } catch (error) {
 *   if (error instanceof PollenError) {
 *     console.error(error.name, error.info)
 *   }
 * }
 * ```
 */
export class PollenError extends Error {
  public readonly info?: any;

  /**
   * Creates a Pollen error with optional structured context.
   *
   * @param message - Human-readable error message.
   * @param info - Optional structured details from the failing subsystem.
   */
  constructor(message: string, info?: any) {
    super(message);
    this.name = "PollenError";
    this.info = info;
    Object.setPrototypeOf(this, PollenError.prototype);
  }
}

/**
 * Error thrown when a Hive RPC node returns a JSON-RPC error.
 *
 * @remarks
 * The `info` property contains the original RPC error data when the node
 * provides it, including assertion stacks from `hived` or plugin-specific
 * details. Catch this around read and broadcast calls when user-facing recovery
 * should distinguish network/API failures from local validation.
 *
 * @example
 * ```ts
 * try {
 *   await client.broadcast.transfer(transfer, activeKey)
 * } catch (error) {
 *   if (error instanceof RPCError) {
 *     console.error('Hive rejected the transaction', error.info)
 *   }
 * }
 * ```
 */
export class RPCError extends PollenError {
  /**
   * Creates an RPC error.
   *
   * @param message - Formatted RPC error message.
   * @param info - Raw RPC error data, when provided by the node.
   */
  constructor(message: string, info?: any) {
    super(message, info);
    this.name = "RPCError";
    Object.setPrototypeOf(this, RPCError.prototype);
  }
}

/**
 * Error thrown when Hive binary serialization or deserialization fails.
 *
 * @remarks
 * Transaction signing, transaction id generation, and memo handling all depend
 * on exact Hive wire encoding. This error indicates that a payload could not be
 * represented in the expected binary format.
 *
 * @example
 * ```ts
 * try {
 *   const signed = cryptoUtils.signTransaction(transaction, activeKey)
 * } catch (error) {
 *   if (error instanceof SerializationError) {
 *     console.error('Invalid transaction shape', error.info)
 *   }
 * }
 * ```
 */
export class SerializationError extends PollenError {
  /**
   * Creates a serialization error.
   *
   * @param message - Human-readable serialization failure.
   * @param info - Optional underlying cause or field-level context.
   */
  constructor(message: string, info?: any) {
    super(message, info);
    this.name = "SerializationError";
    Object.setPrototypeOf(this, SerializationError.prototype);
  }
}
