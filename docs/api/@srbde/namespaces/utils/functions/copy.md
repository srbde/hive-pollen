[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / copy

# Function: copy()

> **copy**\<`T`\>(`object`): `T`

Defined in: [src/utils.ts:375](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L375)

Creates a deep copy of a JSON-serializable object.

## Type Parameters

### T

`T`

## Parameters

### object

`T`

Plain object, array, or value to clone.

## Returns

`T`

A cloned value produced through JSON serialization.

## Remarks

Pollen uses this for transaction and RPC payloads where the data model is
already JSON-compatible.

## Example

```ts
const txCopy = copy(transaction)
```
