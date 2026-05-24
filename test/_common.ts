import { describe, it, beforeAll, beforeEach, afterAll, afterEach, expect, vi } from "vitest";
import * as fs from "fs";
import * as https from "https";
import { randomBytes } from "crypto";
import { Client, PrivateKey } from "../src/index.js";

export const NUM_TEST_ACCOUNTS = 2;
export const IS_BROWSER = (global as any)["isBrowser"] === true;
export const TEST_NODE = process.env["TEST_NODE"] || "https://api.hive.blog";

export const agent = IS_BROWSER ? undefined : new https.Agent({ keepAlive: true });

let testAccounts: { username: string; password: string }[] | undefined;

export function randomString(length: number) {
  return randomBytes(length * 2)
    .toString("base64")
    .replace(/[^0-9a-z]+/gi, "")
    .slice(0, length)
    .toLowerCase();
}

export async function createAccount(): Promise<{
  username: string;
  password: string;
}> {
  const password = randomString(32);
  const username = `pollen-${randomString(9)}`;

  // Create testnet account and delegate to it
  const client = Client.testnet({ agent });
  const ops = {
    creator: "initminer",
    username,
    password,
  };
  const key = PrivateKey.from("5JNHfZYKGaomSFvd4NUdQ9qMcEAC43kujbfjueTHpVapX1Kzq2n");

  try {
    await client.broadcast.createTestAccount(ops, key);
    await client.broadcast.sendOperations(
      [
        [
          "transfer_to_vesting",
          {
            amount: "100000.000 HIVE",
            from: "initminer",
            to: username,
          },
        ],
      ],
      key,
    );
    return { username, password };
  } catch (error: any) {
    console.warn(`FAILED TO CREATE TEST ACCOUNT ${username}: ${error.message}`);
    return null as any;
  }
}

export async function getTestnetAccounts(): Promise<{ username: string; password: string }[]> {
  if (testAccounts) {
    return testAccounts;
  }

  let rv: { username: string; password: string }[] = [];
  try {
    while (rv.length < NUM_TEST_ACCOUNTS) {
      const acc = await createAccount();
      if (acc) {
        rv.push(acc);
      } else {
        break; // Stop if we can't create accounts (e.g. out of RC)
      }
    }
    testAccounts = rv;
    if (console && console.log) {
      console.log(`CREATED TESTNET ACCOUNTS: ${rv.map((i) => i.username)}`);
    }
  } catch (e: any) {
    console.warn("FAILED TO GET TESTNET ACCOUNTS");
  }
  return rv;
}
