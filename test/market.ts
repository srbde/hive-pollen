import { describe, it, expect } from "vitest";
import assert from "assert";
import { Client, OP, opFilter } from "../src/index.js";
import { TEST_NODE, agent } from "./_common.js";

describe("market history api and database helpers", () => {
  const client = new Client(TEST_NODE, { agent });

  it("getTicker", async () => {
    const ticker = await client.market.getTicker();
    assert(ticker);
    assert(typeof ticker.latest === "string");
    assert(typeof ticker.lowest_ask === "string");
    assert(typeof ticker.highest_bid === "string");
    assert(typeof ticker.percent_change === "string");
    assert(ticker.hive_volume && typeof ticker.hive_volume.amount === "string");
    assert(ticker.hbd_volume && typeof ticker.hbd_volume.amount === "string");
  }, 30000);

  it("getVolume", async () => {
    const volume = await client.market.getVolume();
    assert(volume);
    assert(volume.hive_volume && typeof volume.hive_volume.amount === "string");
    assert(volume.hbd_volume && typeof volume.hbd_volume.amount === "string");
  }, 30000);

  it("getOrderBook", async () => {
    const book = await client.market.getOrderBook({ limit: 5 });
    assert(book);
    assert(Array.isArray(book.bids));
    assert(Array.isArray(book.asks));
    if (book.bids.length > 0) {
      const bid = book.bids[0];
      assert(bid.order_price);
      assert(typeof bid.real_price === "string");
      assert(typeof bid.hive === "number");
      assert(typeof bid.hbd === "number");
    }
  }, 30000);

  it("getRecentTrades", async () => {
    const res = await client.market.getRecentTrades({ limit: 5 });
    assert(res);
    assert(Array.isArray(res.trades));
    if (res.trades.length > 0) {
      const trade = res.trades[0];
      assert(typeof trade.date === "string");
      assert(trade.current_pays);
      assert(trade.open_pays);
    }
  }, 30000);

  it("getTradeHistory", async () => {
    const end = new Date();
    const start = new Date(end.getTime() - 10 * 60 * 1000); // 10 minutes ago
    const startStr = start.toISOString().substring(0, 19);
    const endStr = end.toISOString().substring(0, 19);

    const res = await client.market.getTradeHistory({
      start: startStr,
      end: endStr,
      limit: 5,
    });
    assert(res);
    assert(Array.isArray(res.trades));
  }, 30000);

  it("getMarketHistoryBuckets", async () => {
    const res = await client.market.getMarketHistoryBuckets();
    assert(res);
    assert(Array.isArray(res.bucket_sizes));
    assert(res.bucket_sizes.length > 0);
  }, 30000);

  it("getMarketHistory", async () => {
    const end = new Date();
    const start = new Date(end.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    const startStr = start.toISOString().substring(0, 19);
    const endStr = end.toISOString().substring(0, 19);

    const res = await client.market.getMarketHistory({
      bucket_seconds: 3600,
      start: startStr,
      end: endStr,
    });
    assert(res);
    assert(Array.isArray(res.buckets));
  }, 30000);

  it("listLimitOrders", async () => {
    const res = await client.database.listLimitOrders({
      start: ["", 0],
      limit: 5,
      order: "by_account",
    });
    assert(res);
    assert(Array.isArray(res.orders));
    if (res.orders.length > 0) {
      const order = res.orders[0];
      assert(typeof order.id === "number");
      assert(typeof order.seller === "string");
      assert(order.sell_price);
    }
  }, 30000);

  it("getOpenOrders", async () => {
    const res = await client.database.getOpenOrders("konvik-hbd");
    assert(res);
    assert(Array.isArray(res));
    if (res.length > 0) {
      const order = res[0];
      assert(typeof order.id === "number");
      assert(typeof order.seller === "string");
      assert(order.sell_price);
      assert(typeof order.real_price === "string");
    }
  }, 30000);

  it("getAccountHistory with opFilter", async () => {
    const [low, high] = opFilter(OP.fill_order);
    expect(low).toBe(144115188075855872n);
    expect(high).toBe(0n);

    // Fetch history using filter
    const history = await client.database.getAccountHistory("konvik-hbd", -1, 10, [low, high]);
    assert(history);
    assert(Array.isArray(history));
    for (const [, entry] of history) {
      expect(entry.op[0]).toBe("fill_order");
    }
  }, 30000);
});
