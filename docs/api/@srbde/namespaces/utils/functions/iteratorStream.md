[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / iteratorStream

# Function: iteratorStream()

> **iteratorStream**\<`T`\>(`iterator`): `ReadableStream`

Defined in: [src/utils.ts:339](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L339)

Converts an async iterator into an object-mode readable stream.

## Type Parameters

### T

`T`

## Parameters

### iterator

`AsyncIterableIterator`\<`T`\>

Async iterator whose values should be emitted.

## Returns

`ReadableStream`

A Node readable stream that respects backpressure.

## Remarks

This bridge lets browser-friendly async generators power Node stream APIs
used by older Hive indexing tools.

## Example

```ts
const stream = iteratorStream(client.blockchain.getBlocks(90_000_000))
stream.on('data', (block) => console.log(block.block_id))
```
