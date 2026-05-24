[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Serializer

# Type Alias: Serializer

> **Serializer** = (`buffer`, `data`) => `void`

Defined in: [src/chain/serializer.ts:60](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/serializer.ts#L60)

Function signature for writing one Hive protocol value to Pollen's native
byte writer.

## Parameters

### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

Destination binary writer.

### data

`any`

Value to serialize.

## Returns

`void`

## Remarks

Serializers are intentionally composable. Complex operation serializers are
built by combining primitive serializers for numbers, native `bigint`-backed
64-bit values, strings, assets, public keys, arrays, options, and objects.

## Example

```ts
const writer = new BinaryWriter()
Types.String(writer, 'pollen')
```
