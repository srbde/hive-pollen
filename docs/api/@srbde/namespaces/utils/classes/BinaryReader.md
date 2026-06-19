[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / BinaryReader

# Class: BinaryReader

Defined in: [src/utils.ts:313](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L313)

Little-endian byte reader used by Hive deserializers and memo decoding.

## Remarks

The constructor copies input into a clean `Uint8Array` before creating its
`DataView`. That avoids backing-store offset surprises from Buffer-like
views while preserving a browser-native byte engine. 64-bit readers return
native `bigint`, matching the Phase 8 removal of JSBI from the hot path.

## Constructors

### Constructor

> **new BinaryReader**(`buffer`): `BinaryReader`

Defined in: [src/utils.ts:317](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L317)

#### Parameters

##### buffer

`Uint8Array`

#### Returns

`BinaryReader`

## Methods

### readBytes()

> **readBytes**(`length`): `Uint8Array`

Defined in: [src/utils.ts:384](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L384)

#### Parameters

##### length

`number`

#### Returns

`Uint8Array`

***

### readInt16()

> **readInt16**(): `number`

Defined in: [src/utils.ts:332](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L332)

#### Returns

`number`

***

### readInt32()

> **readInt32**(): `number`

Defined in: [src/utils.ts:344](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L344)

#### Returns

`number`

***

### readInt64()

> **readInt64**(): `bigint`

Defined in: [src/utils.ts:356](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L356)

#### Returns

`bigint`

***

### readInt8()

> **readInt8**(): `number`

Defined in: [src/utils.ts:324](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L324)

#### Returns

`number`

***

### readString()

> **readString**(): `string`

Defined in: [src/utils.ts:379](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L379)

#### Returns

`string`

***

### readUint16()

> **readUint16**(): `number`

Defined in: [src/utils.ts:338](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L338)

#### Returns

`number`

***

### readUint32()

> **readUint32**(): `number`

Defined in: [src/utils.ts:350](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L350)

#### Returns

`number`

***

### readUint64()

> **readUint64**(): `bigint`

Defined in: [src/utils.ts:363](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L363)

#### Returns

`bigint`

***

### readUint8()

> **readUint8**(): `number`

Defined in: [src/utils.ts:328](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L328)

#### Returns

`number`

***

### readVarint32()

> **readVarint32**(): `number`

Defined in: [src/utils.ts:367](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L367)

#### Returns

`number`

***

### skip()

> **skip**(`length`): `void`

Defined in: [src/utils.ts:395](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/utils.ts#L395)

#### Parameters

##### length

`number`

#### Returns

`void`
