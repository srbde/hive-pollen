/**
 * @file Market History API helper.
 */

import { Client } from "../client.js";

// ── NAI constants ─────────────────────────────────────────────────────────────

export const HBD_NAI = "@@000000013";
export const HIVE_NAI = "@@000000021";

// ── Shared primitives ─────────────────────────────────────────────────────────

/**
 * Hive asset as returned by market_history_api responses.
 * `amount` is an integer string of thousandths — divide by 1000 for display.
 */
export interface HiveAsset {
  amount: string;
  precision: number;
  nai: string;
}

// ── get_recent_trades / get_trade_history ─────────────────────────────────────

export interface Trade {
  /** ISO-8601 without trailing Z — append 'Z' before passing to new Date(). */
  date: string;
  current_pays: HiveAsset;
  open_pays: HiveAsset;
  maker: string;
  taker: string;
}

export interface GetRecentTradesParams {
  /** Maximum 1000. */
  limit: number;
}

export interface GetRecentTradesResponse {
  trades: Trade[];
}

export interface GetTradeHistoryParams {
  /** ISO-8601 datetime without Z. */
  start: string;
  /** ISO-8601 datetime without Z. */
  end: string;
  /** Maximum 1000. To paginate, advance start by 1 ms past the last returned date. */
  limit: number;
}

export interface GetTradeHistoryResponse {
  trades: Trade[];
}

// ── get_ticker ────────────────────────────────────────────────────────────────

export interface GetTickerResponse {
  /** Last trade price as HIVE/HBD ratio string. */
  latest: string;
  lowest_ask: string;
  highest_bid: string;
  /** Signed decimal string, e.g. "-1.856...". */
  percent_change: string;
  /** 24-hour HIVE volume. */
  hive_volume: HiveAsset;
  /** 24-hour HBD volume. */
  hbd_volume: HiveAsset;
}

// ── get_volume ────────────────────────────────────────────────────────────────

export interface GetVolumeResponse {
  hive_volume: HiveAsset;
  hbd_volume: HiveAsset;
}

// ── get_order_book ────────────────────────────────────────────────────────────

export interface OrderBookEntry {
  order_price: {
    base: HiveAsset;
    quote: HiveAsset;
  };
  /** Decimal string, e.g. "0.04928000000000000". */
  real_price: string;
  /** HIVE in the order (millis). */
  hive: number;
  /** HBD in the order (millis). */
  hbd: number;
  /** ISO-8601 without trailing Z. */
  created: string;
}

export interface GetOrderBookParams {
  /**
   * Entries per side. Maximum 500 — requests above this return 0 results
   * (silent truncation, not an error). No offset/pagination is available.
   */
  limit: number;
}

export interface GetOrderBookResponse {
  /** Buy orders sorted highest→lowest price. */
  bids: OrderBookEntry[];
  /** Sell orders sorted lowest→highest price. */
  asks: OrderBookEntry[];
}

// ── get_market_history_buckets ────────────────────────────────────────────────

export interface GetMarketHistoryBucketsResponse {
  /** Available bucket sizes in seconds, e.g. [15, 60, 300, 3600, 86400]. */
  bucket_sizes: number[];
}

// ── get_market_history (OHLCV) ────────────────────────────────────────────────

export interface OHLCVSide {
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
}

export interface MarketBucket {
  id: number;
  /** ISO-8601 bucket start without trailing Z. */
  open: string;
  seconds: number;
  /** OHLCV in HIVE units (millis). */
  hive: OHLCVSide;
  /** OHLCV in HBD units (millis). */
  non_hive: OHLCVSide;
}

export interface GetMarketHistoryParams {
  /** Must be one of the values returned by getMarketHistoryBuckets(). */
  bucket_seconds: number;
  /** ISO-8601 datetime without Z. */
  start: string;
  /** ISO-8601 datetime without Z. */
  end: string;
}

export interface GetMarketHistoryResponse {
  buckets: MarketBucket[];
}

// ── Helper class ──────────────────────────────────────────────────────────────

/**
 * Typed wrapper for the Hive `market_history_api`.
 *
 * @remarks
 * Accessible as `client.market`. All date strings returned by this API lack a
 * trailing `Z` — append it before constructing a `Date`: `new Date(date + 'Z')`.
 * All `HiveAsset.amount` values are integer millis strings; divide by 1000 for
 * display values.
 *
 * @example
 * ```ts
 * import { Client } from '@srbde/pollen'
 *
 * const client = new Client('https://api.hive.blog')
 * const ticker = await client.market.getTicker()
 * console.log(`HIVE/HBD: ${ticker.latest}`)
 * ```
 */
export class MarketHistoryAPI {
  constructor(readonly client: Client) {}

  public call<T = unknown>(method: string, params?: unknown) {
    return this.client.call<T>("market_history_api", method, params);
  }

  /**
   * Returns the most recent trades on the internal market.
   *
   * @param params - `limit` up to 1000.
   *
   * @example
   * ```ts
   * const { trades } = await client.market.getRecentTrades({ limit: 100 })
   * ```
   */
  public getRecentTrades(params: GetRecentTradesParams): Promise<GetRecentTradesResponse> {
    return this.call<GetRecentTradesResponse>("get_recent_trades", params);
  }

  /**
   * Returns trades between two timestamps.
   *
   * @param params - `start`, `end` as ISO-8601 strings without Z, `limit` up to 1000.
   * @remarks
   * To paginate, take the maximum `date` from the last batch, append 1 ms, and
   * re-query. Loop until batch size < limit or cursor >= end.
   *
   * @example
   * ```ts
   * const { trades } = await client.market.getTradeHistory({
   *   start: '2024-01-01T00:00:00',
   *   end:   '2024-01-02T00:00:00',
   *   limit: 1000
   * })
   * ```
   */
  public getTradeHistory(params: GetTradeHistoryParams): Promise<GetTradeHistoryResponse> {
    return this.call<GetTradeHistoryResponse>("get_trade_history", params);
  }

  /**
   * Returns current ticker data for the HIVE/HBD internal market.
   *
   * @example
   * ```ts
   * const ticker = await client.market.getTicker()
   * console.log(ticker.latest, ticker.percent_change)
   * ```
   */
  public getTicker(): Promise<GetTickerResponse> {
    return this.call<GetTickerResponse>("get_ticker", {});
  }

  /**
   * Returns 24-hour HIVE and HBD trading volume.
   *
   * @example
   * ```ts
   * const { hive_volume, hbd_volume } = await client.market.getVolume()
   * ```
   */
  public getVolume(): Promise<GetVolumeResponse> {
    return this.call<GetVolumeResponse>("get_volume", {});
  }

  /**
   * Returns the current order book up to `limit` entries per side.
   *
   * @param params - `limit` per side, maximum 500. Requests above 500 return
   * 0 results (silent truncation). There is no pagination beyond 500/side.
   *
   * @example
   * ```ts
   * const { bids, asks } = await client.market.getOrderBook({ limit: 500 })
   * const spread = Number(asks[0].real_price) - Number(bids[0].real_price)
   * ```
   */
  public getOrderBook(params: GetOrderBookParams): Promise<GetOrderBookResponse> {
    return this.call<GetOrderBookResponse>("get_order_book", params);
  }

  /**
   * Returns the available OHLCV bucket sizes supported by this node.
   *
   * @example
   * ```ts
   * const { bucket_sizes } = await client.market.getMarketHistoryBuckets()
   * // [15, 60, 300, 3600, 86400]
   * ```
   */
  public getMarketHistoryBuckets(): Promise<GetMarketHistoryBucketsResponse> {
    return this.call<GetMarketHistoryBucketsResponse>("get_market_history_buckets", {});
  }

  /**
   * Returns OHLCV candles for a time range at a given bucket size.
   *
   * @param params - `bucket_seconds` must be one of the values from
   * {@link getMarketHistoryBuckets}. `start` and `end` are ISO-8601 without Z.
   * @remarks
   * Close price in HBD-per-HIVE: `bucket.hive.close / bucket.non_hive.close`.
   * Volume values are millis — divide by 1000.
   *
   * @example
   * ```ts
   * const { buckets } = await client.market.getMarketHistory({
   *   bucket_seconds: 3600,
   *   start: '2024-01-01T00:00:00',
   *   end:   '2024-01-02T00:00:00'
   * })
   * ```
   */
  public getMarketHistory(params: GetMarketHistoryParams): Promise<GetMarketHistoryResponse> {
    return this.call<GetMarketHistoryResponse>("get_market_history", params);
  }
}
