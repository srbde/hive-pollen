/**
 * @file Hive blockchain helpers.
 * @author Johan Nordberg <code@johan-nordberg.com>
 * @license
 * Copyright (c) 2017 Johan Nordberg. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * You acknowledge that this software is not designed, licensed or intended for use
 * in the design, construction, operation or maintenance of any military facility.
 */

import { Client } from "./../client.js";
import { iteratorStream, sleep } from "./../utils.js";

export enum BlockchainMode {
  /**
   * Stream only blocks that the Hive consensus protocol has made irreversible.
   *
   * @remarks
   * This is the safest mode for indexing, accounting, and other workflows that
   * must not react to a block that can still be replaced by a fork.
   */
  Irreversible,
  /**
   * Stream from the latest head block, including blocks that are still reversible.
   *
   * @remarks
   * Use this mode when low latency matters more than finality. Applications
   * should be prepared to reconcile forked blocks when consuming latest mode.
   */
  Latest,
}

/**
 * Controls the block range and finality policy used by blockchain streams.
 *
 * @example
 * ```ts
 * import { BlockchainMode, Client } from '@srbde/pollen'
 *
 * const client = new Client('https://api.hive.blog')
 *
 * for await (const block of client.blockchain.getBlocks({
 *   from: 90_000_000,
 *   to: 90_000_010,
 *   mode: BlockchainMode.Irreversible
 * })) {
 *   console.log(block.block_id)
 * }
 * ```
 */
export interface BlockchainStreamOptions {
  /**
   * Start block number, inclusive. If omitted generation will start from current block height.
   */
  from?: number;
  /**
   * End block number, inclusive. If omitted stream will continue indefinitely.
   */
  to?: number;
  /**
   * Streaming mode, if set to `Latest` may include blocks that are not applied to the final chain.
   * Defaults to `Irreversible`.
   */
  mode?: BlockchainMode;
}

/**
 * Convenience helper for reading Hive blocks and operations as async iterators
 * or Node streams.
 *
 * @remarks
 * `Blockchain` builds on {@link DatabaseAPI} and adds polling, block-number
 * range management, and finality selection. It is the preferred entry point for
 * indexers and Resilience-style background workers that need a steady feed of
 * blocks or operations without hand-writing polling loops.
 *
 * @example
 * ```ts
 * import { Client } from '@srbde/pollen'
 *
 * const client = new Client('https://api.hive.blog')
 *
 * for await (const op of client.blockchain.getOperations({ from: 90_000_000 })) {
 *   console.log(op.op[0], op.trx_id)
 * }
 * ```
 *
 * @see {@link BlockchainStreamOptions}
 * @see {@link DatabaseAPI.getBlock}
 */
export class Blockchain {
  /**
   * Creates a blockchain helper bound to a client.
   *
   * @param client - Client used for database API reads.
   */
  constructor(readonly client: Client) {}

  /**
   * Resolves the current block number for the selected finality mode.
   *
   * @param mode - Whether to read the irreversible block number or the latest
   * head block number.
   * @returns The current Hive block number for the selected mode.
   *
   * @throws RPCError
   * Thrown when the underlying `get_dynamic_global_properties` call fails.
   *
   * @example
   * ```ts
   * const irreversible = await client.blockchain.getCurrentBlockNum()
   * const latest = await client.blockchain.getCurrentBlockNum(BlockchainMode.Latest)
   * ```
   */
  public async getCurrentBlockNum(mode = BlockchainMode.Irreversible) {
    const props = await this.client.database.getDynamicGlobalProperties();
    switch (mode) {
      case BlockchainMode.Irreversible:
        return props.last_irreversible_block_num;
      case BlockchainMode.Latest:
        return props.head_block_number;
    }
  }

  /**
   * Fetches the current block header for the selected finality mode.
   *
   * @param mode - Optional finality mode. Defaults to irreversible blocks.
   * @returns The Hive block header at the resolved current block number.
   *
   * @throws RPCError
   * Thrown when the RPC node rejects either the properties or block-header call.
   *
   * @example
   * ```ts
   * const header = await client.blockchain.getCurrentBlockHeader()
   * console.log(header.timestamp)
   * ```
   */
  public async getCurrentBlockHeader(mode?: BlockchainMode) {
    return this.client.database.getBlockHeader(await this.getCurrentBlockNum(mode));
  }

  /**
   * Fetches the current block for the selected finality mode.
   *
   * @param mode - Optional finality mode. Defaults to irreversible blocks.
   * @returns The signed block at the resolved current block number.
   *
   * @throws RPCError
   * Thrown when the RPC node rejects either the properties or block call.
   *
   * @example
   * ```ts
   * const block = await client.blockchain.getCurrentBlock()
   * console.log(block.transactions.length)
   * ```
   */
  public async getCurrentBlock(mode?: BlockchainMode) {
    return this.client.database.getBlock(await this.getCurrentBlockNum(mode));
  }

  /**
   * Creates an async iterator that yields block numbers as they become available.
   *
   * @param options - Stream options, or a block number shorthand for `from`.
   * @returns An async iterable of monotonically increasing block numbers.
   *
   * @remarks
   * The iterator polls every three seconds, matching Hive block cadence. When
   * `to` is omitted it continues indefinitely; when `from` is omitted it starts
   * from the current block height for the selected mode.
   *
   * @throws Error
   * Thrown when `from` is greater than the current block number.
   * @throws RPCError
   * Thrown when polling dynamic global properties fails.
   *
   * @example
   * ```ts
   * for await (const blockNum of client.blockchain.getBlockNumbers({
   *   from: 90_000_000,
   *   to: 90_000_005
   * })) {
   *   console.log(blockNum)
   * }
   * ```
   */
  public async *getBlockNumbers(options?: BlockchainStreamOptions | number) {
    // const config = await this.client.database.getConfig()
    // const interval = config['BLOCK_INTERVAL'] as number
    const interval = 3;
    if (!options) {
      options = {};
    } else if (typeof options === "number") {
      options = { from: options };
    }
    let current = await this.getCurrentBlockNum(options.mode);
    if (options.from !== undefined && options.from > current) {
      throw new Error(`From can't be larger than current block num (${current})`);
    }
    let seen = options.from !== undefined ? options.from : current;
    while (true) {
      while (current > seen) {
        yield seen++;
        if (options.to !== undefined && seen > options.to) {
          return;
        }
      }
      await sleep(interval * 1000);
      current = await this.getCurrentBlockNum(options.mode);
    }
  }

  /**
   * Creates a Node readable stream of block numbers.
   *
   * @param options - Same options accepted by {@link getBlockNumbers}.
   * @returns A stream backed by the async block-number iterator.
   *
   * @example
   * ```ts
   * const stream = client.blockchain.getBlockNumberStream(90_000_000)
   * stream.on('data', (blockNum) => console.log(blockNum))
   * ```
   */
  public getBlockNumberStream(options?: BlockchainStreamOptions | number) {
    return iteratorStream(this.getBlockNumbers(options));
  }

  /**
   * Creates an async iterator that yields full signed blocks.
   *
   * @param options - Same options accepted by {@link getBlockNumbers}.
   * @returns An async iterable of Hive signed blocks.
   *
   * @throws RPCError
   * Thrown when block-number polling or block retrieval fails.
   *
   * @example
   * ```ts
   * for await (const block of client.blockchain.getBlocks(90_000_000)) {
   *   console.log(block.witness, block.transactions.length)
   * }
   * ```
   */
  public async *getBlocks(options?: BlockchainStreamOptions | number) {
    for await (const num of this.getBlockNumbers(options)) {
      yield await this.client.database.getBlock(num);
    }
  }

  /**
   * Creates a Node readable stream of full signed blocks.
   *
   * @param options - Same options accepted by {@link getBlockNumbers}.
   * @returns A stream backed by the async block iterator.
   *
   * @example
   * ```ts
   * client.blockchain
   *   .getBlockStream({ from: 90_000_000 })
   *   .on('data', (block) => console.log(block.block_id))
   * ```
   */
  public getBlockStream(options?: BlockchainStreamOptions | number) {
    return iteratorStream(this.getBlocks(options));
  }

  /**
   * Creates an async iterator that yields applied operations from each block.
   *
   * @param options - Same options accepted by {@link getBlockNumbers}.
   * @returns An async iterable of applied operations in chain order.
   *
   * @remarks
   * This is the most direct way to build an operation indexer. Pollen reads each
   * block's operation list through `get_ops_in_block` and yields individual
   * applied-operation records so callers can filter by operation type.
   *
   * @throws RPCError
   * Thrown when block-number polling or operation retrieval fails.
   *
   * @example
   * ```ts
   * for await (const applied of client.blockchain.getOperations({
   *   from: 90_000_000,
   *   to: 90_000_010
   * })) {
   *   if (applied.op[0] === 'transfer') {
   *     console.log(applied.op[1])
   *   }
   * }
   * ```
   */
  public async *getOperations(options?: BlockchainStreamOptions | number) {
    for await (const num of this.getBlockNumbers(options)) {
      const operations = await this.client.database.getOperations(num);
      for (const operation of operations) {
        yield operation;
      }
    }
  }

  /**
   * Creates a Node readable stream of applied operations.
   *
   * @param options - Same options accepted by {@link getBlockNumbers}.
   * @returns A stream backed by the async operation iterator.
   *
   * @example
   * ```ts
   * const stream = client.blockchain.getOperationsStream({ from: 90_000_000 })
   * stream.on('data', (applied) => console.log(applied.op[0]))
   * ```
   */
  public getOperationsStream(options?: BlockchainStreamOptions | number) {
    return iteratorStream(this.getOperations(options));
  }
}
