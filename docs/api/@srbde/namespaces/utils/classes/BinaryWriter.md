[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / BinaryWriter

# Class: BinaryWriter

Defined in: [src/utils.ts:93](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L93)

Growable little-endian byte writer used by Hive serializers.

## Remarks

Pollen uses this native `Uint8Array` writer instead of external byte-buffer
libraries so Node and browser builds share the same serialization engine.
Integer methods match Hive's wire format, and variable-length strings are
encoded with a varint length prefix followed by UTF-8 bytes.

## Example

```ts
const writer = new BinaryWriter()
writer.writeString('pollen')
writer.writeUint16(42)

const bytes = writer.getBuffer()
```

## Constructors

### Constructor

> **new BinaryWriter**(`size?`): `BinaryWriter`

Defined in: [src/utils.ts:97](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L97)

#### Parameters

##### size?

`number` = `1024`

#### Returns

`BinaryWriter`

## Methods

### getBuffer()

> **getBuffer**(): `Uint8Array`

Defined in: [src/utils.ts:183](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L183)

#### Returns

`Uint8Array`

***

### writeBytes()

> **writeBytes**(`bytes`): `void`

Defined in: [src/utils.ts:177](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L177)

#### Parameters

##### bytes

`Uint8Array`\<`ArrayBufferLike`\> \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### writeInt16()

> **writeInt16**(`value`): `void`

Defined in: [src/utils.ts:119](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L119)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeInt32()

> **writeInt32**(`value`): `void`

Defined in: [src/utils.ts:131](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L131)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeInt64()

> **writeInt64**(`value`): `void`

Defined in: [src/utils.ts:143](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L143)

#### Parameters

##### value

`string` \| `number` \| `JSBI`

#### Returns

`void`

***

### writeInt8()

> **writeInt8**(`value`): `void`

Defined in: [src/utils.ts:109](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L109)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeString()

> **writeString**(`value`): `void`

Defined in: [src/utils.ts:171](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L171)

#### Parameters

##### value

`string`

#### Returns

`void`

***

### writeUint16()

> **writeUint16**(`value`): `void`

Defined in: [src/utils.ts:125](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L125)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUint32()

> **writeUint32**(`value`): `void`

Defined in: [src/utils.ts:137](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L137)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUint64()

> **writeUint64**(`value`): `void`

Defined in: [src/utils.ts:153](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L153)

#### Parameters

##### value

`string` \| `number` \| `JSBI`

#### Returns

`void`

***

### writeUint8()

> **writeUint8**(`value`): `void`

Defined in: [src/utils.ts:114](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L114)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeVarint32()

> **writeVarint32**(`value`): `void`

Defined in: [src/utils.ts:163](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L163)

#### Parameters

##### value

`number`

#### Returns

`void`
