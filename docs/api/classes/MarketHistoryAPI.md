[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / MarketHistoryAPI

# Class: MarketHistoryAPI

Defined in: [src/helpers/market.ts:172](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L172)

Typed wrapper for the Hive `market_history_api`.

## Remarks

Accessible as `client.market`. All date strings returned by this API lack a
trailing `Z` — append it before constructing a `Date`: `new Date(date + 'Z')`.
All `HiveAsset.amount` values are integer millis strings; divide by 1000 for
display values.

## Example

```ts
import { Client } from '@srbde/pollen'

const client = new Client('https://api.hive.blog')
const ticker = await client.market.getTicker()
console.log(`HIVE/HBD: ${ticker.latest}`)
```

## Constructors

### Constructor

> **new MarketHistoryAPI**(`client`): `MarketHistoryAPI`

Defined in: [src/helpers/market.ts:173](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L173)

#### Parameters

##### client

[`Client`](Client.md)

#### Returns

`MarketHistoryAPI`

## Properties

### client

> `readonly` **client**: [`Client`](Client.md)

Defined in: [src/helpers/market.ts:173](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L173)

## Methods

### call()

> **call**\<`T`\>(`method`, `params?`): `Promise`\<`T`\>

Defined in: [src/helpers/market.ts:175](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L175)

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### method

`string`

##### params?

`unknown`

#### Returns

`Promise`\<`T`\>

***

### getMarketHistory()

> **getMarketHistory**(`params`): `Promise`\<[`GetMarketHistoryResponse`](../interfaces/GetMarketHistoryResponse.md)\>

Defined in: [src/helpers/market.ts:286](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L286)

Returns OHLCV candles for a time range at a given bucket size.

#### Parameters

##### params

[`GetMarketHistoryParams`](../interfaces/GetMarketHistoryParams.md)

`bucket_seconds` must be one of the values from
[getMarketHistoryBuckets](#getmarkethistorybuckets). `start` and `end` are ISO-8601 without Z.

#### Returns

`Promise`\<[`GetMarketHistoryResponse`](../interfaces/GetMarketHistoryResponse.md)\>

#### Remarks

Close price in HBD-per-HIVE: `bucket.hive.close / bucket.non_hive.close`.
Volume values are millis — divide by 1000.

#### Example

```ts
const { buckets } = await client.market.getMarketHistory({
  bucket_seconds: 3600,
  start: '2024-01-01T00:00:00',
  end:   '2024-01-02T00:00:00'
})
```

***

### getMarketHistoryBuckets()

> **getMarketHistoryBuckets**(): `Promise`\<[`GetMarketHistoryBucketsResponse`](../interfaces/GetMarketHistoryBucketsResponse.md)\>

Defined in: [src/helpers/market.ts:264](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L264)

Returns the available OHLCV bucket sizes supported by this node.

#### Returns

`Promise`\<[`GetMarketHistoryBucketsResponse`](../interfaces/GetMarketHistoryBucketsResponse.md)\>

#### Example

```ts
const { bucket_sizes } = await client.market.getMarketHistoryBuckets()
// [15, 60, 300, 3600, 86400]
```

***

### getOrderBook()

> **getOrderBook**(`params`): `Promise`\<[`GetOrderBookResponse`](../interfaces/GetOrderBookResponse.md)\>

Defined in: [src/helpers/market.ts:251](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L251)

Returns the current order book up to `limit` entries per side.

#### Parameters

##### params

[`GetOrderBookParams`](../interfaces/GetOrderBookParams.md)

`limit` per side, maximum 500. Requests above 500 return
0 results (silent truncation). There is no pagination beyond 500/side.

#### Returns

`Promise`\<[`GetOrderBookResponse`](../interfaces/GetOrderBookResponse.md)\>

#### Example

```ts
const { bids, asks } = await client.market.getOrderBook({ limit: 500 })
const spread = Number(asks[0].real_price) - Number(bids[0].real_price)
```

***

### getRecentTrades()

> **getRecentTrades**(`params`): `Promise`\<[`GetRecentTradesResponse`](../interfaces/GetRecentTradesResponse.md)\>

Defined in: [src/helpers/market.ts:189](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L189)

Returns the most recent trades on the internal market.

#### Parameters

##### params

[`GetRecentTradesParams`](../interfaces/GetRecentTradesParams.md)

`limit` up to 1000.

#### Returns

`Promise`\<[`GetRecentTradesResponse`](../interfaces/GetRecentTradesResponse.md)\>

#### Example

```ts
const { trades } = await client.market.getRecentTrades({ limit: 100 })
```

***

### getTicker()

> **getTicker**(): `Promise`\<[`GetTickerResponse`](../interfaces/GetTickerResponse.md)\>

Defined in: [src/helpers/market.ts:223](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L223)

Returns current ticker data for the HIVE/HBD internal market.

#### Returns

`Promise`\<[`GetTickerResponse`](../interfaces/GetTickerResponse.md)\>

#### Example

```ts
const ticker = await client.market.getTicker()
console.log(ticker.latest, ticker.percent_change)
```

***

### getTradeHistory()

> **getTradeHistory**(`params`): `Promise`\<[`GetTradeHistoryResponse`](../interfaces/GetTradeHistoryResponse.md)\>

Defined in: [src/helpers/market.ts:210](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L210)

Returns trades between two timestamps.

#### Parameters

##### params

[`GetTradeHistoryParams`](../interfaces/GetTradeHistoryParams.md)

`start`, `end` as ISO-8601 strings without Z, `limit` up to 1000.

#### Returns

`Promise`\<[`GetTradeHistoryResponse`](../interfaces/GetTradeHistoryResponse.md)\>

#### Remarks

To paginate, take the maximum `date` from the last batch, append 1 ms, and
re-query. Loop until batch size < limit or cursor >= end.

#### Example

```ts
const { trades } = await client.market.getTradeHistory({
  start: '2024-01-01T00:00:00',
  end:   '2024-01-02T00:00:00',
  limit: 1000
})
```

***

### getVolume()

> **getVolume**(): `Promise`\<[`GetVolumeResponse`](../interfaces/GetVolumeResponse.md)\>

Defined in: [src/helpers/market.ts:235](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/market.ts#L235)

Returns 24-hour HIVE and HBD trading volume.

#### Returns

`Promise`\<[`GetVolumeResponse`](../interfaces/GetVolumeResponse.md)\>

#### Example

```ts
const { hive_volume, hbd_volume } = await client.market.getVolume()
```
