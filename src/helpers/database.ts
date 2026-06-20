/**
 * @file Database API helpers.
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

import { ExtendedAccount } from "../chain/account.js";
import { Price, PriceType } from "../chain/asset.js";
import { BlockHeader, SignedBlock } from "../chain/block.js";
import { Discussion } from "../chain/comment.js";
import { DynamicGlobalProperties } from "../chain/misc.js";
import { ChainProperties, VestingDelegation } from "../chain/misc.js";
import { AppliedOperation } from "../chain/operation.js";
import { SignedTransaction } from "../chain/transaction.js";
import { HiveAsset } from "./market.js";
import { Client } from "./../client.js";

// ── condenser_api.get_open_orders ────────────────────────────────────────────

/**
 * A single open limit order as returned by `condenser_api.get_open_orders`.
 *
 * @remarks
 * `sell_price` here uses human-readable asset strings (`"1.000 HIVE"`) rather
 * than {@link HiveAsset} objects — this differs from {@link LimitOrder} returned
 * by `database_api.list_limit_orders`. Use the provided `real_price` instead of
 * computing price from `sell_price`.
 *
 * `sell_price.base` reflects the **original** order amount; `for_sale` is what
 * remains and will be less than the original when the order is partially filled.
 */
export interface OpenOrder {
  id: number;
  /** ISO-8601 without trailing Z. */
  created: string;
  /** ISO-8601 without trailing Z. */
  expiration: string;
  seller: string;
  orderid: number;
  /** Millis of the remaining base asset — may be less than original if partially filled. */
  for_sale: number;
  sell_price: {
    /** Human-readable original order amount, e.g. `"11089.628 HIVE"`. */
    base: string;
    /** Human-readable desired amount, e.g. `"655.397 HBD"`. */
    quote: string;
  };
  /** Pre-computed HBD-per-HIVE price as a decimal string. */
  real_price: string;
  /** Legacy field, always false. */
  rewarded: boolean;
}

// ── condenser_api.get_account_history types ───────────────────────────────────

/**
 * The payload of a `fill_order` virtual operation.
 *
 * @remarks
 * Amounts are human-readable strings (`"602.975 HIVE"`), not millis integers.
 * Parse with `s.split(' ')` → `[Number(amount), symbol]`. Do **not** multiply
 * by 0.001. The same trade generates one entry in both the maker's and taker's
 * account history — deduplicate on `trx_id + op_in_trx` when joining across accounts.
 */
export interface FillOrderOp {
  /** Taker — account whose order triggered the match. */
  current_owner: string;
  current_orderid: number;
  /** Human-readable asset string, e.g. `"602.975 HIVE"`. */
  current_pays: string;
  /** Maker — account whose resting order was matched. */
  open_owner: string;
  open_orderid: number;
  /** Human-readable asset string, e.g. `"29.787 HBD"`. */
  open_pays: string;
}

/**
 * A single entry from `condenser_api.get_account_history`.
 *
 * @remarks
 * Results are returned as `[index, AccountHistoryEntry]` tuples. Narrow the
 * operation type with `entry.op[0] === 'fill_order'` before casting `entry.op[1]`.
 */
export interface AccountHistoryEntry {
  /** Operation tuple: `[operationName, payload]`. */
  op: [string, unknown];
  block: number;
  trx_id: string;
  op_in_trx: number;
  /** ISO-8601 without trailing Z. */
  timestamp: string;
  virtual_op: boolean;
}

// ── database_api.list_limit_orders ───────────────────────────────────────────

/**
 * A single open limit order on the Hive internal market, as returned by
 * `database_api.list_limit_orders`. Includes the seller account name and full
 * price data — fields not available from `market_history_api.get_order_book`.
 */
export interface LimitOrder {
  id: number;
  /** ISO-8601 without trailing Z. */
  created: string;
  /** ISO-8601 without trailing Z. */
  expiration: string;
  /** Hive account name of the order owner. */
  seller: string;
  /** Seller-assigned order ID. */
  orderid: number;
  /** Amount remaining for sale, in millis of the base asset. */
  for_sale: number;
  sell_price: {
    /** Asset being sold. */
    base: HiveAsset;
    /** Asset wanted in return. */
    quote: HiveAsset;
  };
}

export interface ListLimitOrdersParams {
  /**
   * Pagination cursor as `[seller_account, orderid]`.
   * Use `["", 0]` to start from the beginning.
   */
  start: [string, number];
  /** Maximum entries per page. Up to 1000. */
  limit: number;
  /**
   * Must be `"by_account"`. The `"by_price"` value throws a
   * `bad_cast_exception` on all tested nodes.
   */
  order: "by_account";
}

export interface ListLimitOrdersResponse {
  orders: LimitOrder[];
}

/**
 * Sort or lookup category used by Hive's `get_discussions_by_*` RPC family.
 *
 * @remarks
 * Categories map directly to condenser API method suffixes. For `blog` and
 * `feed`, Hive expects the query `tag` to be an account name rather than a
 * content tag.
 *
 * @example
 * ```ts
 * const posts = await client.database.getDiscussions('trending', {
 *   tag: 'hive-139531',
 *   limit: 10
 * })
 * ```
 */
export type DiscussionQueryCategory =
  | "active"
  | "blog"
  | "cashout"
  | "children"
  | "comments"
  | "feed"
  | "hot"
  | "promoted"
  | "trending"
  | "votes"
  | "created";

/**
 * Query shape accepted by Hive discussion listing endpoints.
 *
 * @remarks
 * The name is preserved for API compatibility even though the historical type
 * spelling is `DisqussionQuery`.
 *
 * @example
 * ```ts
 * const query: DisqussionQuery = {
 *   tag: 'photography',
 *   limit: 20,
 *   truncate_body: 512
 * }
 * ```
 */
export interface DisqussionQuery {
  /**
   * Name of author or tag to fetch.
   */
  tag?: string;
  /**
   * Number of results, max 100.
   */
  limit: number;
  filter_tags?: string[];
  select_authors?: string[];
  select_tags?: string[];
  /**
   * Number of bytes of post body to fetch, default 0 (all)
   */
  truncate_body?: number;
  /**
   * Name of author to start from, used for paging.
   * Should be used in conjunction with `start_permlink`.
   */
  start_author?: string;
  /**
   * Permalink of post to start from, used for paging.
   * Should be used in conjunction with `start_author`.
   */
  start_permlink?: string;
  parent_author?: string;
  parent_permlink?: string;
}

/**
 * Read-only helper for Hive condenser/database RPC methods.
 *
 * @remarks
 * `DatabaseAPI` wraps the broad read surface used by wallets, indexers, and
 * publishing tools. Methods here keep raw condenser names visible for protocol
 * familiarity while returning Pollen chain types such as {@link Asset},
 * {@link Price}, and {@link ExtendedAccount} where richer parsing is useful.
 *
 * @example
 * ```ts
 * import { Client } from '@srbde/pollen'
 *
 * const client = new Client('https://api.hive.blog')
 * const [account] = await client.database.getAccounts(['srbde'])
 *
 * console.log(account.reputation, account.posting_json_metadata)
 * ```
 *
 * @see {@link Client.call}
 */
export class DatabaseAPI {
  /**
   * Creates a database helper bound to a client.
   *
   * @param client - Client used to send condenser API calls.
   */
  constructor(readonly client: Client) {}

  /**
   * Sends a raw condenser API call through the parent client.
   *
   * @param method - Bare condenser method name **without** the `condenser_api.`
   * prefix. This helper automatically prepends `condenser_api.` before
   * forwarding the call, so including the prefix yourself will produce a
   * double-prefixed method name (e.g. `condenser_api.condenser_api.foo`) that
   * every node will reject with an `RPCError: Unable to map request to endpoint`.
   * @param params - Positional parameters for the method.
   * @returns The decoded RPC result.
   *
   * @throws RPCError
   * Thrown when the RPC node rejects the call or the method is unavailable.
   *
   * @example
   * ```ts
   * // Correct — 'condenser_api.' is added automatically
   * const result = await client.database.call('get_config')
   * console.log(result.HIVE_BLOCK_INTERVAL)
   *
   * // Also correct
   * const votes = await client.database.call('list_proposal_votes', [
   *   [], 100, 'by_voter_proposal', 'ascending', 'votable'
   * ])
   *
   * // Wrong — sends condenser_api.condenser_api.list_proposal_votes → RPCError
   * const votes = await client.database.call('condenser_api.list_proposal_votes', [...])
   * ```
   */
  public call<T = unknown>(method: string, params?: unknown[]) {
    return this.client.call<T>("condenser_api", method, params);
  }

  /**
   * Fetches the dynamic global state maintained by the current RPC node.
   *
   * @returns Head block, irreversible block, supply, vesting, witness, and
   * timing data used by Hive applications.
   *
   * @throws RPCError
   * Thrown when the node cannot serve `get_dynamic_global_properties`.
   *
   * @example
   * ```ts
   * const props = await client.database.getDynamicGlobalProperties()
   * console.log(props.head_block_number, props.time)
   * ```
   */
  public getDynamicGlobalProperties(): Promise<DynamicGlobalProperties> {
    return this.call<DynamicGlobalProperties>("get_dynamic_global_properties");
  }

  /**
   * Fetches witness-voted median chain properties.
   *
   * @returns Chain settings such as account creation fee and maximum block size.
   *
   * @throws RPCError
   * Thrown when the RPC node cannot read chain properties.
   *
   * @example
   * ```ts
   * const props = await client.database.getChainProperties()
   * console.log(props.account_creation_fee.toString())
   * ```
   */
  public async getChainProperties(): Promise<ChainProperties> {
    return this.call<ChainProperties>("get_chain_properties");
  }

  /**
   * Fetches condenser state for a Hive-style URL path.
   *
   * @param path - Path component using condenser's routing scheme, such as
   * `@srbde` or `trending/hive-139531`.
   * @returns The mixed state bundle returned by the condenser API.
   *
   * @remarks
   * This method mirrors the legacy condenser state endpoint. Prefer focused
   * helpers such as {@link getAccounts} or {@link getDiscussions} when an app
   * only needs one resource category.
   *
   * @throws RPCError
   * Thrown when the RPC node rejects the state lookup.
   *
   * @example
   * ```ts
   * const state = await client.database.getState('trending/hive-139531')
   * console.log(Object.keys(state.content))
   * ```
   */
  public async getState(path: string): Promise<unknown> {
    return this.call<unknown>("get_state", [path]);
  }

  /**
   * Fetches the witness median market price for HIVE denominated in HBD.
   *
   * @returns A parsed {@link Price} containing the base and quote assets.
   *
   * @throws RPCError
   * Thrown when the RPC node cannot serve the price feed.
   *
   * @example
   * ```ts
   * const price = await client.database.getCurrentMedianHistoryPrice()
   * console.log(`${price.base} per ${price.quote}`)
   * ```
   */
  public async getCurrentMedianHistoryPrice(): Promise<Price> {
    return Price.from(await this.call<PriceType>("get_current_median_history_price"));
  }

  /**
   * Fetches vesting delegations made by an account.
   *
   * @param account - Delegator account name.
   * @param from - Delegatee account name to start after for pagination.
   * @param limit - Maximum number of delegations to return, up to 1000.
   * @returns Delegation records ordered by delegatee.
   *
   * @throws RPCError
   * Thrown when the account is invalid or the node rejects the request.
   *
   * @example
   * ```ts
   * const delegations = await client.database.getVestingDelegations('srbde', '', 50)
   * for (const delegation of delegations) {
   *   console.log(delegation.delegatee, delegation.vesting_shares.toString())
   * }
   * ```
   */
  public async getVestingDelegations(
    account: string,
    from = "",
    limit = 1000,
  ): Promise<VestingDelegation[]> {
    return this.call<VestingDelegation[]>("get_vesting_delegations", [account, from, limit]);
  }

  /**
   * Fetches static protocol constants exposed by the RPC node.
   *
   * @returns A name-value map of chain configuration constants.
   *
   * @remarks
   * Config values are useful when deriving UI limits, validating operation
   * payloads, or teaching protocol defaults in the VitePress hub.
   *
   * @throws RPCError
   * Thrown when the node cannot serve `get_config`.
   *
   * @example
   * ```ts
   * const config = await client.database.getConfig()
   * console.log(config.HIVE_BLOCK_INTERVAL)
   * ```
   *
   * @see https://github.com/steemit/steem/blob/master/libraries/protocol/include/steemit/protocol/config.hpp
   */
  public getConfig(): Promise<{ [name: string]: string | number | boolean }> {
    return this.call<{ [name: string]: string | number | boolean }>("get_config");
  }

  /**
   * Fetches the header for a specific block number.
   *
   * @param blockNum - One-based Hive block number.
   * @returns The signed block header without transaction bodies.
   *
   * @throws RPCError
   * Thrown when the block does not exist or the node rejects the request.
   *
   * @example
   * ```ts
   * const header = await client.database.getBlockHeader(90_000_000)
   * console.log(header.previous)
   * ```
   */
  public getBlockHeader(blockNum: number): Promise<BlockHeader> {
    return this.call<BlockHeader>("get_block_header", [blockNum]);
  }

  /**
   * Fetches a full signed block by number.
   *
   * @param blockNum - One-based Hive block number.
   * @returns The signed block, including transactions and extensions.
   *
   * @throws RPCError
   * Thrown when the block does not exist or the node rejects the request.
   *
   * @example
   * ```ts
   * const block = await client.database.getBlock(90_000_000)
   * console.log(block.transactions.length)
   * ```
   */
  public getBlock(blockNum: number): Promise<SignedBlock> {
    return this.call<SignedBlock>("get_block", [blockNum]);
  }

  /**
   * Fetches applied operations recorded in a block.
   *
   * @param blockNum - One-based Hive block number.
   * @param onlyVirtual - When true, returns only virtual operations generated by
   * chain processing.
   * @returns Applied operation records with transaction and operation indexes.
   *
   * @throws RPCError
   * Thrown when the block cannot be read or the operation-history plugin is not
   * available on the node.
   *
   * @example
   * ```ts
   * const operations = await client.database.getOperations(90_000_000)
   * console.log(operations.map((applied) => applied.op[0]))
   * ```
   */
  public getOperations(blockNum: number, onlyVirtual = false): Promise<AppliedOperation[]> {
    return this.call<AppliedOperation[]>("get_ops_in_block", [blockNum, onlyVirtual]);
  }

  /**
   * Fetches discussion records such as posts, comments, blog entries, or feeds.
   *
   * @param by - Discussion category that selects the condenser method suffix.
   * @param query - Category-specific query fields, including tag/account and
   * pagination values.
   * @returns Discussion objects as returned by condenser.
   *
   * @remarks
   * For `blog` and `feed`, set `query.tag` to the account name. For tag-based
   * categories such as `trending`, set it to the community or content tag.
   *
   * @throws RPCError
   * Thrown when the query is invalid or the selected discussion method is
   * unavailable on the node.
   *
   * @example
   * ```ts
   * const posts = await client.database.getDiscussions('blog', {
   *   tag: 'srbde',
   *   limit: 5,
   *   truncate_body: 256
   * })
   *
   * console.log(posts.map((post) => post.permlink))
   * ```
   */
  public getDiscussions(
    by: DiscussionQueryCategory,
    query: DisqussionQuery,
  ): Promise<Discussion[]> {
    return this.call<Discussion[]>(`get_discussions_by_${by}`, [query]);
  }

  /**
   * Fetches extended account objects for one or more account names.
   *
   * @param usernames - Account names to fetch.
   * @returns Extended account records, including balances, authority metadata,
   * reputation, and JSON metadata.
   *
   * @throws RPCError
   * Thrown when the RPC node rejects the account lookup.
   *
   * @example
   * ```ts
   * const [account] = await client.database.getAccounts(['srbde'])
   * console.log(account.name, account.reputation)
   * ```
   */
  public getAccounts(usernames: string[]): Promise<ExtendedAccount[]> {
    return this.call<ExtendedAccount[]>("get_accounts", [usernames]);
  }

  /**
   * Fetches a signed transaction by transaction id.
   *
   * @param txId - Hex transaction id.
   * @returns The signed transaction stored by the account-history plugin.
   *
   * @throws RPCError
   * Thrown when the transaction is unknown or the node lacks transaction lookup
   * support.
   *
   * @example
   * ```ts
   * const transaction = await client.database.getTransaction(
   *   '0000000000000000000000000000000000000000'
   * )
   * console.log(transaction.operations)
   * ```
   */
  public async getTransaction(txId: string): Promise<SignedTransaction> {
    return this.call<SignedTransaction>("get_transaction", [txId]);
  }

  /**
   * Fetches historical operations for an account.
   *
   * @param account - Account whose history should be read.
   * @param from - Starting history index. Use `-1` for the most recent entry.
   * Walk backwards by using the lowest index from each batch minus 1 as the
   * next `from`.
   * @param limit - Maximum entries to return, up to 1000.
   * @param filter - Optional `[low, high]` BigInt pair from {@link opFilter}.
   * Asks the node to return only the selected operation types, avoiding
   * client-side discard. Must stay as `bigint` through serialization — passing
   * `Number(bigint)` loses precision for bits ≥ 53 (e.g. `fill_order` is bit 57).
   * @returns Array of `[index, AccountHistoryEntry]` tuples, newest-first when
   * walking from `-1`.
   *
   * @example
   * ```ts
   * import { OP, opFilter } from '@srbde/pollen'
   *
   * const [low, high] = opFilter(OP.fill_order)
   * const history = await client.database.getAccountHistory('srbde', -1, 1000, [low, high])
   * const fills = history.filter(([, e]) => e.op[0] === 'fill_order')
   * ```
   */
  public getAccountHistory(
    account: string,
    from: number,
    limit: number,
    filter?: [bigint, bigint],
  ): Promise<[number, AccountHistoryEntry][]> {
    const params: unknown[] = [account, from, limit];
    if (filter) params.push(filter[0], filter[1]);
    return this.call<[number, AccountHistoryEntry][]>("get_account_history", params);
  }

  /**
   * Fetches all currently open limit orders for a single account.
   *
   * @param account - Hive account name.
   * @returns All open orders for the account in a single call — no pagination.
   *
   * @remarks
   * `sell_price` uses human-readable strings (`"11089.628 HIVE"`) rather than
   * {@link HiveAsset} millis objects. Use `order.real_price` for the
   * pre-computed HBD-per-HIVE price. `for_sale` reflects the **remaining**
   * amount — compare to the parsed `sell_price.base` to detect partial fills.
   *
   * To determine bid vs ask:
   * ```ts
   * const isAsk = order.sell_price.base.endsWith('HIVE')  // selling HIVE for HBD
   * const isBid = order.sell_price.base.endsWith('HBD')   // selling HBD for HIVE
   * ```
   *
   * @example
   * ```ts
   * const orders = await client.database.getOpenOrders('myaccount')
   * for (const order of orders) {
   *   console.log(order.orderid, order.real_price, order.for_sale)
   * }
   * ```
   */
  public getOpenOrders(account: string): Promise<OpenOrder[]> {
    return this.call<OpenOrder[]>("get_open_orders", [account]);
  }

  /**
   * Verifies that a signed transaction satisfies Hive authority rules.
   *
   * @param stx - Signed transaction to verify.
   * @returns True when the signatures satisfy the transaction's required
   * authorities.
   *
   * @throws RPCError
   * Thrown when the node rejects the transaction or cannot evaluate authority.
   *
   * @example
   * ```ts
   * const signed = client.broadcast.sign(transaction, privateKey)
   * const ok = await client.database.verifyAuthority(signed)
   * console.log(ok)
   * ```
   */
  public async verifyAuthority(stx: SignedTransaction): Promise<boolean> {
    return this.call<boolean>("verify_authority", [stx]);
  }

  /**
   * Lists open limit orders across the entire internal market, paginated by account.
   *
   * @param params - Cursor `start` as `["", 0]` for the first page, then the
   * last returned `[seller, orderid]` for subsequent pages. `limit` up to 1000.
   * `order` must be `"by_account"` — `"by_price"` throws a `bad_cast_exception`
   * on all tested nodes.
   * @returns Up to `limit` open orders with seller account names and full price data.
   *
   * @remarks
   * Prefer this over `market_history_api.get_order_book` when seller identity or
   * the complete order book is needed: `get_order_book` caps at 500 entries per
   * side and omits the seller. As of 2026-06-19 the full market has ~1349 orders,
   * requiring two pages at `limit=1000`. Use `[seller, orderid]` of the last entry
   * as the next `start` and loop until batch size < limit.
   *
   * To determine bid vs ask from `sell_price`:
   * ```ts
   * import { HIVE_NAI, HBD_NAI } from '@srbde/pollen'
   *
   * const isAsk = order.sell_price.base.nai === HIVE_NAI  // selling HIVE for HBD
   * const isBid = order.sell_price.base.nai === HBD_NAI   // selling HBD for HIVE
   * ```
   *
   * @example
   * ```ts
   * const orders: LimitOrder[] = []
   * let cursor: [string, number] = ['', 0]
   * while (true) {
   *   const { orders: page } = await client.database.listLimitOrders({
   *     start: cursor, limit: 1000, order: 'by_account'
   *   })
   *   orders.push(...page)
   *   if (page.length < 1000) break
   *   cursor = [page.at(-1)!.seller, page.at(-1)!.orderid]
   * }
   * ```
   */
  public listLimitOrders(params: ListLimitOrdersParams): Promise<ListLimitOrdersResponse> {
    return this.client.call<ListLimitOrdersResponse>("database_api", "list_limit_orders", params);
  }

  /**
   * Fetches version information from the active RPC node.
   *
   * @returns Version fields reported by the node software.
   *
   * @throws RPCError
   * Thrown when the node does not expose `get_version`.
   *
   * @example
   * ```ts
   * const version = await client.database.getVersion()
   * console.log(version)
   * ```
   */
  public async getVersion(): Promise<object> {
    return this.call<object>("get_version", []);
  }
}
