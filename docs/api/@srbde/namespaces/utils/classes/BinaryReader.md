[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / BinaryReader

# Class: BinaryReader

Defined in: [src/utils.ts:300](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L300)

Little-endian byte reader used by Hive deserializers and memo decoding.

## Remarks

The constructor copies input into a clean `Uint8Array` before creating its
`DataView`. That avoids backing-store offset surprises from Buffer-like
views while preserving a browser-native byte engine. 64-bit readers return
native `bigint`, matching the Phase 8 removal of JSBI from the hot path.

## Constructors

### Constructor

> **new BinaryReader**(`buffer`): `BinaryReader`

Defined in: [src/utils.ts:304](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L304)

#### Parameters

##### buffer

`Uint8Array`

#### Returns

`BinaryReader`

## Methods

### readBytes()

> **readBytes**(`length`): `Uint8Array`

Defined in: [src/utils.ts:371](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L371)

#### Parameters

##### length

`number`

#### Returns

`Uint8Array`

***

### readInt16()

> **readInt16**(): `number`

Defined in: [src/utils.ts:319](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L319)

#### Returns

`number`

***

### readInt32()

> **readInt32**(): `number`

Defined in: [src/utils.ts:331](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L331)

#### Returns

`number`

***

### readInt64()

> **readInt64**(): `bigint`

Defined in: [src/utils.ts:343](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L343)

#### Returns

`bigint`

***

### readInt8()

> **readInt8**(): `number`

Defined in: [src/utils.ts:311](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L311)

#### Returns

`number`

***

### readString()

> **readString**(): `string`

Defined in: [src/utils.ts:366](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L366)

#### Returns

`string`

***

### readUint16()

> **readUint16**(): `number`

Defined in: [src/utils.ts:325](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L325)

#### Returns

`number`

***

### readUint32()

> **readUint32**(): `number`

Defined in: [src/utils.ts:337](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L337)

#### Returns

`number`

***

### readUint64()

> **readUint64**(): `bigint`

Defined in: [src/utils.ts:350](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L350)

#### Returns

`bigint`

***

### readUint8()

> **readUint8**(): `number`

Defined in: [src/utils.ts:315](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L315)

#### Returns

`number`

***

### readVarint32()

> **readVarint32**(): `number`

Defined in: [src/utils.ts:354](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L354)

#### Returns

`number`

***

### skip()

> **skip**(`length`): `void`

Defined in: [src/utils.ts:382](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L382)

#### Parameters

##### length

`number`

#### Returns

`void`
