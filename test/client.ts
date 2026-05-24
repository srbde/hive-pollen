import { describe, it, beforeAll, beforeEach, afterAll, afterEach, expect, vi } from "vitest";
import assert from "assert";
import { Client, utils } from "../src/index.js";

describe("client", function () {
  const client = Client.testnet();
  const aclient = client as any;

  // TODO: change api.hive.blog to testnet
  it("should handle failover", async () => {
    const bclient = new Client(["https://wrongapi.hive.blog", "https://api.hive.blog"], {
      timeout: 5000,
    });
    const result = await bclient.call("condenser_api", "get_accounts", [["initminer"]]);
    assert.equal(result.length, 1);
    assert.equal(result[0].name, "initminer");
  }, 30000);

  it("should make rpc call", async function () {
    const result = (await client.call("condenser_api", "get_accounts", [["initminer"]])) as any[];
    assert.equal(result.length, 1);
    assert.equal(result[0].name, "initminer");
  }, 30000);

  it("should handle rpc errors", async function () {
    try {
      await client.call("condenser_api", "i_like_turtles");
      assert(false, "should not be reached");
    } catch (error: any) {
      assert.equal(error.name, "RPCError");
      assert(
        error.message.includes(`no method with name 'i_like_turtles'`) || // pre-appbase
          error.message.includes(`Could not find method i_like_turtles`),
      ); // appbase

      const info = (error as any).info;
      assert(info.code === 10 || info.code === 4030100 || info.code === 4100100);
      assert(
        info.name === "assert_exception" ||
          info.name === "not_enough_rc_exception" ||
          info.name === "tx_missing_expiration" ||
          info.name === "transaction_expiration_exception",
      );
    }
  }, 30000);

  it("should format rpc errors", async function () {
    const tx = { operations: [["witness_update", {}]] };
    try {
      await client.call("condenser_api", "broadcast_transaction", [tx]);
      assert(false, "should not be reached");
    } catch (error: any) {
      // If the node is down, we might get a FetchError instead of RPCError
      if (error.name === "FetchError") {
        console.warn("Skipping format rpc errors test due to node connectivity issues");
        return;
      }
      assert.equal(error.name, "RPCError");
      assert(
        error.message.includes("is_valid_account_name") ||
          error.message.includes("Account name") ||
          error.message.includes("expiration"),
      );
      const info = (error as any).info;
      assert(info.code === 10 || info.code === 4030100 || info.code === 4100100);
      assert(
        info.name === "assert_exception" ||
          info.name === "not_enough_rc_exception" ||
          info.name === "tx_missing_expiration" ||
          info.name === "transaction_expiration_exception",
      );
    }
  }, 30000);

  // bs, needs rework
  // it("should retry and timeout", async function() {
  //
  //   aclient.timeout = 1000;
  //   aclient.address = "https://jnordberg.github.io/pollen/FAIL";
  //   const backoff = aclient.backoff;
  //   let seenBackoff = false;
  //   aclient.backoff = tries => {
  //     seenBackoff = true;
  //     return backoff(tries);
  //   };
  //   const tx = { operations: [["witness_update", {}]] };
  //   try {
  //     await client.database.getChainProperties();
  //     assert(false, "should not be reached");
  //   } catch (error: any) {
  //     assert(seenBackoff, "should have seen backoff");
  //   }
  // });
});
