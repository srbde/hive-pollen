[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / fromHex

# Function: fromHex()

> **fromHex**(`hex`): `Uint8Array`

Defined in: [src/utils.ts:103](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L103)

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
