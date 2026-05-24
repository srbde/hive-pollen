import { describe, it, beforeAll, beforeEach, afterAll, afterEach, expect, vi } from "vitest";
import assert from "assert";

import { Client, Asset, Transaction, PrivateKey } from "../src/index.js";
import { getTestnetAccounts, randomString, agent, TEST_NODE } from "./_common.js";

describe("database api", function () {
  const client = Client.testnet({ agent });
  let serverConfig: { [key: string]: boolean | string | number };
  const liveClient = new Client(TEST_NODE, { agent });

  let acc: { username: string; password: string };
  beforeAll(async function () {
    try {
      const accounts = await getTestnetAccounts();
      if (accounts && accounts.length > 0) {
        acc = accounts[0];
      }
    } catch (e: any) {
      console.warn("Skipping testnet account setup in database tests");
    }
  });

  it("getDynamicGlobalProperties", async function () {
    const result = await liveClient.database.getDynamicGlobalProperties();
    const keys = Object.keys(result);
    assert(keys.includes("head_block_number"));
    assert(keys.includes("head_block_id"));
    assert(keys.includes("time"));
    assert(keys.includes("current_witness"));
  }, 30000);

  it("getConfig", async function () {
    const result = await liveClient.database.getConfig();
    // HIVE_ config stuff here
    const r = (key: string) => result["HIVE_" + key];
    serverConfig = result;
    assert.equal(r("CREATE_ACCOUNT_WITH_HIVE_MODIFIER"), 30);
    assert.equal(r("CREATE_ACCOUNT_DELEGATION_RATIO"), 5);
    assert.equal(r("100_PERCENT"), 10000);
    assert.equal(r("1_PERCENT"), 100);

    const version = await liveClient.call("database_api", "get_version", {});
  }, 30000);

  it("getBlockHeader", async function () {
    const result = await liveClient.database.getBlockHeader(1);
    assert.equal("0000000000000000000000000000000000000000", result.previous);
  }, 30000);

  it("getBlock", async function () {
    const result = await liveClient.database.getBlock(1);
    assert.equal("0000000000000000000000000000000000000000", result.previous);
  }, 30000);

  it("getOperations", async function () {
    const result = await liveClient.database.getOperations(1);
    assert(result.length >= 1);
    assert(result[0].op[0] === "producer_reward" || result[0].op[0] === "account_created");
  }, 30000);

  it("getDiscussions", async function () {
    const r1 = await liveClient.database.getDiscussions("comments", {
      start_author: "almost-digital",
      start_permlink:
        "re-pal-re-almost-digital-dsteem-a-strongly-typed-steem-client-library-20170702t131034262z",
      limit: 1,
    });
    assert.equal(r1.length, 1);
    assert(r1[0].body.length > 0);
  }, 30000);

  it("getTransaction", async function () {
    const tx = await liveClient.database.getTransaction("c20a84c8a12164e1e0750f0ee5d3c37214e2f073");
    assert.deepEqual(tx.signatures, [
      "201e02e8daa827382b1a3aefb6809a4501eb77aa813b705be4983d50d74c66432529601e5ae43981dcba2a7e171de5fd75be2e1820942260375d2daf647df2ccaa",
    ]);
    try {
      await liveClient.database.getTransaction("11c20a84c8a12164e1e0750f0ee5d3c37214e2f073");
      assert(false, "should not be reached");
    } catch (error: any) {
      assert(error.message.includes("11c20a84c8a12164e1e0750f0ee5d3c37214e2f073"));
    }
  }, 30000);

  it("getChainProperties", async function () {
    const props = await liveClient.database.getChainProperties();
    assert.equal(Asset.from(props.account_creation_fee).symbol, "HIVE");
  }, 30000);

  it("getCurrentMedianHistoryPrice", async function () {
    const price = await liveClient.database.getCurrentMedianHistoryPrice();
    assert.equal(Asset.from(price.base).symbol, "HBD");
    assert.equal(price.quote.symbol, "HIVE");
  }, 30000);

  // this tests for delegations from the steem account
  it("getVestingDelegations", async function () {
    const [delegation] = await liveClient.database.getVestingDelegations("mahdiyari", "", 1);
    if (!delegation) {
      return;
    }
    assert.equal(delegation.delegator, "mahdiyari");
    assert.equal(typeof delegation.id, "number");
    assert.equal(Asset.from(delegation.vesting_shares).symbol, "VESTS");
  }, 30000);

  it("verifyAuthority", async function () {
    if (!acc) {
      console.warn("Skipping verifyAuthority test due to missing testnet account");
      return;
    }
    const tx: Transaction = {
      ref_block_num: 0,
      ref_block_prefix: 0,
      expiration: "2000-01-01T00:00:00",
      operations: [
        [
          "custom_json",
          {
            required_auths: [],
            required_posting_auths: [acc.username],
            id: "rpc-params",
            json: '{"foo": "bar"}',
          },
        ],
      ],
      extensions: [],
    };
    const key = PrivateKey.fromLogin(acc.username, acc.password, "posting");

    const stx = client.broadcast.sign(tx, key);
    const rv = await client.database.verifyAuthority(stx);
    assert(rv === true);
  }, 30000);
});
