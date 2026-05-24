[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / concat

# Function: concat()

> **concat**(`arrays`): `Uint8Array`

Defined in: [src/utils.ts:129](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L129)

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
