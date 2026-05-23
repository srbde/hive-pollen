/**
 * @file Native error classes for Pollen.
 * @license BSD-3-Clause-No-Military-License
 */

/**
 * Base error class for all Pollen-related errors.
 */
export class PollenError extends Error {
  public readonly info?: any

  constructor(message: string, info?: any) {
    super(message)
    this.name = 'PollenError'
    this.info = info
    Object.setPrototypeOf(this, PollenError.prototype)
  }
}

/**
 * Error thrown when an RPC call fails.
 */
export class RPCError extends PollenError {
  constructor(message: string, info?: any) {
    super(message, info)
    this.name = 'RPCError'
    Object.setPrototypeOf(this, RPCError.prototype)
  }
}

/**
 * Error thrown when serialization or deserialization fails.
 */
export class SerializationError extends PollenError {
  constructor(message: string, info?: any) {
    super(message, info)
    this.name = 'SerializationError'
    Object.setPrototypeOf(this, SerializationError.prototype)
  }
}
