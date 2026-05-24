[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / HexBuffer

# Class: HexBuffer

Defined in: [src/chain/misc.ts:64](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/misc.ts#L64)

Byte wrapper that serializes to a hex-encoded string.

## Remarks

Hive APIs frequently represent binary values as hex strings. `HexBuffer`
now stores a native `Uint8Array`, keeping protocol bytes available for
serializers without reintroducing Node `Buffer` as a core byte container.

## Example

```ts
const bytes = HexBuffer.from('deadbeef')
console.log(bytes.toJSON())
```

## Constructors

### Constructor

> **new HexBuffer**(`buffer`): `HexBuffer`

Defined in: [src/chain/misc.ts:70](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/misc.ts#L70)

Creates a hex-buffer wrapper around native bytes.

#### Parameters

##### buffer

`Uint8Array`

Raw binary data as a `Uint8Array`.

#### Returns

`HexBuffer`

## Properties

### buffer

> **buffer**: `Uint8Array`

Defined in: [src/chain/misc.ts:70](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/misc.ts#L70)

Raw binary data as a `Uint8Array`.

## Methods

### toJSON()

> **toJSON**(): `string`

Defined in: [src/chain/misc.ts:102](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/misc.ts#L102)

#### Returns

`string`

***

### toString()

> **toString**(`encoding?`): `string`

Defined in: [src/chain/misc.ts:95](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/misc.ts#L95)

#### Parameters

##### encoding?

`string` = `"hex"`

#### Returns

`string`

***

### from()

> `static` **from**(`value`): `HexBuffer`

Defined in: [src/chain/misc.ts:83](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/misc.ts#L83)

Normalizes hex, bytes, or an existing wrapper into a HexBuffer.

#### Parameters

##### value

`string` \| `number`[] \| `Uint8Array`\<`ArrayBufferLike`\> \| `HexBuffer`

`Uint8Array`, existing wrapper, byte array, or hex string.

#### Returns

`HexBuffer`

A hex-buffer wrapper.

#### Example

```ts
const buffer = HexBuffer.from([0xde, 0xad, 0xbe, 0xef])
```
