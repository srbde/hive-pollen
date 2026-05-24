[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / BinaryReader

# Class: BinaryReader

Defined in: [src/utils.ts:201](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L201)

Little-endian byte reader used by Hive deserializers and memo decoding.

## Remarks

The reader mirrors [BinaryWriter](BinaryWriter.md) and advances an internal cursor as
values are consumed. It is intentionally small and browser-safe.

## Example

```ts
const reader = new BinaryReader(bytes)
const memo = reader.readString()
```

## Constructors

### Constructor

> **new BinaryReader**(`buffer`): `BinaryReader`

Defined in: [src/utils.ts:205](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L205)

#### Parameters

##### buffer

`Uint8Array`

#### Returns

`BinaryReader`

## Methods

### readBytes()

> **readBytes**(`length`): `Uint8Array`

Defined in: [src/utils.ts:274](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L274)

#### Parameters

##### length

`number`

#### Returns

`Uint8Array`

***

### readInt16()

> **readInt16**(): `number`

Defined in: [src/utils.ts:217](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L217)

#### Returns

`number`

***

### readInt32()

> **readInt32**(): `number`

Defined in: [src/utils.ts:229](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L229)

#### Returns

`number`

***

### readInt64()

> **readInt64**(): `JSBI`

Defined in: [src/utils.ts:241](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L241)

#### Returns

`JSBI`

***

### readInt8()

> **readInt8**(): `number`

Defined in: [src/utils.ts:209](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L209)

#### Returns

`number`

***

### readString()

> **readString**(): `string`

Defined in: [src/utils.ts:267](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L267)

#### Returns

`string`

***

### readUint16()

> **readUint16**(): `number`

Defined in: [src/utils.ts:223](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L223)

#### Returns

`number`

***

### readUint32()

> **readUint32**(): `number`

Defined in: [src/utils.ts:235](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L235)

#### Returns

`number`

***

### readUint64()

> **readUint64**(): `JSBI`

Defined in: [src/utils.ts:251](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L251)

#### Returns

`JSBI`

***

### readUint8()

> **readUint8**(): `number`

Defined in: [src/utils.ts:213](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L213)

#### Returns

`number`

***

### readVarint32()

> **readVarint32**(): `number`

Defined in: [src/utils.ts:255](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L255)

#### Returns

`number`

***

### skip()

> **skip**(`length`): `void`

Defined in: [src/utils.ts:280](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L280)

#### Parameters

##### length

`number`

#### Returns

`void`
