[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / toHex

# Function: toHex()

> **toHex**(`data`): `string`

Defined in: [src/utils.ts:81](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L81)

Converts a Uint8Array to a hex-encoded string.

## Parameters

### data

`Uint8Array`

Native byte array to encode.

## Returns

`string`

Lowercase hex string with two characters per byte.

## Remarks

Pollen uses this helper at RPC and JSON boundaries where Hive expects binary
protocol values to be represented as hex text.

## Example

```ts
const hex = toHex(new Uint8Array([0xde, 0xad, 0xbe, 0xef]))
```
