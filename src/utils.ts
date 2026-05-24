/**
 * @file Misc utility functions.
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

import fetch from 'cross-fetch'
import { EventEmitter } from 'events'
import { PassThrough } from 'stream'
import { NodeHealthTracker } from './health-tracker.js'

// Errors that indicate the request never reached the server — safe to retry even for broadcasts
const PRE_CONNECTION_ERRORS = ['ECONNREFUSED', 'ENOTFOUND', 'EHOSTUNREACH', 'EAI_AGAIN']

// All errors that should trigger failover for read operations
const FAILOVER_ERRORS = [...PRE_CONNECTION_ERRORS, 'timeout', 'database lock', 'CERT_HAS_EXPIRED', 'ECONNRESET', 'ERR_TLS_CERT_ALTNAME_INVALID', 'ETIMEDOUT', 'EPIPE', 'EPROTO']

/**
 * Context for smart retry and failover decisions.
 *
 * @remarks
 * The client passes this metadata into {@link retryingFetch} so the transport
 * can distinguish read calls from broadcasts and record node health at the
 * correct API granularity.
 *
 * @example
 * ```ts
 * const retryContext: RetryContext = {
 *   healthTracker: client.healthTracker,
 *   api: 'condenser_api',
 *   isBroadcast: false
 * }
 * ```
 */
export interface RetryContext {
  /** Health tracker instance for per-node, per-API tracking */
  healthTracker?: NodeHealthTracker
  /** The API being called (e.g. "bridge", "condenser_api", "database_api") */
  api?: string
  /** Whether this is a broadcast operation — never retry after request may have been received */
  isBroadcast?: boolean
  /** Whether to log failover events to console */
  consoleOnFailover?: boolean
}

/**
 * Growable little-endian byte writer used by Hive serializers.
 *
 * @remarks
 * Pollen uses this native `Uint8Array` writer instead of external byte-buffer
 * libraries so Node and browser builds share the same serialization engine.
 * Integer methods match Hive's wire format, and variable-length strings are
 * encoded with a varint length prefix followed by UTF-8 bytes.
 *
 * @example
 * ```ts
 * const writer = new BinaryWriter()
 * writer.writeString('pollen')
 * writer.writeUint16(42)
 *
 * const bytes = writer.getBuffer()
 * ```
 */
export class BinaryWriter {
  private buffer: Uint8Array
  private cursor = 0

  constructor(size = 1024) {
    this.buffer = new Uint8Array(size)
  }

  private ensureCapacity(size: number) {
    if (this.cursor + size > this.buffer.length) {
      const newBuffer = new Uint8Array(this.buffer.length * 2 + size)
      newBuffer.set(this.buffer)
      this.buffer = newBuffer
    }
  }

  public writeInt8(value: number) {
    this.ensureCapacity(1)
    new DataView(this.buffer.buffer).setInt8(this.cursor++, value)
  }

  public writeUint8(value: number) {
    this.ensureCapacity(1)
    this.buffer[this.cursor++] = value
  }

  public writeInt16(value: number) {
    this.ensureCapacity(2)
    new DataView(this.buffer.buffer).setInt16(this.cursor, value, true)
    this.cursor += 2
  }

  public writeUint16(value: number) {
    this.ensureCapacity(2)
    new DataView(this.buffer.buffer).setUint16(this.cursor, value, true)
    this.cursor += 2
  }

  public writeInt32(value: number) {
    this.ensureCapacity(4)
    new DataView(this.buffer.buffer).setInt32(this.cursor, value, true)
    this.cursor += 4
  }

  public writeUint32(value: number) {
    this.ensureCapacity(4)
    new DataView(this.buffer.buffer).setUint32(this.cursor, value, true)
    this.cursor += 4
  }

  public writeInt64(value: number | string | JSBI) {
    this.ensureCapacity(8)
    const val = JSBI.BigInt(value.toString())
    const low = JSBI.toNumber(JSBI.bitwiseAnd(val, JSBI.BigInt(0xffffffff)))
    const high = JSBI.toNumber(JSBI.signedRightShift(val, JSBI.BigInt(32)))
    new DataView(this.buffer.buffer).setUint32(this.cursor, low, true)
    new DataView(this.buffer.buffer).setUint32(this.cursor + 4, high, true)
    this.cursor += 8
  }

  public writeUint64(value: number | string | JSBI) {
    this.ensureCapacity(8)
    const val = JSBI.BigInt(value.toString())
    const low = JSBI.toNumber(JSBI.bitwiseAnd(val, JSBI.BigInt(0xffffffff)))
    const high = JSBI.toNumber(JSBI.signedRightShift(val, JSBI.BigInt(32)))
    new DataView(this.buffer.buffer).setUint32(this.cursor, low, true)
    new DataView(this.buffer.buffer).setUint32(this.cursor + 4, high, true)
    this.cursor += 8
  }

  public writeVarint32(value: number) {
    while (value >= 0x80) {
      this.writeUint8((value & 0x7f) | 0x80)
      value >>>= 7
    }
    this.writeUint8(value)
  }

  public writeString(value: string) {
    const bytes = new TextEncoder().encode(value)
    this.writeVarint32(bytes.length)
    this.writeBytes(bytes)
  }

  public writeBytes(bytes: Uint8Array | Buffer) {
    this.ensureCapacity(bytes.length)
    this.buffer.set(bytes, this.cursor)
    this.cursor += bytes.length
  }

  public getBuffer(): Uint8Array {
    return this.buffer.slice(0, this.cursor)
  }
}

/**
 * Little-endian byte reader used by Hive deserializers and memo decoding.
 *
 * @remarks
 * The reader mirrors {@link BinaryWriter} and advances an internal cursor as
 * values are consumed. It is intentionally small and browser-safe.
 *
 * @example
 * ```ts
 * const reader = new BinaryReader(bytes)
 * const memo = reader.readString()
 * ```
 */
export class BinaryReader {
  private view: DataView
  private cursor = 0

  constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
  }

  public readInt8(): number {
    return this.view.getInt8(this.cursor++)
  }

  public readUint8(): number {
    return this.view.getUint8(this.cursor++)
  }

  public readInt16(): number {
    const val = this.view.getInt16(this.cursor, true)
    this.cursor += 2
    return val
  }

  public readUint16(): number {
    const val = this.view.getUint16(this.cursor, true)
    this.cursor += 2
    return val
  }

  public readInt32(): number {
    const val = this.view.getInt32(this.cursor, true)
    this.cursor += 4
    return val
  }

  public readUint32(): number {
    const val = this.view.getUint32(this.cursor, true)
    this.cursor += 4
    return val
  }

  public readInt64(): JSBI {
    const low = this.view.getUint32(this.cursor, true)
    const high = this.view.getUint32(this.cursor + 4, true)
    this.cursor += 8
    return JSBI.add(
      JSBI.BigInt(low),
      JSBI.leftShift(JSBI.BigInt(high), JSBI.BigInt(32))
    )
  }

  public readUint64(): JSBI {
    return this.readInt64()
  }

  public readVarint32(): number {
    let value = 0
    let shift = 0
    let b: number
    do {
      b = this.readUint8()
      value |= (b & 0x7f) << shift
      shift += 7
    } while (b & 0x80)
    return value
  }

  public readString(): string {
    const length = this.readVarint32()
    const bytes = this.buffer.slice(this.cursor, this.cursor + length)
    this.cursor += length
    return new TextDecoder().decode(bytes)
  }

  public readBytes(length: number): Uint8Array {
    const bytes = this.buffer.slice(this.cursor, this.cursor + length)
    this.cursor += length
    return bytes
  }

  public skip(length: number) {
    this.cursor += length
  }
}

/**
 * Resolves the next time an event emitter emits a specific event.
 *
 * @param emitter - Event emitter or stream to observe.
 * @param eventName - Event name or symbol to wait for.
 * @returns A promise for the first emitted event payload.
 *
 * @example
 * ```ts
 * await waitForEvent(stream, 'drain')
 * ```
 */
export function waitForEvent<T>(
  emitter: EventEmitter,
  eventName: string | symbol
): Promise<T> {
  return new Promise((resolve, reject) => {
    emitter.once(eventName, resolve)
  })
}

/**
 * Pauses execution for a fixed number of milliseconds.
 *
 * @param ms - Delay duration.
 * @returns A promise that resolves after the timeout.
 *
 * @example
 * ```ts
 * await sleep(3000)
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * Converts an async iterator into an object-mode readable stream.
 *
 * @param iterator - Async iterator whose values should be emitted.
 * @returns A Node readable stream that respects backpressure.
 *
 * @remarks
 * This bridge lets browser-friendly async generators power Node stream APIs
 * used by older Hive indexing tools.
 *
 * @example
 * ```ts
 * const stream = iteratorStream(client.blockchain.getBlocks(90_000_000))
 * stream.on('data', (block) => console.log(block.block_id))
 * ```
 */
export function iteratorStream<T>(
  iterator: AsyncIterableIterator<T>
): NodeJS.ReadableStream {
  const stream = new PassThrough({ objectMode: true })
  const iterate = async () => {
    for await (const item of iterator) {
      if (!stream.write(item)) {
        await waitForEvent(stream, 'drain')
      }
    }
  }
  iterate()
    .then(() => {
      stream.end()
    })
    .catch((error) => {
      stream.emit('error', error)
      stream.end()
    })
  return stream
}
/**
 * Creates a deep copy of a JSON-serializable object.
 *
 * @param object - Plain object, array, or value to clone.
 * @returns A cloned value produced through JSON serialization.
 *
 * @remarks
 * Pollen uses this for transaction and RPC payloads where the data model is
 * already JSON-compatible.
 *
 * @example
 * ```ts
 * const txCopy = copy(transaction)
 * ```
 */
export function copy<T>(object: T): T {
  return JSON.parse(JSON.stringify(object))
}

/**
 * Check if an error code indicates the request never reached the server.
 */
function isPreConnectionError(error: any): boolean {
  if (!error || !error.code) return false
  return PRE_CONNECTION_ERRORS.some((code) => error.code.includes(code))
}

/**
 * Check if an error should trigger failover for read operations.
 * Matches any known network/timeout error, or errors with no code (HTTP errors).
 */
function shouldFailover(error: any): boolean {
  if (!error) return true
  // HTTP errors (from !response.ok) have no .code — they should trigger failover
  if (!error.code) return true
  return FAILOVER_ERRORS.some((code) => error.code.includes(code))
}

/**
 * Get the next node in the ordered list (wraps around).
 */
function nextNode(nodes: string[], currentIndex: number): number {
  return (currentIndex + 1) % nodes.length
}

/**
 * Computes an exponential retry delay with random jitter.
 *
 * @param tries - Number of failed attempts or rounds already observed.
 * @param baseDelay - Initial delay in milliseconds.
 * @param maxDelay - Maximum exponential component in milliseconds.
 * @param jitter - Maximum random jitter to add in milliseconds.
 * @returns Delay in milliseconds.
 *
 * @remarks
 * Formula: `min(maxDelay, baseDelay * 2^tries) + random(0, jitter)`.
 * Jitter keeps many clients from retrying the same Hive RPC nodes in lockstep.
 *
 * @example
 * ```ts
 * const delay = exponentialBackoffWithJitter(2, 500, 10_000, 250)
 * ```
 */
export function exponentialBackoffWithJitter(
  tries: number,
  baseDelay = 500,
  maxDelay = 10000,
  jitter = 100
): number {
  const delay = Math.min(maxDelay, baseDelay * Math.pow(2, tries))
  return delay + Math.floor(Math.random() * jitter)
}

/**
 * Sends an RPC request with ordered node failover and health tracking.
 *
 * @param currentAddress - Currently active RPC endpoint.
 * @param allAddresses - Single endpoint or ordered failover endpoint list.
 * @param opts - Fetch options including request body and headers.
 * @param timeout - Overall retry timeout in milliseconds. `0` means unlimited.
 * @param failoverThreshold - Number of full endpoint rounds before giving up.
 * `0` means retry until `timeout` stops the call.
 * @param consoleOnFailover - Whether failover events should be logged.
 * @param backoff - Function returning the between-round delay.
 * @param fetchTimeout - Optional per-attempt timeout function.
 * @param retryContext - Optional API and broadcast-safety metadata.
 * @returns The JSON-RPC response and endpoint that produced it.
 *
 * @remarks
 * Read operations immediately rotate through healthy nodes and only back off
 * between full rounds. Broadcasts are intentionally stricter: Pollen retries
 * only pre-connection failures where the request certainly never reached a node,
 * preventing duplicate transfers, votes, or posts.
 *
 * @throws Error
 * Throws the last network, HTTP, timeout, or fetch error after timeout or
 * failover limits are reached.
 *
 * @example
 * ```ts
 * const { response, currentAddress } = await retryingFetch(
 *   'https://api.hive.blog',
 *   ['https://api.hive.blog', 'https://api.openhive.network'],
 *   opts,
 *   60_000,
 *   3,
 *   false,
 *   exponentialBackoffWithJitter
 * )
 * ```
 */
export async function retryingFetch(
  currentAddress: string,
  allAddresses: string | string[],
  opts: any,
  timeout: number,
  failoverThreshold: number,
  consoleOnFailover: boolean,
  backoff: (tries: number) => number,
  fetchTimeout?: (tries: number) => number,
  retryContext?: RetryContext
) {
  const { healthTracker, api, isBroadcast } = retryContext || {}
  const logFailover = retryContext?.consoleOnFailover ?? consoleOnFailover

  // Build ordered node list: healthy nodes first, then unhealthy as fallback
  let orderedNodes: string[]
  if (Array.isArray(allAddresses) && allAddresses.length > 1) {
    orderedNodes = healthTracker
      ? healthTracker.getOrderedNodes(allAddresses, api)
      : [...allAddresses]
  } else {
    orderedNodes = Array.isArray(allAddresses) ? allAddresses : [allAddresses]
  }

  // Always start from the healthiest node (index 0 of the ordered list).
  // The health tracker already sorted nodes with healthy ones first,
  // so starting from 0 ensures we use the best available node.
  let nodeIndex = 0

  const totalNodes = orderedNodes.length
  const startTime = Date.now()
  let nodesTriedInRound = 0
  let round = 0
  let lastError: any

  // tslint:disable-next-line: no-constant-condition
  while (true) {
    const node = orderedNodes[nodeIndex]

    try {
      // Skip nodes that are currently rate-limited
      if (healthTracker && healthTracker.isRateLimited(node)) {
        lastError = new Error(`Node ${node} is rate-limited, skipping`)
        if (healthTracker && api) healthTracker.recordFailure(node, api)
        throw lastError
      }

      if (fetchTimeout) {
        opts.timeout = fetchTimeout(nodesTriedInRound)
      }

      const response = await fetch(node, opts)

      if (!response.ok) {
        // Handle 429 — record rate limit and fail over immediately
        if (response.status === 429) {
          const retryAfterHeader = response.headers?.get?.('retry-after')
          const retryAfterSec = retryAfterHeader ? parseInt(retryAfterHeader, 10) : undefined
          if (healthTracker) {
            healthTracker.recordRateLimit(node, !isNaN(retryAfterSec as number) ? retryAfterSec : undefined)
          }
          throw new Error(`HTTP 429: Too Many Requests`)
        }

        // Handle 503 — don't parse JSON body, just fail over
        if (response.status === 503) {
          if (healthTracker && api) healthTracker.recordFailure(node, api)
          throw new Error(`HTTP 503: Service Temporarily Unavailable`)
        }

        // Some Hive nodes return non-200 HTTP status (500, 502, etc.)
        // but still include a valid JSON-RPC response in the body.
        // This happens when a node is overloaded — it processes the transaction
        // but returns an error HTTP status. For broadcasts, ignoring the body
        // would cause the caller to think it failed, leading to double-posts.
        try {
          const resJson = await response.json()
          if (resJson.jsonrpc === '2.0') {
            if (healthTracker && api) healthTracker.recordSuccess(node, api)
            return { response: resJson, currentAddress: node }
          }
        } catch {
          // JSON parse failed, fall through to error handling
        }
        const statusText = response.statusText || `status code ${response.status}`
        throw new Error(`HTTP ${response.status}: ${statusText}`)
      }

      const responseJson = await response.json()

      // Record success in health tracker
      if (healthTracker && api) {
        healthTracker.recordSuccess(node, api)
      }

      return { response: responseJson, currentAddress: node }

    } catch (error: any) {
      lastError = error

      // Record failure in health tracker
      if (healthTracker && api) {
        healthTracker.recordFailure(node, api)
      }

      // === BROADCAST SAFETY ===
      // For broadcasts, only retry if the request definitely never reached the server.
      // If there's any chance the server received it, throw immediately to prevent
      // double-broadcasting (e.g. double transfers, double votes).
      if (isBroadcast) {
        if (isPreConnectionError(error) && totalNodes > 1) {
          // Safe to try another node — request never left the client
          nodeIndex = nextNode(orderedNodes, nodeIndex)
          nodesTriedInRound++
          if (nodesTriedInRound >= totalNodes) {
            // Tried all nodes, give up for broadcasts
            throw error
          }
          if (logFailover) {
            // tslint:disable-next-line: no-console
            console.log(`Broadcast failover to: ${orderedNodes[nodeIndex]} (${error.code}, request never sent)`)
          }
          continue
        }
        // Timeout, HTTP error, or unknown error — request may have been received.
        // Do NOT retry. Throw immediately.
        throw error
      }

      // === READ OPERATION FAILOVER ===
      if (!shouldFailover(error)) {
        // Unrecognized error type — don't failover, throw immediately
        throw error
      }

      // Small delay between node attempts within a round to prevent
      // flooding all nodes when multiple concurrent requests fail over
      if (totalNodes > 1 && nodesTriedInRound > 0) {
        await sleep(50 + Math.random() * 50) // 50-100ms jitter
      }

      // Try next node immediately (no backoff within a round)
      if (totalNodes > 1) {
        nodeIndex = nextNode(orderedNodes, nodeIndex)
        nodesTriedInRound++

        if (nodesTriedInRound >= totalNodes) {
          // Completed a full round through all nodes
          nodesTriedInRound = 0

          // failoverThreshold=0 means retry forever (only timeout can stop it)
          if (failoverThreshold > 0) {
            round++
            if (round >= failoverThreshold) {
              error.message = `All ${totalNodes} nodes failed after ${failoverThreshold} rounds. ` +
                `Last error: [${error.code || 'HTTP'}] ${error.message}. ` +
                `Nodes: ${orderedNodes.join(', ')}`
              throw error
            }
          }

          // Check total timeout before starting next round
          if (timeout !== 0 && Date.now() - startTime > timeout) {
            throw error
          }

          // Backoff between rounds (not between individual node attempts)
          await sleep(backoff(round))
        }

        if (logFailover) {
          // tslint:disable-next-line: no-console
          console.log(`Switched Hive RPC: ${orderedNodes[nodeIndex]} (previous: ${node}, error: ${error.code || error.message})`)
        }
      } else {
        // Single node: use backoff and retry same node (legacy behavior)
        if (timeout !== 0 && Date.now() - startTime > timeout) {
          throw error
        }
        await sleep(backoff(nodesTriedInRound++))
      }
    }
  }
}

// Hack to be able to generate a valid witness_set_properties op
// Can hopefully be removed when hived's JSON representation is fixed
import { Asset, PriceType } from './chain/asset.js'
import { WitnessSetPropertiesOperation } from './chain/operation.js'
import { Serializer, Types } from './chain/serializer.js'
import { PublicKey } from './crypto.js'
/**
 * Friendly witness property values accepted by {@link buildWitnessUpdateOp}.
 *
 * @remarks
 * Hive expects `witness_set_properties` values as sorted serialized hex pairs.
 * This shape lets callers provide normal Pollen assets, prices, keys, and
 * numbers before the helper performs protocol serialization.
 *
 * @example
 * ```ts
 * const props: WitnessProps = {
 *   key: signingPublicKey,
 *   maximum_block_size: 65_536,
 *   url: 'https://example.com/witness'
 * }
 * ```
 */
export interface WitnessProps {
  account_creation_fee?: string | Asset
  account_subsidy_budget?: number // uint32_t
  account_subsidy_decay?: number // uint32_t
  key: PublicKey | string
  maximum_block_size?: number // uint32_t
  new_signing_key?: PublicKey | string | null
  hbd_exchange_rate?: PriceType
  hbd_interest_rate?: number // uint16_t
  url?: string
}

const serialize = (serializer: Serializer, data: any) => {
  const writer = new BinaryWriter()
  serializer(writer, data)
  return Buffer.from(writer.getBuffer()).toString('hex')
}

/**
 * Builds a Hive `witness_set_properties` operation from friendly property values.
 *
 * @param owner - Witness account name.
 * @param props - Witness properties to serialize into sorted hex pairs.
 * @returns A ready-to-broadcast `witness_set_properties` operation.
 *
 * @remarks
 * Hive expects witness property values to be pre-serialized hex strings in a
 * sorted flat map. This helper keeps that low-level representation out of
 * application code.
 *
 * @throws Error
 * Thrown when `props` contains an unsupported witness property.
 *
 * @example
 * ```ts
 * const op = buildWitnessUpdateOp('srbde-witness', {
 *   key: signingPublicKey,
 *   maximum_block_size: 65_536,
 *   url: 'https://example.com/witness'
 * })
 * ```
 */
export const buildWitnessUpdateOp = (
  owner: string,
  props: WitnessProps
): WitnessSetPropertiesOperation => {
  const data: WitnessSetPropertiesOperation[1] = {
    extensions: [],
    owner,
    props: []
  }
  for (const key of Object.keys(props)) {
    let type: Serializer
    switch (key) {
      case 'key':
      case 'new_signing_key':
        type = Types.PublicKey
        break
      case 'account_subsidy_budget':
      case 'account_subsidy_decay':
      case 'maximum_block_size':
        type = Types.UInt32
        break
      case 'hbd_interest_rate':
        type = Types.UInt16
        break
      case 'url':
        type = Types.String
        break
      case 'hbd_exchange_rate':
        type = Types.Price
        break
      case 'account_creation_fee':
        type = Types.Asset
        break
      default:
        throw new Error(`Unknown witness prop: ${key}`)
    }
    data.props.push([key, serialize(type, props[key])])
  }
  data.props.sort((a, b) => a[0].localeCompare(b[0]))
  return ['witness_set_properties', data]
}

import JSBI from 'jsbi'
/**
 * Mapping from Hive operation names to protocol operation ids.
 *
 * @remarks
 * This is primarily used with {@link makeBitMaskFilter} when filtering account
 * history by operation type.
 *
 * @example
 * ```ts
 * const mask = makeBitMaskFilter([
 *   operationOrders.transfer,
 *   operationOrders.claim_reward_balance
 * ])
 * ```
 */
export const operationOrders = {
  vote: 0,
  // tslint:disable-next-line: object-literal-sort-keys
  comment: 1,
  transfer: 2,
  transfer_to_vesting: 3,
  withdraw_vesting: 4,
  limit_order_create: 5,
  limit_order_cancel: 6,
  feed_publish: 7,
  convert: 8,
  account_create: 9,
  account_update: 10,
  witness_update: 11,
  account_witness_vote: 12,
  account_witness_proxy: 13,
  pow: 14,
  custom: 15,
  report_over_production: 16,
  delete_comment: 17,
  custom_json: 18,
  comment_options: 19,
  set_withdraw_vesting_route: 20,
  limit_order_create2: 21,
  claim_account: 22,
  create_claimed_account: 23,
  request_account_recovery: 24,
  recover_account: 25,
  change_recovery_account: 26,
  escrow_transfer: 27,
  escrow_dispute: 28,
  escrow_release: 29,
  pow2: 30,
  escrow_approve: 31,
  transfer_to_savings: 32,
  transfer_from_savings: 33,
  cancel_transfer_from_savings: 34,
  custom_binary: 35,
  decline_voting_rights: 36,
  reset_account: 37,
  set_reset_account: 38,
  claim_reward_balance: 39,
  delegate_vesting_shares: 40,
  account_create_with_delegation: 41,
  witness_set_properties: 42,
  account_update2: 43,
  create_proposal: 44,
  update_proposal_votes: 45,
  remove_proposal: 46,
  update_proposal: 47,
  collateralized_convert: 48,
  recurrent_transfer: 49,
  // virtual ops
  fill_convert_request: 50,
  author_reward: 51,
  curation_reward: 52,
  comment_reward: 53,
  liquidity_reward: 54,
  interest: 55,
  fill_vesting_withdraw: 56,
  fill_order: 57,
  shutdown_witness: 58,
  fill_transfer_from_savings: 59,
  hardfork: 60,
  comment_payout_update: 61,
  return_vesting_delegation: 62,
  comment_benefactor_reward: 63,
  producer_reward: 64,
  clear_null_account_balance: 65,
  proposal_pay: 66,
  sps_fund: 67,
  hardfork_hive: 68,
  hardfork_hive_restore: 69,
  delayed_voting: 70,
  consolidate_treasury_balance: 71,
  effective_comment_vote: 72,
  ineffective_delete_comment: 73,
  sps_convert: 74,
  expired_account_notification: 75,
  changed_recovery_account: 76,
  transfer_to_vesting_completed: 77,
  pow_reward: 78,
  vesting_shares_split: 79,
  account_created: 80,
  fill_collateralized_convert_request: 81,
  system_warning: 82,
  fill_recurrent_transfer: 83,
  failed_recurrent_transfer: 84
}

/**
 * Builds the two-word operation bitmask accepted by `get_account_history`.
 *
 * @param allowedOperations - Operation ids from {@link operationOrders}.
 * @returns Tuple-like low/high mask values as strings or `null`.
 *
 * @remarks
 * Hive splits operation history filters across two 64-bit masks. Pollen uses
 * JSBI so the mask is reliable in browsers that lack native bigint support in
 * older targets.
 *
 * @example
 * ```ts
 * const mask = makeBitMaskFilter([
 *   operationOrders.transfer,
 *   operationOrders.claim_reward_balance
 * ])
 *
 * const history = await client.database.getAccountHistory('srbde', -1, 100, mask)
 * ```
 */
export function makeBitMaskFilter(allowedOperations: number[]) {
  return allowedOperations
    .reduce(redFunction, [JSBI.BigInt(0), JSBI.BigInt(0)])
    .map((value) =>
      JSBI.notEqual(value, JSBI.BigInt(0)) ? value.toString() : null
    )
}

const redFunction = (
  [low, high]: [JSBI, JSBI],
  allowedOperation: number
): [JSBI, JSBI] => {
  if (allowedOperation < 64) {
    return [
      JSBI.bitwiseOr(
        low,
        JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(allowedOperation))
      ),
      high
    ]
  } else {
    return [
      low,
      JSBI.bitwiseOr(
        high,
        JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(allowedOperation - 64))
      )
    ]
  }
}
