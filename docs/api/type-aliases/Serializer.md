[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Serializer

# Type Alias: Serializer

> **Serializer** = (`buffer`, `data`) => `void`

Defined in: [src/chain/serializer.ts:59](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/serializer.ts#L59)

Function signature for writing one Hive protocol value to a binary buffer.

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
built by combining primitive serializers for numbers, strings, assets,
public keys, arrays, options, and objects.

## Example

```ts
const writer = new BinaryWriter()
Types.String(writer, 'pollen')
```
