# Pollen SDK Improvements — market_history_api + database_api

Discovered while building Internal Market Explorer on top of `@srbde/pollen`.
All calls currently use the raw `client.call<T>()` generic — no typed wrappers or response interfaces exist in the SDK for `market_history_api`.

---

## 1. Type Definitions Needed

### Shared primitives

```ts
/** Hive asset amount as returned by the API (millis — divide by 1000 for display) */
interface HiveAsset {
  amount: string   // integer string, e.g. "10080930"
  precision: number
  nai: string      // "@@000000013" = HBD, "@@000000021" = HIVE
}

const HBD_NAI  = '@@000000013'
const HIVE_NAI = '@@000000021'
```

### `get_recent_trades` / `get_trade_history`

```ts
interface Trade {
  date: string          // ISO-8601, no trailing Z — must append 'Z' for Date parsing
  current_pays: HiveAsset
  open_pays: HiveAsset
  maker: string
  taker: string
}

interface GetRecentTradesParams {
  limit: number         // max 1000
}

interface GetRecentTradesResponse {
  trades: Trade[]
}

interface GetTradeHistoryParams {
  start: string         // ISO-8601 datetime (no Z)
  end: string
  limit: number         // max 1000; paginate by advancing start
}

interface GetTradeHistoryResponse {
  trades: Trade[]
}
```

**Pagination note:** `get_trade_history` returns up to `limit` trades starting at `start`. To paginate,
take the max `date` from the last batch, increment by 1 ms, and re-query. Loop until batch < limit
or cursor >= end.

### `get_ticker`

```ts
interface GetTickerResponse {
  latest: string           // last trade price as HIVE/HBD ratio string
  lowest_ask: string
  highest_bid: string
  percent_change: string   // signed, e.g. "-1.856..."
  hive_volume: HiveAsset   // 24h
  hbd_volume: HiveAsset    // 24h
}
```

### `get_volume`

```ts
interface GetVolumeResponse {
  hive_volume: HiveAsset
  hbd_volume: HiveAsset
}
```

### `get_order_book`

```ts
interface OrderBookEntry {
  order_price: {
    base: HiveAsset
    quote: HiveAsset
  }
  real_price: string   // decimal string, e.g. "0.04928000000000000"
  hive: number         // HIVE in the order (millis)
  hbd: number          // HBD in the order (millis)
  created: string      // ISO-8601, no Z
}

interface GetOrderBookParams {
  limit: number        // entries per side; observed max ~500
}

interface GetOrderBookResponse {
  bids: OrderBookEntry[]   // sorted descending by price (highest bid first)
  asks: OrderBookEntry[]   // sorted ascending by price (lowest ask first)
}
```

**Notes:**
- `bids` are buy orders — someone willing to pay HBD for HIVE. Sorted highest→lowest price.
- `asks` are sell orders — someone willing to sell HIVE for HBD. Sorted lowest→highest price.
- The spread is `asks[0].real_price - bids[0].real_price`.
- To build a depth chart: cumulate `hive` (or `hbd`) along each side.

**Empirically established limits (tested against `api.hive.blog` and `api.openhive.network`):**
- Maximum `limit` accepted by both `market_history_api.get_order_book` and `condenser_api.get_order_book` is **500 per side**.
- Requests with `limit` > 500 return 0 results on `api.hive.blog` (silent truncation, not an error).
- There is **no offset/pagination parameter** — the book cannot be paged beyond 500 per side.
- In practice the bid side is often well under 500 (observed ~183 bids); the ask side frequently hits the 500 cap.
- Asks at the cap boundary are typically ~30% above mid-market (observed last ask at 0.065 vs mid ~0.049), so the 500-entry window covers all liquid orders.
- `condenser_api.get_order_book` accepts a positional params array `[limit]` instead of an object; returns the same data and the same 500 cap.
- Payload for a full book (~683 orders) is approximately 150 KB JSON — suitable for a single fetch with no lazy loading required.

### `get_market_history_buckets`

```ts
interface GetMarketHistoryBucketsResponse {
  bucket_sizes: number[]  // seconds; observed: [15, 60, 300, 3600, 86400]
}
```

### `get_market_history` (OHLCV)

```ts
interface OHLCVSide {
  high: number    // millis
  low: number
  open: number
  close: number
  volume: number
}

interface MarketBucket {
  id: number
  open: string       // ISO-8601 bucket start, no Z
  seconds: number    // bucket size
  hive: OHLCVSide    // OHLCV in HIVE units (millis)
  non_hive: OHLCVSide  // OHLCV in HBD units (millis)
}

interface GetMarketHistoryParams {
  bucket_seconds: number  // must be one of the values from get_market_history_buckets
  start: string           // ISO-8601 datetime (no Z)
  end: string
}

interface GetMarketHistoryResponse {
  buckets: MarketBucket[]
}
```

**Notes:**
- `hive.close / non_hive.close` gives the close price in HBD-per-HIVE for that bucket.
- `hive.volume` and `non_hive.volume` are in millis — divide by 1000.
- OHLCV values within a bucket are in terms of individual *trade* amounts, not cumulative.

---

---

## 2. `database_api.list_limit_orders` — Superior Order Book Source

`market_history_api.get_order_book` does **not** include the order owner (seller). The complete
order book with account names comes from `database_api.list_limit_orders`, which is an existing
database API endpoint with no typed wrapper in pollen.

### Type definition

```ts
interface LimitOrder {
  id: number
  created: string      // ISO-8601, no Z
  expiration: string   // ISO-8601, no Z
  seller: string       // Hive account name — the order owner
  orderid: number      // seller-assigned order ID
  for_sale: number     // amount being sold, millis of base asset
  sell_price: {
    base: HiveAsset    // asset being sold
    quote: HiveAsset   // asset wanted in return
  }
}

interface ListLimitOrdersParams {
  start: [string, number]   // cursor: [seller_account, orderid] — use ["", 0] to start
  limit: number             // max 1000 per page
  order: 'by_account'       // only known working value; 'by_price' throws bad_cast_exception
}

interface ListLimitOrdersResponse {
  orders: LimitOrder[]
}
```

### Determining bid vs ask from `sell_price`

```ts
// ASK: selling HIVE for HBD — base is HIVE
const isAsk = order.sell_price.base.nai === HIVE_NAI
// price in HBD-per-HIVE:
const price = Number(order.sell_price.quote.amount) / Number(order.sell_price.base.amount)

// BID: selling HBD for HIVE — base is HBD
const isBid = order.sell_price.base.nai === HBD_NAI
// price in HBD-per-HIVE:
const price = Number(order.sell_price.base.amount) / Number(order.sell_price.quote.amount)
```

### Pagination

Cursor-based by `[seller, orderid]`. Start with `["", 0]`; after each page, use the last
order's `[seller, orderid]` as the next `start`. Loop until batch size < limit.

**Empirically established (tested 2026-06-19):**
- Total open orders on the Hive internal market: **~1349** (2 pages at limit=1000)
- `by_price` ordering throws `bad_cast_exception` — only `by_account` works reliably
- Full paginated fetch requires **2 API calls** and returns ~250 KB JSON
- Refetch interval of 15–30s is appropriate for a live order book display

### Why prefer `list_limit_orders` over `get_order_book`

| | `get_order_book` | `list_limit_orders` |
|---|---|---|
| Seller / account | ✗ | ✓ |
| Expiration | ✗ | ✓ |
| Complete book | ✗ (500/side cap) | ✓ (all ~1349 orders) |
| API calls | 1 | 2 (paginated) |
| Price field | `real_price` string | computed from `sell_price` |

### Proposed addition to `DatabaseHelper`

```ts
class DatabaseHelper {
  // ... existing methods ...
  listLimitOrders(params: ListLimitOrdersParams): Promise<ListLimitOrdersResponse>
}
```

Or as a standalone helper function since it is paginated by nature:

```ts
/** Fetches all open limit orders across the entire internal market. */
async function getAllLimitOrders(client: Client): Promise<LimitOrder[]>
```

---

## 3. `condenser_api.get_open_orders` — Per-Account Open Positions

Returns all currently open limit orders for a single account in one call. No pagination.

**IMPORTANT — `sell_price` format differs from `list_limit_orders`:** here `base` and `quote`
are human-readable strings (`"11089.628 HIVE"`), NOT `HiveAsset` objects. Same quirky format
as `fill_order` ops.

### Type definition

```ts
interface OpenOrder {
  id:         number
  created:    string    // ISO-8601, no Z
  expiration: string    // ISO-8601, no Z
  seller:     string
  orderid:    number
  for_sale:   number    // millis of REMAINING base asset (may be < original if partially filled)
  sell_price: {
    base:  string       // human-readable e.g. "11089.628 HIVE" — the ORIGINAL order amount
    quote: string       // human-readable e.g. "655.397 HBD"
  }
  real_price: string    // pre-computed HBD/HIVE decimal string
  rewarded:   boolean   // always false observed — legacy field, safe to ignore
}

type GetOpenOrdersResponse = OpenOrder[]   // positional result, not wrapped in an object

interface GetOpenOrdersParams {
  account: string
}
```

### Determining bid vs ask

```ts
// Parse human-readable asset string (same helper as fill_order)
function parseAsset(s: string): { amount: number; symbol: 'HIVE' | 'HBD' } {
  const [amount, symbol] = s.split(' ')
  return { amount: Number(amount), symbol: symbol as 'HIVE' | 'HBD' }
}

const base = parseAsset(order.sell_price.base)
const isAsk = base.symbol === 'HIVE'   // selling HIVE for HBD
const isBid = base.symbol === 'HBD'    // selling HBD for HIVE

// Use the provided real_price instead of computing — it's already there
const price = Number(order.real_price)  // HBD per HIVE
```

### Detecting partial fills

`sell_price.base` is the **original** order amount; `for_sale` is what remains:

```ts
const originalMillis = Math.round(parseAsset(order.sell_price.base).amount * 1000)
const filledPct = (1 - order.for_sale / originalMillis) * 100
const isPartiallyFilled = order.for_sale < originalMillis
```

Empirically confirmed: large orders that partially sweep the book show `for_sale` < `originalMillis`
(observed 3.5%–32.2% partial fills on active accounts).

### Comparison with `database_api.list_limit_orders`

| | `get_open_orders` | `list_limit_orders` |
|---|---|---|
| Scope | Single account | Whole market |
| `sell_price` format | Human-readable strings | `HiveAsset` objects |
| `real_price` | ✓ included | ✗ must compute |
| `rewarded` field | ✓ (always false) | ✗ |
| Pagination | None — single call | Required (~2 pages) |
| Use case | Per-account open positions | Full market order book |

### Proposed addition to pollen

```ts
// In condenser_api helper:
interface CondenserHelper {
  getOpenOrders(account: string): Promise<OpenOrder[]>
}
```

---

## 4. `condenser_api.get_account_history` — Per-Account Trade History

The source of truth for an account's internal market activity. `fill_order` virtual operations
are emitted into both the maker's and taker's account history when a limit order is matched.

### Type definitions

```ts
interface FillOrderOp {
  current_owner:   string   // taker — account whose order triggered the match
  current_orderid: number
  current_pays:    string   // human-readable asset string, e.g. "602.975 HIVE"
  open_owner:      string   // maker — account whose resting order was matched
  open_orderid:    number
  open_pays:       string   // e.g. "29.787 HBD"
}

interface AccountHistoryEntry {
  op:          [string, unknown]  // op[0] is the type name; use type guard to narrow
  block:       number
  trx_id:      string
  op_in_trx:   number
  timestamp:   string    // ISO-8601, no Z
  virtual_op:  boolean
}

// Narrow after fetching:
// if (entry.op[0] === 'fill_order') { const op = entry.op[1] as FillOrderOp ... }

// get_account_history returns an array of [index, AccountHistoryEntry] tuples
type AccountHistoryResult = [number, AccountHistoryEntry][]

interface GetAccountHistoryParams {
  account:     string
  start:       number   // operation index; -1 = most recent
  limit:       number   // max 1000
  filterLow?:  bigint   // bits 0–63 of operation filter mask — see OP constants and opFilter()
  filterHigh?: bigint   // bits 64+ of operation filter mask
  // ⚠️ Pass BigInt values — do NOT convert to Number before serialization (see Known Quirks §6)
}
```

**IMPORTANT — amount format differs from market_history_api:**
`fill_order` amounts are human-readable strings (`"602.975 HIVE"`), NOT millis integers.
This is inconsistent with every other market API. Parse them as:

```ts
function parseAsset(s: string): { amount: number; symbol: 'HIVE' | 'HBD' } {
  const [amount, symbol] = s.split(' ')
  return { amount: Number(amount), symbol: symbol as 'HIVE' | 'HBD' }
}

function fillOrderPrice(op: FillOrderOp): number {
  const cur = parseAsset(op.current_pays)
  const opn = parseAsset(op.open_pays)
  const hbd  = cur.symbol === 'HBD'  ? cur.amount : opn.amount
  const hive = cur.symbol === 'HIVE' ? cur.amount : opn.amount
  return hbd / hive   // HBD per HIVE
}
```

### Pagination

Walk backwards from `start = -1` using the lowest index seen minus 1 as the next `start`.
Stop when the batch is empty or you've reached your target date.

```ts
async function* accountFillOrders(client: Client, account: string) {
  let start = -1
  while (true) {
    const batch: AccountHistoryResult = await client.call(
      'condenser_api', 'get_account_history', [account, start, 1000]
    )
    if (!batch.length) break
    const fills = batch
      .filter(([, e]) => e.op[0] === 'fill_order')
      .map(([, e]) => e)
    yield* fills
    if (batch.length < 1000) break
    start = batch[0][0] - 1   // lowest index in this page, step back
  }
}
```

### Empirical findings (tested 2026-06-19)

**History depth and volume (sampled across 5 active accounts):**

| Account | Total ops | fill_order % | Est. total fills |
|---|---|---|---|
| steembasicincome | 2,246,441 | ~20% | ~460,000 |
| konvik-hbd | 9,246,029 | ~10% | ~915,000 |
| droida | 6,309,032 | ~2% | ~114,000 |
| vihan | 147,465 | ~34% | ~51,000 |
| econo | 1,664,667 | ~2% | ~33,000 |

- No server-side history cutoff — full history accessible back to account creation (2017 for oldest tested)
- 1 page (1000 ops) = ~382 KB JSON; ~383 bytes per fill_order entry
- Fill density varies 2–34% — a 1000-op page yields 20–340 fill entries depending on account type
- Full backfill of a bot account requires **2,000–9,000 API calls** — incremental sync is essential
- Active market accounts can have **10+ fills per second** when a large order sweeps the book
- `fill_order` appears in **both** maker and taker history — no deduplication needed for single-account
  queries; use `trx_id + op_in_trx` as composite key when joining across accounts
- Op filter bitmask for `fill_order` confirmed: **bit 57 = `2^57 = 144115188075855872`**
  Pass as `operation_filter_low` (4th param); `operation_filter_high = 0` (5th param).
  Each filtered page of 1000 returns only fill_order ops — no client-side discard needed.
- **⚠️ JavaScript serialization hazard:** `2^57` exceeds `Number.MAX_SAFE_INTEGER (2^53 - 1)`.
  Although `2^57` is exactly representable in IEEE 754 (pure power of 2), V8's float-to-string
  algorithm (Ryu) produces `144115188075855870` instead of `144115188075855872` — a difference
  of 2 that flips the bitmask from `0x200000000000000` to `0x1FFFFFFFFFFFFFFE`, making the
  filter completely wrong. Confirmed in IMV (2026-06-19): direct HTTP call with the correct
  decimal string works; `JSON.stringify(2 ** 57)` and `JSON.stringify(0x200000000000000)` both
  produce the wrong value. **Pollen must use BigInt-safe JSON serialization for filter params.**
  Until fixed, filter client-side with `op[0] === 'fill_order'` instead.

### Proposed addition to pollen

#### Operation filter bitmask constants

All bits empirically confirmed against live accounts (2026-06-19).
`?` = bit position inferred from protocol ordering but not yet confirmed live (rare ops, specific accounts needed).

```ts
/**
 * Bitmask constants for condenser_api.get_account_history operation filtering.
 * Pass as operation_filter_low (bits 0-63) and operation_filter_high (bits 64+).
 * Use BigInt throughout to avoid IEEE 754 precision loss on high bit positions.
 *
 * Build params:  const [low, high] = opFilter(OP.fill_order, OP.limit_order_create)
 */
export const OP = {
  // ── Regular operations (bits 0–49) ────────────────────────────────────────
  vote:                           1n <<  0n,  // ✅
  comment:                        1n <<  1n,  // ✅
  transfer:                       1n <<  2n,  // ✅
  transfer_to_vesting:            1n <<  3n,  // ✅
  withdraw_vesting:               1n <<  4n,  // ? (timeout on probe)
  limit_order_create:             1n <<  5n,  // ✅
  limit_order_cancel:             1n <<  6n,  // ✅
  feed_publish:                   1n <<  7n,  // ✅
  convert:                        1n <<  8n,  // ✅
  account_create:                 1n <<  9n,  // ✅
  account_update:                 1n << 10n,  // ✅
  witness_update:                 1n << 11n,  // ? (timeout on probe)
  account_witness_vote:           1n << 12n,  // ?
  account_witness_proxy:          1n << 13n,  // ✅
  custom:                         1n << 14n,  // ?
  pow:                            1n << 15n,  // ? (legacy mining op)
  report_over_production:         1n << 16n,  // ?
  delete_comment:                 1n << 17n,  // ✅
  custom_json:                    1n << 18n,  // ✅
  comment_options:                1n << 19n,  // ✅
  set_withdraw_vesting_route:     1n << 20n,  // ✅
  limit_order_create2:            1n << 21n,  // ?
  claim_account:                  1n << 22n,  // ✅
  create_claimed_account:         1n << 23n,  // ✅
  request_account_recovery:       1n << 24n,  // ?
  recover_account:                1n << 25n,  // ?
  change_recovery_account:        1n << 26n,  // ?
  escrow_transfer:                1n << 27n,  // ?
  escrow_dispute:                 1n << 28n,  // ?
  escrow_release:                 1n << 29n,  // ?
  escrow_approve:                 1n << 30n,  // ?
  transfer_to_savings:            1n << 32n,  // ✅ (gap at 31 = cancel_transfer_from_savings?)
  transfer_from_savings:          1n << 33n,  // ✅
  cancel_transfer_from_savings:   1n << 34n,  // ?
  custom_binary:                  1n << 35n,  // ?
  decline_voting_rights:          1n << 36n,  // ?
  reset_account:                  1n << 37n,  // ?
  set_reset_account:              1n << 38n,  // ?
  claim_reward_balance:           1n << 39n,  // ✅
  delegate_vesting_shares:        1n << 40n,  // ✅
  account_create_with_delegation: 1n << 41n,  // ✅
  witness_set_properties:         1n << 42n,  // ✅
  account_update2:                1n << 43n,  // ✅
  create_proposal:                1n << 44n,  // ✅
  update_proposal_votes:          1n << 45n,  // ✅
  remove_proposal:                1n << 46n,  // ?
  update_proposal:                1n << 47n,  // ?
  collateralized_convert:         1n << 48n,  // ✅
  recurrent_transfer:             1n << 49n,  // ✅

  // ── Virtual operations (bits 50+) ─────────────────────────────────────────
  fill_convert_request:                        1n << 50n,  // ✅
  author_reward:                               1n << 51n,  // ✅
  curation_reward:                             1n << 52n,  // ✅
  comment_reward:                              1n << 53n,  // ✅
  liquidity_reward:                            1n << 54n,  // ? (deprecated HF17)
  interest:                                    1n << 55n,  // ✅
  fill_vesting_withdraw:                       1n << 56n,  // ✅
  fill_order:                                  1n << 57n,  // ✅
  shutdown_witness:                            1n << 58n,  // ?
  fill_transfer_from_savings:                  1n << 59n,  // ✅
  hardfork:                                    1n << 60n,  // ?
  comment_payout_update:                       1n << 61n,  // ✅
  return_vesting_delegation:                   1n << 62n,  // ✅
  comment_benefactor_reward:                   1n << 63n,  // ✅

  // high-word virtual ops (use operation_filter_high)
  producer_reward:                             1n << 64n,  // ?
  clear_null_account_balance:                  1n << 65n,  // ?
  proposal_pay:                                1n << 66n,  // ✅
  sps_fund:                                    1n << 67n,  // ?
  hardfork_hive:                               1n << 68n,  // ?
  hardfork_hive_restore:                       1n << 69n,  // ?
  delayed_voting:                              1n << 70n,  // ✅
  consolidate_treasury_balance:                1n << 71n,  // ?
  effective_comment_vote:                      1n << 72n,  // ✅
  ineffective_delete_comment:                  1n << 73n,  // ?
  sps_convert:                                 1n << 74n,  // ?
  expired_account_notification:               1n << 75n,  // ?
  changed_recovery_account:                    1n << 76n,  // ✅
  transfer_to_vesting_completed:               1n << 77n,  // ✅
  pow_reward:                                  1n << 78n,  // ?
  vesting_shares_split:                        1n << 79n,  // ?
  account_created:                             1n << 80n,  // ✅
  fill_collateralized_convert_request:         1n << 81n,  // ✅
  system_warning:                              1n << 82n,  // ?
  fill_recurrent_transfer:                     1n << 83n,  // ✅
  failed_recurrent_transfer:                   1n << 84n,  // ✅
  limit_order_cancelled:                       1n << 85n,  // ✅
  producer_missed:                             1n << 86n,  // ✅
  proposal_fee:                                1n << 87n,  // ✅
  collateralized_convert_immediate_conversion: 1n << 88n,  // ✅
  escrow_approved:                             1n << 89n,  // ?
  escrow_rejected:                             1n << 90n,  // ?
  proxy_cleared:                               1n << 91n,  // ✅
  declined_voting_rights:                      1n << 92n,  // ?
} as const

export type OpFilterKey = keyof typeof OP

/**
 * Combines operation filter bigints into the [low, high] number pair
 * expected by condenser_api.get_account_history params 4 and 5.
 *
 * ⚠️ IMPORTANT — BigInt serialization: the low/high values must be serialized as exact
 * integer strings in the JSON-RPC body, NOT via JSON.stringify(Number(bigint)).
 * For bits ≥ 53, Number(bigint) loses precision and JSON.stringify produces the wrong decimal.
 * Pollen's call() must accept BigInt params and serialize them with a BigInt-aware replacer,
 * OR accept pre-serialized strings for filter params specifically.
 *
 * @example
 * const [low, high] = opFilter(OP.fill_order)
 * client.call('condenser_api', 'get_account_history', [account, -1, 1000, low, high])
 */
export function opFilter(...ops: bigint[]): [bigint, bigint] {
  const mask = ops.reduce((a, b) => a | b, 0n)
  return [
    mask & 0xFFFFFFFFFFFFFFFFn,  // bits 0–63
    mask >> 64n,                  // bits 64+
  ]
}

// Pollen's JSON serializer must handle BigInt params, e.g.:
// JSON.stringify(params, (_, v) => typeof v === 'bigint' ? v.toString() : v)
```

```ts
// In condenser_api helper or as a standalone utility:
interface CondenserHelper {
  getAccountHistory(
    account: string,
    start: number,
    limit: number,
    filterLow?: bigint,   // must stay bigint through to JSON serialization
    filterHigh?: bigint
  ): Promise<AccountHistoryResult>
}

// Convenience iterator for market history specifically:
async function* getAccountFillOrders(
  client: Client,
  account: string,
  since?: Date
): AsyncGenerator<AccountHistoryEntry>
```

---

## 5. Proposed Typed Helper Methods

Currently the pattern in userland is:

```ts
const res = await client.call<GetRecentTradesResponse>(
  'market_history_api', 'get_recent_trades', { limit: 1000 }
)
```

Suggested additions to a `MarketHistoryHelper` (parallel to the existing `DatabaseHelper`):

```ts
class MarketHistoryHelper {
  getRecentTrades(params: GetRecentTradesParams): Promise<GetRecentTradesResponse>
  getTradeHistory(params: GetTradeHistoryParams): Promise<GetTradeHistoryResponse>
  getTicker(): Promise<GetTickerResponse>
  getVolume(): Promise<GetVolumeResponse>
  getOrderBook(params: GetOrderBookParams): Promise<GetOrderBookResponse>
  getMarketHistoryBuckets(): Promise<GetMarketHistoryBucketsResponse>
  getMarketHistory(params: GetMarketHistoryParams): Promise<GetMarketHistoryResponse>
}
```

Accessible as `client.market` (analogous to `client.database`, `client.broadcast`).

---

## 6. Known Quirks to Document

- **No trailing Z on dates**: All date strings from the API (trade.date, bucket.open, order.created)
  are ISO-8601 but *without* the `Z` suffix. `new Date(date)` parses them as local time on some
  runtimes. Always append `'Z'`: `new Date(date + 'Z')`.

- **HBD NAI `@@000000013`, HIVE NAI `@@000000021`**: These should be exported as constants.

- **`amount` is a string of millis**: All `HiveAsset.amount` values are integer strings representing
  thousandths of the token. `Number(amount) * 0.001` to get display value.

- **Trade pagination is inclusive on both ends**: When paginating `get_trade_history`, the `start`
  timestamp is inclusive, so after advancing the cursor you must add 1 ms to avoid re-fetching the
  last trade of the previous page.

- **`fill_order` amounts are strings, not millis**: Unlike every other market API, `fill_order` op
  amounts are human-readable strings (`"602.975 HIVE"`) not integer millis. Parse with
  `s.split(' ')` → `[Number(amount), symbol]`. Do not apply `* 0.001`.

- **`fill_order` appears in both maker and taker history**: The same trade generates one virtual op
  in each party's account history. If joining across accounts, deduplicate on `trx_id + op_in_trx`.

- **`get_account_history` returns `[index, entry]` tuples**: The result is an array of 2-element
  arrays, not objects. Access as `batch[i][0]` (index) and `batch[i][1]` (entry). In PowerShell/JS
  `ConvertFrom-Json`, each item is a fixed-length array, not a keyed object.

- **Operation filter params must be serialized as BigInt, not Number**: `fill_order` is bit 57
  (`2^57 = 144115188075855872`), which exceeds `Number.MAX_SAFE_INTEGER`. Even though `2^57` is
  exactly representable in IEEE 754, V8's Ryu float-to-string algorithm produces `144115188075855870`
  — wrong by 2, which corrupts the bitmask entirely. `JSON.stringify(2**57)` and
  `JSON.stringify(0x200000000000000)` both produce the wrong value. Pollen must use a BigInt-aware
  JSON replacer: `(_, v) => typeof v === 'bigint' ? v.toString() : v`. Until fixed, filter
  client-side with `op[0] === 'fill_order'`. All ops at bit ≤ 52 are safe as Number.

---

## 7. This App as Reference Implementation

`src/types/hive.ts`, `src/lib/marketUtils.ts`, and `src/composables/` in this repo contain
working examples of all the above patterns:

- `useRecentTrades.ts` / `useTradeHistory.ts` — paginated trade history via `get_trade_history`
- `useOrderBook.ts` — complete order book with seller names via `list_limit_orders`
- `marketUtils.ts` — NAI constants, millis conversion, price computation for both bid/ask directions
- `useAccountFills.ts` — sequential paginated `get_account_history` with client-side `fill_order`
  filter, P&L accumulation, and TanStack Query integration
- `nodePool.ts` — resilient multi-node pool seeded from `nectarflower`'s live node metadata,
  with round-robin selection and per-node failure tracking/eviction. Pattern worth considering
  as a first-class pollen feature: `Client.fromNectarflower()` or a `NodePool` export.

---

## 8. Implementation Priority

For a fresh team, suggested order:

| Priority | Item | Blocking? | Status |
|---|---|---|---|
| 1 | BigInt-safe JSON serialization in `client.call()` | Blocks all filter usage | ✅ Done — `serializeRpcBody()` in `src/client.ts` |
| 2 | `OP` constants + `opFilter()` utility | Depends on #1 | ✅ Done — `src/chain/op-filter.ts` |
| 3 | `MarketHistoryHelper` typed wrapper class | Enhancement | ✅ Done — `MarketHistoryAPI` in `src/helpers/market.ts`, accessible as `client.market` |
| 4 | `DatabaseHelper.listLimitOrders()` | Enhancement | ✅ Done — `DatabaseAPI.listLimitOrders()` in `src/helpers/database.ts` |
| 5 | `CondenserHelper.getOpenOrders()` + `getAccountHistory()` | Enhancement | ✅ Done — `DatabaseAPI.getOpenOrders()` + updated `getAccountHistory()` with BigInt filter in `src/helpers/database.ts` |
| 6 | `Client.fromNectarflower()` / `NodePool` export | Enhancement | 🔲 Pending |

Items 3–6 can be done in any order and are independent of each other.
