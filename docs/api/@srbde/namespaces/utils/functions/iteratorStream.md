[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / iteratorStream

# Function: iteratorStream()

> **iteratorStream**\<`T`\>(`iterator`): `ReadableStream`\<`T`\>

Defined in: [src/utils.ts:416](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/utils.ts#L416)

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
