[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / iteratorStream

# Function: iteratorStream()

> **iteratorStream**\<`T`\>(`iterator`): `ReadableStream`\<`T`\>

Defined in: [src/utils.ts:416](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L416)

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
