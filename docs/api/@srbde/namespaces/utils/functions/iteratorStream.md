[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / iteratorStream

# Function: iteratorStream()

> **iteratorStream**\<`T`\>(`iterator`): `ReadableStream`\<`T`\>

Defined in: [src/utils.ts:416](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/utils.ts#L416)

Converts an async iterator into a native Web ReadableStream.

## Type Parameters

### T

`T`

## Parameters

### iterator

`AsyncIterableIterator`\<`T`\>

## Returns

`ReadableStream`\<`T`\>

## Remarks

This replaces the Node-specific `PassThrough` implementation with a browser-native
stream engine, enabling zero-dependency streaming in both environments.
