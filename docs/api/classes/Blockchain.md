[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Blockchain

# Class: Blockchain

Defined in: [src/helpers/blockchain.ts:116](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L116)

Convenience helper for reading Hive blocks and operations as async iterators
or Node streams.

## Remarks

`Blockchain` builds on [DatabaseAPI](DatabaseAPI.md) and adds polling, block-number
range management, and finality selection. It is the preferred entry point for
indexers and Resilience-style background workers that need a steady feed of
blocks or operations without hand-writing polling loops.

## Example

```ts
import { Client } from '@srbde/pollen'

const client = new Client('https://api.hive.blog')

for await (const op of client.blockchain.getOperations({ from: 90_000_000 })) {
  console.log(op.op[0], op.trx_id)
}
```

## See

 - [BlockchainStreamOptions](../interfaces/BlockchainStreamOptions.md)
 - [DatabaseAPI.getBlock](DatabaseAPI.md#getblock)

## Constructors

### Constructor

> **new Blockchain**(`client`): `Blockchain`

Defined in: [src/helpers/blockchain.ts:122](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L122)

Creates a blockchain helper bound to a client.

#### Parameters

##### client

[`Client`](Client.md)

Client used for database API reads.

#### Returns

`Blockchain`

## Properties

### client

> `readonly` **client**: [`Client`](Client.md)

Defined in: [src/helpers/blockchain.ts:122](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L122)

Client used for database API reads.

## Methods

### getBlockNumbers()

> **getBlockNumbers**(`options?`): `AsyncGenerator`\<`number`, `void`, `unknown`\>

Defined in: [src/helpers/blockchain.ts:214](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L214)

Creates an async iterator that yields block numbers as they become available.

#### Parameters

##### options?

`number` \| [`BlockchainStreamOptions`](../interfaces/BlockchainStreamOptions.md)

Stream options, or a block number shorthand for `from`.

#### Returns

`AsyncGenerator`\<`number`, `void`, `unknown`\>

An async iterable of monotonically increasing block numbers.

#### Remarks

The iterator polls every three seconds, matching Hive block cadence. When
`to` is omitted it continues indefinitely; when `from` is omitted it starts
from the current block height for the selected mode.

#### Throws

Error
Thrown when `from` is greater than the current block number.

#### Throws

RPCError
Thrown when polling dynamic global properties fails.

#### Example

```ts
for await (const blockNum of client.blockchain.getBlockNumbers({
  from: 90_000_000,
  to: 90_000_005
})) {
  console.log(blockNum)
}
```

***

### getBlockNumberStream()

> **getBlockNumberStream**(`options?`): `ReadableStream`

Defined in: [src/helpers/blockchain.ts:252](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L252)

Creates a Node readable stream of block numbers.

#### Parameters

##### options?

`number` \| [`BlockchainStreamOptions`](../interfaces/BlockchainStreamOptions.md)

Same options accepted by [getBlockNumbers](#getblocknumbers).

#### Returns

`ReadableStream`

A stream backed by the async block-number iterator.

#### Example

```ts
const stream = client.blockchain.getBlockNumberStream(90_000_000)
stream.on('data', (blockNum) => console.log(blockNum))
```

***

### getBlocks()

> **getBlocks**(`options?`): `AsyncGenerator`\<[`SignedBlock`](../interfaces/SignedBlock.md), `void`, `unknown`\>

Defined in: [src/helpers/blockchain.ts:272](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L272)

Creates an async iterator that yields full signed blocks.

#### Parameters

##### options?

`number` \| [`BlockchainStreamOptions`](../interfaces/BlockchainStreamOptions.md)

Same options accepted by [getBlockNumbers](#getblocknumbers).

#### Returns

`AsyncGenerator`\<[`SignedBlock`](../interfaces/SignedBlock.md), `void`, `unknown`\>

An async iterable of Hive signed blocks.

#### Throws

RPCError
Thrown when block-number polling or block retrieval fails.

#### Example

```ts
for await (const block of client.blockchain.getBlocks(90_000_000)) {
  console.log(block.witness, block.transactions.length)
}
```

***

### getBlockStream()

> **getBlockStream**(`options?`): `ReadableStream`

Defined in: [src/helpers/blockchain.ts:291](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L291)

Creates a Node readable stream of full signed blocks.

#### Parameters

##### options?

`number` \| [`BlockchainStreamOptions`](../interfaces/BlockchainStreamOptions.md)

Same options accepted by [getBlockNumbers](#getblocknumbers).

#### Returns

`ReadableStream`

A stream backed by the async block iterator.

#### Example

```ts
client.blockchain
  .getBlockStream({ from: 90_000_000 })
  .on('data', (block) => console.log(block.block_id))
```

***

### getCurrentBlock()

> **getCurrentBlock**(`mode?`): `Promise`\<[`SignedBlock`](../interfaces/SignedBlock.md)\>

Defined in: [src/helpers/blockchain.ts:184](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L184)

Fetches the current block for the selected finality mode.

#### Parameters

##### mode?

[`BlockchainMode`](../enumerations/BlockchainMode.md)

Optional finality mode. Defaults to irreversible blocks.

#### Returns

`Promise`\<[`SignedBlock`](../interfaces/SignedBlock.md)\>

The signed block at the resolved current block number.

#### Throws

RPCError
Thrown when the RPC node rejects either the properties or block call.

#### Example

```ts
const block = await client.blockchain.getCurrentBlock()
console.log(block.transactions.length)
```

***

### getCurrentBlockHeader()

> **getCurrentBlockHeader**(`mode?`): `Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

Defined in: [src/helpers/blockchain.ts:165](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L165)

Fetches the current block header for the selected finality mode.

#### Parameters

##### mode?

[`BlockchainMode`](../enumerations/BlockchainMode.md)

Optional finality mode. Defaults to irreversible blocks.

#### Returns

`Promise`\<[`BlockHeader`](../interfaces/BlockHeader.md)\>

The Hive block header at the resolved current block number.

#### Throws

RPCError
Thrown when the RPC node rejects either the properties or block-header call.

#### Example

```ts
const header = await client.blockchain.getCurrentBlockHeader()
console.log(header.timestamp)
```

***

### getCurrentBlockNum()

> **getCurrentBlockNum**(`mode?`): `Promise`\<`number`\>

Defined in: [src/helpers/blockchain.ts:140](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L140)

Resolves the current block number for the selected finality mode.

#### Parameters

##### mode?

[`BlockchainMode`](../enumerations/BlockchainMode.md) = `BlockchainMode.Irreversible`

Whether to read the irreversible block number or the latest
head block number.

#### Returns

`Promise`\<`number`\>

The current Hive block number for the selected mode.

#### Throws

RPCError
Thrown when the underlying `get_dynamic_global_properties` call fails.

#### Example

```ts
const irreversible = await client.blockchain.getCurrentBlockNum()
const latest = await client.blockchain.getCurrentBlockNum(BlockchainMode.Latest)
```

***

### getOperations()

> **getOperations**(`options?`): `AsyncGenerator`\<[`AppliedOperation`](../interfaces/AppliedOperation.md), `void`, `unknown`\>

Defined in: [src/helpers/blockchain.ts:321](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L321)

Creates an async iterator that yields applied operations from each block.

#### Parameters

##### options?

`number` \| [`BlockchainStreamOptions`](../interfaces/BlockchainStreamOptions.md)

Same options accepted by [getBlockNumbers](#getblocknumbers).

#### Returns

`AsyncGenerator`\<[`AppliedOperation`](../interfaces/AppliedOperation.md), `void`, `unknown`\>

An async iterable of applied operations in chain order.

#### Remarks

This is the most direct way to build an operation indexer. Pollen reads each
block's operation list through `get_ops_in_block` and yields individual
applied-operation records so callers can filter by operation type.

#### Throws

RPCError
Thrown when block-number polling or operation retrieval fails.

#### Example

```ts
for await (const applied of client.blockchain.getOperations({
  from: 90_000_000,
  to: 90_000_010
})) {
  if (applied.op[0] === 'transfer') {
    console.log(applied.op[1])
  }
}
```

***

### getOperationsStream()

> **getOperationsStream**(`options?`): `ReadableStream`

Defined in: [src/helpers/blockchain.ts:342](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/blockchain.ts#L342)

Creates a Node readable stream of applied operations.

#### Parameters

##### options?

`number` \| [`BlockchainStreamOptions`](../interfaces/BlockchainStreamOptions.md)

Same options accepted by [getBlockNumbers](#getblocknumbers).

#### Returns

`ReadableStream`

A stream backed by the async operation iterator.

#### Example

```ts
const stream = client.blockchain.getOperationsStream({ from: 90_000_000 })
stream.on('data', (applied) => console.log(applied.op[0]))
```
