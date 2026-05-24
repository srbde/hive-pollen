import { describe, it, expect } from "vitest";
import { Client, SignedBlock, AppliedOperation, BlockchainMode } from "../src/index.js";
import { bytesEqual, assert } from "../src/utils.js";

import { agent, TEST_NODE } from "./_common.js";

describe("blockchain", function () {
  const client = new Client(TEST_NODE, { agent });

  const expectedIds = [
    "0000000109833ce528d5bbfb3f6225b39ee10086",
    "00000002ed04e3c3def0238f693931ee7eebbdf1",
  ];
  const expectedOps = [
    "vote",
    "effective_comment_vote",
    "vote",
    "effective_comment_vote",
    "comment",
    "vote",
    "effective_comment_vote",
    "vote",
    "effective_comment_vote",
    "vote",
    "effective_comment_vote",
    "vote",
    "effective_comment_vote",
    "custom_json",
    "producer_reward",
    "comment_payout_update",
    "author_reward",
    "comment_reward",
    "comment_payout_update",
    "comment_payout_update",
    "comment_payout_update",
    "fill_vesting_withdraw",
    "comment",
    "comment",
    "vote",
    "effective_comment_vote",
    "vote",
    "effective_comment_vote",
    "vote",
    "effective_comment_vote",
    "vote",
    "effective_comment_vote",
    "comment",
    "custom_json",
    "custom_json",
    "custom_json",
    "custom_json",
    "claim_reward_balance",
    "custom_json",
    "vote",
    "effective_comment_vote",
    "comment",
    "comment_options",
    "custom_json",
    "vote",
    "effective_comment_vote",
    "producer_reward",
    "comment_payout_update",
    "comment_payout_update",
    "curation_reward",
    "author_reward",
    "comment_reward",
    "comment_payout_update",
    "comment_payout_update",
    "fill_vesting_withdraw",
  ];

  it("should yield blocks", async function () {
    let ids: string[] = [];
    for await (const block of client.blockchain.getBlocks({ from: 1, to: 2 })) {
      ids.push(block.block_id);
    }
    expect(ids).toEqual(expectedIds);
  }, 30000);

  it("should stream blocks", async function () {
    const stream = client.blockchain.getBlockStream({ from: 1, to: 2 });
    let ids: string[] = [];
    // @ts-ignore - ReadableStream is async iterable in Node 18+
    for await (const block of stream) {
      ids.push(block.block_id);
    }
    expect(ids).toEqual(expectedIds);
  }, 30000);

  it("should yield operations", async function () {
    let ops: string[] = [];
    for await (const operation of client.blockchain.getOperations({
      from: 13300000,
      to: 13300001,
    })) {
      ops.push(operation.op[0]);
    }
    expect(ops).toEqual(expectedOps);
  }, 30000);

  it("should stream operations", async function () {
    const stream = client.blockchain.getOperationsStream({
      from: 13300000,
      to: 13300001,
    });
    let ops: string[] = [];
    // @ts-ignore - ReadableStream is async iterable in Node 18+
    for await (const operation of stream) {
      ops.push(operation.op[0]);
    }
    expect(ops).toEqual(expectedOps);
  }, 30000);

  it("should handle errors on stream", async function () {
    const stream = client.blockchain.getBlockStream(Number.MAX_VALUE);
    let sawError = false;
    try {
      // @ts-ignore
      for await (const _ of stream) {
        expect(false).toBe(true); // Should not reach here
      }
    } catch (error) {
      sawError = true;
    }
    expect(sawError).toBe(true);
  });

  it("should get block number stream", async function () {
    const current = await client.blockchain.getCurrentBlockNum();
    const stream = client.blockchain.getBlockNumberStream();
    // @ts-ignore
    const reader = stream.getReader();
    const { value: num } = await reader.read();
    expect(num).toBeGreaterThanOrEqual(current);
    await reader.cancel();
  });

  it("should get current block header", async function () {
    const now = Date.now();
    const header = await client.blockchain.getCurrentBlockHeader();
    const ts = new Date(header.timestamp + "Z").getTime();
    expect(Math.abs(ts / 1000 - now / 1000)).toBeLessThan(120);
  });
});
