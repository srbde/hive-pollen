[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / concat

# Function: concat()

> **concat**(`arrays`): `Uint8Array`

Defined in: [src/utils.ts:142](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L142)

Concatenates multiple Uint8Arrays into one.

## Parameters

### arrays

`Uint8Array`\<`ArrayBufferLike`\>[]

Byte arrays to join in order.

## Returns

`Uint8Array`

A new `Uint8Array` containing all input bytes.

## Remarks

This replaces Node `Buffer.concat` in protocol paths that must run the same
way in Node and browsers.

## Example

```ts
const digestInput = concat([chainId, transactionBytes])
```
