[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / HexBuffer

# Class: HexBuffer

Defined in: [src/chain/misc.ts:61](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L61)

Buffer wrapper that serializes to a hex-encoded string.

## Remarks

Hive APIs frequently represent binary values as hex strings. `HexBuffer`
keeps binary data available for serializers while rendering cleanly in JSON.

## Example

```ts
const bytes = HexBuffer.from('deadbeef')
console.log(bytes.toJSON())
```

## Constructors

### Constructor

> **new HexBuffer**(`buffer`): `HexBuffer`

Defined in: [src/chain/misc.ts:67](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L67)

Creates a hex-buffer wrapper around a Node buffer.

#### Parameters

##### buffer

`Buffer`

Raw binary data.

#### Returns

`HexBuffer`

## Properties

### buffer

> **buffer**: `Buffer`

Defined in: [src/chain/misc.ts:67](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L67)

Raw binary data.

## Methods

### toJSON()

> **toJSON**(): `string`

Defined in: [src/chain/misc.ts:96](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L96)

#### Returns

`string`

***

### toString()

> **toString**(`encoding?`): `string`

Defined in: [src/chain/misc.ts:92](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L92)

#### Parameters

##### encoding?

`string` = `'hex'`

#### Returns

`string`

***

### from()

> `static` **from**(`value`): `HexBuffer`

Defined in: [src/chain/misc.ts:80](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L80)

Normalizes hex, bytes, or an existing wrapper into a HexBuffer.

#### Parameters

##### value

`string` \| `number`[] \| `HexBuffer` \| `Buffer`\<`ArrayBufferLike`\>

Buffer, existing wrapper, byte array, or hex string.

#### Returns

`HexBuffer`

A hex-buffer wrapper.

#### Example

```ts
const buffer = HexBuffer.from([0xde, 0xad, 0xbe, 0xef])
```
