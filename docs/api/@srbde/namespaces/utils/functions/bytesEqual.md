[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / bytesEqual

# Function: bytesEqual()

> **bytesEqual**(`a`, `b`): `boolean`

Defined in: [src/utils.ts:167](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/utils.ts#L167)

Compares two byte arrays for equality.

## Parameters

### a

`Uint8Array`

First byte array.

### b

`Uint8Array`

Second byte array.

## Returns

`boolean`

True when both arrays have the same length and byte values.

## Example

```ts
if (!bytesEqual(expected, actual)) {
  throw new Error('checksum mismatch')
}
```
