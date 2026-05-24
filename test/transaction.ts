import { describe, it, beforeAll, beforeEach, afterAll, afterEach, expect, vi } from "vitest";
import assert from "assert";

import { Client } from "../src/index.js";
import { agent } from "./_common.js";

describe("transaction_status_api", function () {
  const client = new Client("https://api.hive.blog", { agent });

  describe("find_transaction", () => {
    it("should return unknown", async () => {
      const { status } = await client.transaction.findTransaction(
        "0000000000000000000000000000000000000000",
      );
      assert.deepEqual(status, "unknown");
    });

    it("should return too_old", async () => {
      const { status } = await client.transaction.findTransaction(
        "0000000000000000000000000000000000000000",
        "2016-03-24T18:00:21",
      );
      assert.deepEqual(status, "too_old");
    });
  });
});
