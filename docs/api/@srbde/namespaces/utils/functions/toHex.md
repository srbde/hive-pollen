[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / toHex

# Function: toHex()

> **toHex**(`data`): `string`

Defined in: [src/utils.ts:94](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L94)

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
