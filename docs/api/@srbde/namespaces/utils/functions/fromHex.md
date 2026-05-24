[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / fromHex

# Function: fromHex()

> **fromHex**(`hex`): `Uint8Array`

Defined in: [src/utils.ts:116](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/utils.ts#L116)

Converts a hex-encoded string to a Uint8Array.

## Parameters

### hex

`string`

Hex string with an even number of characters.

## Returns

`Uint8Array`

Native bytes represented by the string.

## Throws

Error
Thrown when `hex` has an odd number of characters.

## Example

```ts
const bytes = fromHex('deadbeef')
```
