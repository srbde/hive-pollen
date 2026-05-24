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

import { EventEmitter } from "events";
import { PassThrough } from "stream";
import { NodeHealthTracker } from "./health-tracker.js";

// Errors that indicate the request never reached the server — safe to retry even for broadcasts
const PRE_CONNECTION_ERRORS = ["ECONNREFUSED", "ENOTFOUND", "EHOSTUNREACH", "EAI_AGAIN"];

// All errors that should trigger failover for read operations
const FAILOVER_ERRORS = [
  ...PRE_CONNECTION_ERRORS,
  "timeout",
  "database lock",
  "CERT_HAS_EXPIRED",
  "ECONNRESET",
  "ERR_TLS_CERT_ALTNAME_INVALID",
  "ETIMEDOUT",
  "EPIPE",
  "EPROTO",
];

/**
 * Context for smart retry and failover decisions.
 */
export interface RetryContext {
  healthTracker?: NodeHealthTracker;
  api?: string;
  isBroadcast?: boolean;
  consoleOnFailover?: boolean;
}

/**
 * Converts a Uint8Array to a hex-encoded string.
 */
export function toHex(data: Uint8Array): string {
  let out = "";
  for (let i = 0; i < data.length; i++) {
    out += data[i].toString(16).padStart(2, "0");
  }
  return out;
}

/**
 * Converts a hex-encoded string to a Uint8Array.
 */
export function fromHex(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return out;
}

/**
 * Concatenates multiple Uint8Arrays into one.
 */
export function concat(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

/**
 * Compares two byte arrays for equality.
 */
export function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Growable little-endian byte writer used by Hive serializers.
 */
export class BinaryWriter {
  private buffer: Uint8Array;
  private cursor = 0;

  constructor(size = 1024) {
    this.buffer = new Uint8Array(size);
  }

  private ensureCapacity(size: number) {
    if (this.cursor + size > this.buffer.length) {
      const newBuffer = new Uint8Array(this.buffer.length * 2 + size);
      newBuffer.set(this.buffer);
      this.buffer = newBuffer;
    }
  }

  public writeInt8(value: number) {
    this.ensureCapacity(1);
    new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength).setInt8(
      this.cursor++,
      value,
    );
  }

  public writeUint8(value: number) {
    this.ensureCapacity(1);
    this.buffer[this.cursor++] = value;
  }

  public writeInt16(value: number) {
    this.ensureCapacity(2);
    new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength).setInt16(
      this.cursor,
      value,
      true,
    );
    this.cursor += 2;
  }

  public writeUint16(value: number) {
    this.ensureCapacity(2);
    new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength).setUint16(
      this.cursor,
      value,
      true,
    );
    this.cursor += 2;
  }

  public writeInt32(value: number) {
    this.ensureCapacity(4);
    new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength).setInt32(
      this.cursor,
      value,
      true,
    );
    this.cursor += 4;
  }

  public writeUint32(value: number) {
    this.ensureCapacity(4);
    new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength).setUint32(
      this.cursor,
      value,
      true,
    );
    this.cursor += 4;
  }

  public writeInt64(value: number | string | bigint) {
    this.ensureCapacity(8);
    const val = BigInt(value.toString());
    const low = Number(val & 0xffffffffn);
    const high = Number(val >> 32n);
    const view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
    view.setUint32(this.cursor, low, true);
    view.setUint32(this.cursor + 4, high, true);
    this.cursor += 8;
  }

  public writeUint64(value: number | string | bigint) {
    this.ensureCapacity(8);
    const val = BigInt(value.toString());
    const low = Number(val & 0xffffffffn);
    const high = Number(val >> 32n);
    const view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
    view.setUint32(this.cursor, low, true);
    view.setUint32(this.cursor + 4, high, true);
    this.cursor += 8;
  }

  public writeVarint32(value: number) {
    while (value >= 0x80) {
      this.writeUint8((value & 0x7f) | 0x80);
      value >>>= 7;
    }
    this.writeUint8(value);
  }

  public writeString(value: string) {
    const bytes = new TextEncoder().encode(value);
    this.writeVarint32(bytes.length);
    this.writeBytes(bytes);
  }

  public writeBytes(bytes: Uint8Array) {
    this.ensureCapacity(bytes.length);
    this.buffer.set(bytes, this.cursor);
    this.cursor += bytes.length;
  }

  public getBuffer(): Uint8Array {
    return this.buffer.slice(0, this.cursor);
  }
}

/**
 * Little-endian byte reader used by Hive deserializers and memo decoding.
 */
export class BinaryReader {
  private view: DataView;
  private cursor = 0;

  constructor(private buffer: Uint8Array) {
    // Ensure we have a real clean Uint8Array to avoid Node Buffer .buffer weirdness
    const b = new Uint8Array(buffer);
    this.buffer = b;
    this.view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  }

  public readInt8(): number {
    return this.view.getInt8(this.cursor++);
  }

  public readUint8(): number {
    return this.view.getUint8(this.cursor++);
  }

  public readInt16(): number {
    const val = this.view.getInt16(this.cursor, true);
    this.cursor += 2;
    return val;
  }

  public readUint16(): number {
    const val = this.view.getUint16(this.cursor, true);
    this.cursor += 2;
    return val;
  }

  public readInt32(): number {
    const val = this.view.getInt32(this.cursor, true);
    this.cursor += 4;
    return val;
  }

  public readUint32(): number {
    const val = this.view.getUint32(this.cursor, true);
    this.cursor += 4;
    return val;
  }

  public readInt64(): bigint {
    const low = BigInt(this.view.getUint32(this.cursor, true));
    const high = BigInt(this.view.getUint32(this.cursor + 4, true));
    this.cursor += 8;
    return low + (high << 32n);
  }

  public readUint64(): bigint {
    return this.readInt64();
  }

  public readVarint32(): number {
    let value = 0;
    let shift = 0;
    let b: number;
    do {
      b = this.readUint8();
      value |= (b & 0x7f) << shift;
      shift += 7;
    } while (b & 0x80);
    return value;
  }

  public readString(): string {
    const length = this.readVarint32();
    return new TextDecoder().decode(this.readBytes(length));
  }

  public readBytes(length: number): Uint8Array {
    if (this.cursor + length > this.buffer.length) {
      throw new Error(
        `Out of bounds read: requested ${length} bytes but only ${this.buffer.length - this.cursor} available`,
      );
    }
    const bytes = this.buffer.slice(this.cursor, this.cursor + length);
    this.cursor += length;
    return bytes;
  }

  public skip(length: number) {
    this.cursor += length;
  }
}

/**
 * Resolves the next time an event emitter emits a specific event.
 */
export function waitForEvent<T>(emitter: EventEmitter, eventName: string | symbol): Promise<T> {
  return new Promise((resolve, reject) => {
    emitter.once(eventName, resolve);
  });
}

/**
 * Pauses execution for a fixed number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Converts an async iterator into an object-mode readable stream.
 */
export function iteratorStream<T>(iterator: AsyncIterableIterator<T>): NodeJS.ReadableStream {
  const stream = new PassThrough({ objectMode: true });
  const iterate = async () => {
    for await (const item of iterator) {
      if (!stream.write(item)) {
        await waitForEvent(stream, "drain");
      }
    }
  };
  iterate()
    .then(() => {
      stream.end();
    })
    .catch((error) => {
      stream.emit("error", error);
      stream.end();
    });
  return stream;
}

/**
 * Creates a deep copy of a JSON-serializable object.
 */
export function copy<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

/**
 * Check if an error code indicates the request never reached the server.
 */
function isPreConnectionError(error: any): boolean {
  if (!error || !error.code) return false;
  return PRE_CONNECTION_ERRORS.some((code) => error.code.includes(code));
}

/**
 * Check if an error should trigger failover for read operations.
 * Matches any known network/timeout error, or errors with no code (HTTP errors).
 */
function shouldFailover(error: any): boolean {
  if (!error) return true;
  // HTTP errors (from !response.ok) have no .code — they should trigger failover
  if (!error.code) return true;
  return FAILOVER_ERRORS.some((code) => error.code.includes(code));
}

/**
 * Get the next node in the ordered list (wraps around).
 */
function nextNode(nodes: string[], currentIndex: number): number {
  return (currentIndex + 1) % nodes.length;
}

/**
 * Computes an exponential retry delay with random jitter.
 */
export function exponentialBackoffWithJitter(
  tries: number,
  baseDelay = 500,
  maxDelay = 10000,
  jitter = 100,
): number {
  const delay = Math.min(maxDelay, baseDelay * Math.pow(2, tries));
  return delay + Math.floor(Math.random() * jitter);
}

/**
 * Sends an RPC request with ordered node failover and health tracking.
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
  retryContext?: RetryContext,
) {
  const { healthTracker, api, isBroadcast } = retryContext || {};
  const logFailover = retryContext?.consoleOnFailover ?? consoleOnFailover;

  // Build ordered node list: healthy nodes first, then unhealthy as fallback
  let orderedNodes: string[];
  if (Array.isArray(allAddresses) && allAddresses.length > 1) {
    orderedNodes = healthTracker
      ? healthTracker.getOrderedNodes(allAddresses, api)
      : [...allAddresses];
  } else {
    orderedNodes = Array.isArray(allAddresses) ? allAddresses : [allAddresses];
  }

  let nodeIndex = 0;

  const totalNodes = orderedNodes.length;
  const startTime = Date.now();
  let nodesTriedInRound = 0;
  let round = 0;
  let lastError: any;

  while (true) {
    const node = orderedNodes[nodeIndex];

    try {
      if (healthTracker && healthTracker.isRateLimited(node)) {
        lastError = new Error(`Node ${node} is rate-limited, skipping`);
        if (healthTracker && api) healthTracker.recordFailure(node, api);
        throw lastError;
      }

      if (fetchTimeout) {
        opts.timeout = fetchTimeout(nodesTriedInRound);
      }

      const response = await fetch(node, opts);

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfterHeader = response.headers?.get?.("retry-after");
          const retryAfterSec = retryAfterHeader ? parseInt(retryAfterHeader, 10) : undefined;
          if (healthTracker) {
            healthTracker.recordRateLimit(
              node,
              !isNaN(retryAfterSec as number) ? retryAfterSec : undefined,
            );
          }
          throw new Error(`HTTP 429: Too Many Requests`);
        }

        if (response.status === 503) {
          if (healthTracker && api) healthTracker.recordFailure(node, api);
          throw new Error(`HTTP 503: Service Temporarily Unavailable`);
        }

        try {
          const resJson = await response.json();
          if (resJson.jsonrpc === "2.0") {
            if (healthTracker && api) healthTracker.recordSuccess(node, api);
            return { response: resJson, currentAddress: node };
          }
        } catch {}
        const statusText = response.statusText || `status code ${response.status}`;
        throw new Error(`HTTP ${response.status}: ${statusText}`);
      }

      const responseJson = await response.json();

      if (healthTracker && api) {
        healthTracker.recordSuccess(node, api);
      }

      return { response: responseJson, currentAddress: node };
    } catch (error: any) {
      lastError = error;

      if (healthTracker && api) {
        healthTracker.recordFailure(node, api);
      }

      if (isBroadcast) {
        if (isPreConnectionError(error) && totalNodes > 1) {
          nodeIndex = nextNode(orderedNodes, nodeIndex);
          nodesTriedInRound++;
          if (nodesTriedInRound >= totalNodes) {
            throw error;
          }
          if (logFailover) {
            console.log(
              `Broadcast failover to: ${orderedNodes[nodeIndex]} (${error.code}, request never sent)`,
            );
          }
          continue;
        }
        throw error;
      }

      if (!shouldFailover(error)) {
        throw error;
      }

      if (totalNodes > 1 && nodesTriedInRound > 0) {
        await sleep(50 + Math.random() * 50);
      }

      if (totalNodes > 1) {
        nodeIndex = nextNode(orderedNodes, nodeIndex);
        nodesTriedInRound++;

        if (nodesTriedInRound >= totalNodes) {
          nodesTriedInRound = 0;
          if (failoverThreshold > 0) {
            round++;
            if (round >= failoverThreshold) {
              error.message =
                `All ${totalNodes} nodes failed after ${failoverThreshold} rounds. ` +
                `Last error: [${error.code || "HTTP"}] ${error.message}. ` +
                `Nodes: ${orderedNodes.join(", ")}`;
              throw error;
            }
          }
          if (timeout !== 0 && Date.now() - startTime > timeout) {
            throw error;
          }
          await sleep(backoff(round));
        }

        if (logFailover) {
          console.log(
            `Switched Hive RPC: ${orderedNodes[nodeIndex]} (previous: ${node}, error: ${error.code || error.message})`,
          );
        }
      } else {
        if (timeout !== 0 && Date.now() - startTime > timeout) {
          throw error;
        }
        await sleep(backoff(nodesTriedInRound++));
      }
    }
  }
}

import { Asset, PriceType } from "./chain/asset.js";
import { WitnessSetPropertiesOperation } from "./chain/operation.js";
import { Serializer, Types } from "./chain/serializer.js";
import { PublicKey } from "./crypto.js";

export interface WitnessProps {
  account_creation_fee?: string | Asset;
  account_subsidy_budget?: number; // uint32_t
  account_subsidy_decay?: number; // uint32_t
  key: PublicKey | string;
  maximum_block_size?: number; // uint32_t
  new_signing_key?: PublicKey | string | null;
  hbd_exchange_rate?: PriceType;
  hbd_interest_rate?: number; // uint16_t
  url?: string;
}

const serialize = (serializer: Serializer, data: any) => {
  const writer = new BinaryWriter();
  serializer(writer, data);
  return toHex(writer.getBuffer());
};

export const buildWitnessUpdateOp = (
  owner: string,
  props: WitnessProps,
): WitnessSetPropertiesOperation => {
  const data: WitnessSetPropertiesOperation[1] = {
    extensions: [],
    owner,
    props: [],
  };
  for (const key of Object.keys(props)) {
    let type: Serializer;
    switch (key) {
      case "key":
      case "new_signing_key":
        type = Types.PublicKey;
        break;
      case "account_subsidy_budget":
      case "account_subsidy_decay":
      case "maximum_block_size":
        type = Types.UInt32;
        break;
      case "hbd_interest_rate":
        type = Types.UInt16;
        break;
      case "url":
        type = Types.String;
        break;
      case "hbd_exchange_rate":
        type = Types.Price;
        break;
      case "account_creation_fee":
        type = Types.Asset;
        break;
      default:
        throw new Error(`Unknown witness prop: ${key}`);
    }
    data.props.push([key, serialize(type, props[key])]);
  }
  data.props.sort((a, b) => a[0].localeCompare(b[0]));
  return ["witness_set_properties", data];
};

export const operationOrders = {
  vote: 0,
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
  failed_recurrent_transfer: 84,
};

export function makeBitMaskFilter(allowedOperations: number[]) {
  return allowedOperations
    .reduce(redFunction, [0n, 0n])
    .map((value) => (value !== 0n ? value.toString() : null));
}

const redFunction = ([low, high]: [bigint, bigint], allowedOperation: number): [bigint, bigint] => {
  if (allowedOperation < 64) {
    return [low | (1n << BigInt(allowedOperation)), high];
  } else {
    return [low, high | (1n << BigInt(allowedOperation - 64))];
  }
};
