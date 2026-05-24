import { describe, it, beforeAll, beforeEach, afterAll, afterEach, expect, vi } from "vitest";
import assert from "assert";

import { Client } from "../src/index.js";
import { agent } from "./_common.js";

describe("account_by_key_api", function () {
  const client = new Client("https://api.hive.blog", { agent });

  it("get_key_references", async () => {
    const result = await client.keys.getKeyReferences([
      "STM65PUAPA4yC4RgPtGgsPupxT6yJtMhmT5JHFdsT3uoCbR8WJ25s",
    ]);
    assert.deepEqual(result, { accounts: [["hiveio"]] });
  }, 30000);
});
