/**
 * @file Hive RPC client implementation.
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

import { RPCError } from "./errors.js";
import packageVersion from "./version.js";

import { Blockchain } from "./helpers/blockchain.js";
import { BroadcastAPI } from "./helpers/broadcast.js";
import { DatabaseAPI } from "./helpers/database.js";
import { HivemindAPI } from "./helpers/hivemind.js";
import { AccountByKeyAPI } from "./helpers/key.js";
import { MarketHistoryAPI } from "./helpers/market.js";
import { RCAPI } from "./helpers/rc.js";
import { TransactionStatusAPI } from "./helpers/transaction.js";
import { NodeHealthTracker, HealthTrackerOptions } from "./health-tracker.js";
import {
  assert,
  copy,
  exponentialBackoffWithJitter,
  retryingFetch,
  fromHex,
  toHex,
} from "./utils.js";

/**
 * Published Pollen package version.
 *
 * @remarks
 * This value is generated from `package.json` during the build and is also used
 * in Node request metadata so RPC operators can identify Pollen clients.
 *
 * @example
 * ```ts
 * import { VERSION } from '@srbde/pollen'
 *
 * console.log(`Running Pollen ${VERSION}`)
 * ```
 */
export const VERSION = packageVersion;

/**
 * Main Hive network chain id as 32 raw bytes.
 *
 * @remarks
 * The chain id is mixed into transaction signatures. Keeping the default here
 * prevents signatures produced for Hive mainnet from being replayed on a
 * different chain.
 *
 * @example
 * ```ts
 * import { DEFAULT_CHAIN_ID } from '@srbde/pollen'
 *
 * console.log(toHex(DEFAULT_CHAIN_ID))
 * ```
 */
export const DEFAULT_CHAIN_ID = fromHex(
  "beeab0de00000000000000000000000000000000000000000000000000000000",
);

/**
 * Main Hive network public-key address prefix.
 *
 * @remarks
 * Hive-compatible public keys are rendered with a network prefix. Mainnet uses
 * `STM`, and custom networks can override this through {@link ClientOptions}.
 */
export const DEFAULT_ADDRESS_PREFIX = "STM";

interface RPCRequest {
  /**
   * Request sequence number.
   */
  id: number | string;
  /**
   * RPC method.
   */
  method: string;
  /**
   * Array of parameters to pass to the method.
   */
  jsonrpc: "2.0";
  params: unknown;
}

interface RPCCall extends RPCRequest {
  method: string;
  /**
   * 1. API to call, you can pass either the numerical id of the API you get
   *    from calling 'get_api_by_name' or the name directly as a string.
   * 2. Method to call on that API.
   * 3. Arguments to pass to the method.
   */
  params: [number | string, string, unknown];
}

interface RPCErrorData {
  code: number;
  message: string;
  data?: unknown;
}

interface RPCResponse {
  /**
   * Response sequence number, corresponding to request sequence number.
   */
  id: number;
  error?: RPCErrorData;
  result?: unknown;
}

interface PendingRequest {
  request: RPCRequest;
  timer: NodeJS.Timer | undefined;
  resolve: (response: RPCResponse) => void;
  reject: (error: Error) => void;
}

/**
 * Configuration for a {@link Client} instance.
 *
 * @remarks
 * Options control both protocol identity, such as `chainId` and
 * `addressPrefix`, and resilience behavior, such as timeout, failover, and
 * jittered backoff. A single configured client owns the Nectar helpers for
 * database reads, broadcasting, RC, Hivemind, and transaction-status calls.
 *
 * @example
 * ```ts
 * import { Client } from '@srbde/pollen'
 *
 * const client = new Client(
 *   ['https://api.hive.blog', 'https://api.openhive.network'],
 *   {
 *     timeout: 45_000,
 *     failoverThreshold: 2,
 *     consoleOnFailover: true
 *   }
 * )
 * ```
 */
export interface ClientOptions {
  /**
   * Hive chain id. Defaults to main hive network:
   * need the new id?
   * `beeab0de00000000000000000000000000000000000000000000000000000000`
   *
   */
  chainId?: string;
  /**
   * Hive address prefix. Defaults to main network:
   * `STM`
   */
  addressPrefix?: string;
  /**
   * Send timeout, how long to wait in milliseconds before giving
   * up on a rpc call. Note that this is not an exact timeout,
   * no in-flight requests will be aborted, they will just not
   * be retried any more past the timeout.
   * Can be set to 0 to retry forever. Defaults to 60 * 1000 ms.
   */
  timeout?: number;

  /**
   * Specifies the amount of times the urls (RPC nodes) should be
   * iterated and retried in case of timeout errors.
   * (important) Requires url parameter to be an array (string[])!
   * Can be set to 0 to iterate and retry forever. Defaults to 3 rounds.
   */
  failoverThreshold?: number;

  /**
   * Whether a console.log should be made when RPC failed over to another one
   */
  consoleOnFailover?: boolean;

  /**
   * Retry backoff function, returns milliseconds. Defaults to Pollen's
   * jittered exponential backoff.
   */
  backoff?: (tries: number) => number;
  /**
   * Node.js http(s) agent, use if you want http keep-alive.
   * Defaults to using https.globalAgent.
   * @see https://nodejs.org/api/http.html#http_new_agent_options.
   */
  agent?: unknown; // https.Agent
  /**
   * Options for the node health tracker.
   * Controls cooldown periods, stale block thresholds, etc.
   */
  healthTrackerOptions?: HealthTrackerOptions;
}

/**
 * High-level Hive RPC client used by every Pollen helper.
 *
 * @remarks
 * `Client` centralizes JSON-RPC transport, node failover, API health tracking,
 * network identity, and helper construction. It can run in Node.js or a browser
 * bundle and exposes purpose-built helpers such as {@link DatabaseAPI},
 * broadcasting, and {@link Blockchain} so application code rarely needs
 * to assemble raw RPC payloads.
 *
 * @example
 * ```ts
 * import { Client } from '@srbde/pollen'
 *
 * const client = new Client('https://api.hive.blog')
 * const props = await client.database.getDynamicGlobalProperties()
 *
 * console.log(`Hive head block: ${props.head_block_number}`)
 * ```
 *
 * @see {@link ClientOptions}
 * @see {@link RPCError}
 */
export class Client {
  /**
   * Client options, *read-only*.
   */
  public readonly options: ClientOptions;

  /**
   * Address to Hive RPC server.
   * String or String[] *read-only*
   */
  public address: string | string[];

  /**
   * Database API helper.
   */
  public readonly database: DatabaseAPI;

  /**
   * RC API helper.
   */
  public readonly rc: RCAPI;

  /**
   * Broadcast API helper.
   */
  public readonly broadcast: BroadcastAPI;

  /**
   * Blockchain helper.
   */
  public readonly blockchain: Blockchain;

  /**
   * Market History API helper.
   */
  public readonly market: MarketHistoryAPI;

  /**
   * Hivemind helper.
   */
  public readonly hivemind: HivemindAPI;

  /**
   * Accounts by key API helper.
   */
  public readonly keys: AccountByKeyAPI;

  /**
   * Transaction status API helper.
   */
  public readonly transaction: TransactionStatusAPI;

  /**
   * Node health tracker for smart failover.
   * Tracks per-node, per-API health and head block freshness.
   */
  public readonly healthTracker: NodeHealthTracker;

  /**
   * Chain ID for current network.
   */
  public readonly chainId: Uint8Array;

  /**
   * Address prefix for current network.
   */
  public readonly addressPrefix: string;

  private timeout: number;
  private backoff: typeof defaultBackoff;

  private failoverThreshold: number;

  private consoleOnFailover: boolean;

  public currentAddress: string;

  /**
   * Creates a client for one or more Hive RPC endpoints.
   *
   * @param address - RPC endpoint URL or ordered failover list. For example,
   * `https://api.hive.blog` or `['https://api.hive.blog', 'https://api.openhive.network']`.
   * @param options - Network identity and resilience settings.
   *
   * @remarks
   * The first endpoint becomes the active node. When calls fail, Pollen uses
   * the configured backoff and health tracker to move across the endpoint
   * list without requiring callers to recreate helper objects.
   *
   * @throws AssertionError
   * Thrown when `options.chainId` is not exactly 32 bytes after hex decoding.
   *
   * @example
   * ```ts
   * import { Client } from '@srbde/pollen'
   *
   * const client = new Client(
   *   ['https://api.hive.blog', 'https://api.deathwing.me'],
   *   { timeout: 30_000, failoverThreshold: 2 }
   * )
   *
   * const accounts = await client.database.getAccounts(['srbde'])
   * console.log(accounts[0].balance)
   * ```
   */
  constructor(address: string | string[], options: ClientOptions = {}) {
    this.currentAddress = Array.isArray(address) ? address[0] : address;
    this.address = address;
    this.options = options;

    this.chainId = options.chainId ? fromHex(options.chainId) : DEFAULT_CHAIN_ID;
    assert(this.chainId.length === 32, "invalid chain id");
    this.addressPrefix = options.addressPrefix || DEFAULT_ADDRESS_PREFIX;

    this.timeout = options.timeout || 60 * 1000;
    this.backoff = options.backoff || defaultBackoff;
    this.failoverThreshold = options.failoverThreshold || 3;
    this.consoleOnFailover = options.consoleOnFailover || false;

    this.healthTracker = new NodeHealthTracker(options.healthTrackerOptions);
    this.database = new DatabaseAPI(this);
    this.broadcast = new BroadcastAPI(this);
    this.market = new MarketHistoryAPI(this);
    this.blockchain = new Blockchain(this);
    this.rc = new RCAPI(this);
    this.hivemind = new HivemindAPI(this);
    this.keys = new AccountByKeyAPI(this);
    this.transaction = new TransactionStatusAPI(this);
  }

  /**
   * Creates a client preconfigured for the public Hive testnet.
   *
   * @param options - Optional client settings copied into the testnet
   * configuration.
   * @returns A {@link Client} targeting `https://api.fake.openhive.network`
   * with the testnet chain id.
   *
   * @remarks
   * This helper preserves transport options such as custom HTTP agents while
   * replacing chain identity values so test transactions cannot be confused
   * with mainnet signatures.
   *
   * @example
   * ```ts
   * import { Client } from '@srbde/pollen'
   *
   * const testnet = Client.testnet({ timeout: 20_000 })
   * const props = await testnet.database.getDynamicGlobalProperties()
   * console.log(props.head_block_number)
   * ```
   */
  public static testnet(options?: ClientOptions) {
    let opts: ClientOptions = {};
    if (options) {
      opts = copy(options);
      opts.agent = options.agent;
    }

    opts.addressPrefix = "STM";
    opts.chainId = "4200000000000000000000000000000000000000000000000000000000000000";
    return new Client("https://api.fake.openhive.network", opts);
  }

  /**
   * Creates a Client instance initialized with healthy nodes fetched dynamically
   * from nectarflower's on-chain metadata.
   *
   * @param options - Additional options for the client.
   * @param bootstrapNodes - Optional list of bootstrap nodes to fetch metadata from.
   * Defaults to mainnet public nodes.
   *
   * @example
   * ```ts
   * import { Client } from '@srbde/pollen'
   *
   * const client = await Client.fromNectarflower()
   * const props = await client.database.getDynamicGlobalProperties()
   * console.log(props.head_block_number)
   * ```
   */
  public static async fromNectarflower(
    options?: ClientOptions,
    bootstrapNodes: string | string[] = ["https://api.hive.blog", "https://api.syncad.com"],
  ): Promise<Client> {
    const bootstrapClient = new Client(bootstrapNodes, options);
    const accounts = await bootstrapClient.database.getAccounts(["nectarflower"]);
    if (!accounts || accounts.length === 0) {
      throw new Error("Failed to fetch nectarflower account metadata");
    }
    const meta = JSON.parse(accounts[0].json_metadata);
    if (!meta || !Array.isArray(meta.nodes) || meta.nodes.length === 0) {
      throw new Error("Invalid nectarflower node metadata structure");
    }
    return new Client(meta.nodes, options);
  }

  /**
   * Sends a JSON-RPC request through the configured failover transport.
   *
   * @param api - API namespace to call, such as `condenser_api`.
   * @param method - Method within the API namespace, such as
   * `get_dynamic_global_properties`.
   * @param params - Positional RPC parameters. Defaults to an empty array.
   * @returns The decoded `result` member returned by the RPC node.
   *
   * @remarks
   * The transport serializes `Uint8Array` values as Hive-compatible hex strings, applies
   * jittered retry backoff, tracks API-specific node failures, and passively
   * records head-block freshness from `get_dynamic_global_properties`
   * responses. Broadcast calls skip the short per-fetch timeout because they
   * must not be retried as aggressively as read-only calls.
   *
   * @throws RPCError
   * Thrown when the node returns a JSON-RPC error. The `info` property carries
   * the original error data when the node provides it.
   * @throws AssertionError
   * Thrown when the response id does not match the request id.
   *
   * @example
   * ```ts
   * import { Client } from '@srbde/pollen'
   *
   * const client = new Client('https://api.hive.blog')
   * const config = await client.call('condenser_api', 'get_config')
   *
   * console.log(config.HIVE_BLOCK_INTERVAL)
   * ```
   *
   * @see {@link retryingFetch}
   * @see {@link NodeHealthTracker}
   */
  public async call<T = unknown>(api: string, method: string, params: unknown = []): Promise<T> {
    const isBroadcast =
      api === "network_broadcast_api" || method.startsWith("broadcast_transaction");

    const request: RPCRequest = {
      id: 0,
      jsonrpc: "2.0",
      method: api + "." + method,
      params,
    };
    const body = serializeRpcBody(request);
    const opts: RequestInit & { agent?: unknown } = {
      body,
      cache: "no-cache",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
    };

    // Self is not defined within Node environments
    // This check is needed because the user agent cannot be set in a browser
    if (typeof self === undefined) {
      opts.headers = {
        "User-Agent": `pollen/${packageVersion}`,
      };
    }

    if (this.options.agent) {
      opts.agent = this.options.agent;
    }
    let fetchTimeout: ((tries: number) => number) | undefined;
    if (!isBroadcast) {
      // bit of a hack to work around some nodes high error rates
      // only effective in node.js (until timeout spec lands in browsers)
      fetchTimeout = (tries: number) => (tries + 1) * 500;
    }

    const { response, currentAddress }: { response: RPCResponse; currentAddress: string } =
      await retryingFetch(
        this.currentAddress,
        this.address,
        opts,
        this.timeout,
        this.failoverThreshold,
        this.consoleOnFailover,
        this.backoff,
        fetchTimeout,
        {
          healthTracker: this.healthTracker,
          api,
          isBroadcast,
          consoleOnFailover: this.consoleOnFailover,
        },
      );

    // After failover, change the currently active address
    if (currentAddress !== this.currentAddress) {
      this.currentAddress = currentAddress;
    }

    // Passively track head block from get_dynamic_global_properties responses.
    // This costs nothing — we just inspect data we already fetched.
    if (
      response.result &&
      method === "get_dynamic_global_properties" &&
      typeof response.result === "object" &&
      "head_block_number" in response.result
    ) {
      this.healthTracker.updateHeadBlock(
        currentAddress,
        (response.result as any).head_block_number,
      );
    }

    // Handle RPC-level errors.
    // Unlike network errors, these mean the node responded but returned an error.
    // We record it as an API-specific failure so the health tracker can
    // deprioritize this node for this API in future calls.
    if (response.error) {
      const formatValue = (value: unknown): string => {
        switch (typeof value) {
          case "object":
            return JSON.stringify(value);
          default:
            return String(value);
        }
      };
      const data = response.error.data as
        | {
            stack?: {
              data: Record<string, unknown>;
              format: string;
            }[];
          }
        | undefined;
      let { message } = response.error;
      if (data && data.stack && data.stack.length > 0) {
        const top = data.stack[0];
        const topData = copy(top.data);
        message = top.format.replace(/\$\{([a-z_]+)\}/gi, (match: string, key: string) => {
          let rv = match;
          if (topData[key] !== undefined) {
            rv = formatValue(topData[key]);
            delete topData[key];
          }
          return rv;
        });
        const unformattedData = Object.keys(topData)
          .map((key) => ({ key, value: formatValue(topData[key]) }))
          .map((item) => `${item.key}=${item.value}`);
        if (unformattedData.length > 0) {
          message += " " + unformattedData.join(" ");
        }
      }

      // Track RPC errors that indicate node/plugin issues (not user errors).
      // JSON-RPC error codes (response.error.code):
      //   -32601 = Method not found (plugin not enabled on this node)
      //   -32603 = Internal error (node issue)
      //   -32003 = Hive assertion error (user error — bad params, invalid account)
      //   -32003 is technically not a node failure, but we want failover for it in some cases.
      const rpcCode = response.error.code;
      if (rpcCode === -32601 || rpcCode === -32603) {
        this.healthTracker.recordApiFailure(currentAddress, api);
      }

      throw new RPCError(message, response.error.data);
    }
    assert(response.id === request.id, "got invalid response id");
    return response.result as T;
  }
}

/**
 * Serializes an RPC request body to a JSON string with support for BigInt and Uint8Array.
 *
 * `JSON.stringify` cannot emit BigInt as a raw JSON integer — it either throws or, when coerced
 * to Number first, loses precision for values above 2^53. This is a real hazard for
 * `condenser_api.get_account_history` filter params (e.g. `fill_order` is bit 57 = 2^57).
 * A placeholder-and-replace approach is unsafe because arbitrary string params (memos,
 * custom_json) could collide with the placeholder pattern. This recursive serializer
 * handles both types natively and is correct by construction.
 */
function serializeRpcBody(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "boolean" || typeof value === "number") return JSON.stringify(value);
  if (typeof value === "string") return JSON.stringify(value);
  if (value instanceof Uint8Array) return JSON.stringify(toHex(value));
  if (Array.isArray(value)) return "[" + value.map(serializeRpcBody).join(",") + "]";
  if (typeof value === "object") {
    const pairs = Object.entries(value)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${JSON.stringify(k)}:${serializeRpcBody(v)}`);
    return "{" + pairs.join(",") + "}";
  }
  return "null";
}

/**
 * Returns Pollen's default retry delay for a failed RPC attempt.
 *
 * @param tries - Number of attempts already made.
 * @returns A jittered exponential delay in milliseconds.
 *
 * @remarks
 * Jitter prevents multiple clients from retrying in lockstep against the same
 * RPC node, reducing thundering-herd behavior during transient outages.
 *
 * @example
 * ```ts
 * const delayMs = defaultBackoff(3)
 * ```
 */
const defaultBackoff = (tries: number): number => exponentialBackoffWithJitter(tries);
