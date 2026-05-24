[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / BinaryWriter

# Class: BinaryWriter

Defined in: [src/utils.ts:175](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L175)

Growable little-endian byte writer used by Hive serializers.

## Remarks

The writer is built on `Uint8Array` and `DataView`, so protocol serialization
does not depend on Node `Buffer` or third-party byte-buffer packages. 64-bit
integers are accepted as `number`, decimal `string`, or native `bigint` and
are written in Hive's little-endian wire order.

## Constructors

### Constructor

> **new BinaryWriter**(`size?`): `BinaryWriter`

Defined in: [src/utils.ts:179](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L179)

#### Parameters

##### size?

`number` = `1024`

#### Returns

`BinaryWriter`

## Methods

### getBuffer()

> **getBuffer**(): `Uint8Array`

Defined in: [src/utils.ts:286](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L286)

#### Returns

`Uint8Array`

***

### writeBytes()

> **writeBytes**(`bytes`): `void`

Defined in: [src/utils.ts:280](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L280)

#### Parameters

##### bytes

`Uint8Array`

#### Returns

`void`

***

### writeInt16()

> **writeInt16**(`value`): `void`

Defined in: [src/utils.ts:204](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L204)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeInt32()

> **writeInt32**(`value`): `void`

Defined in: [src/utils.ts:224](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L224)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeInt64()

> **writeInt64**(`value`): `void`

Defined in: [src/utils.ts:244](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L244)

#### Parameters

##### value

`string` \| `number` \| `bigint`

#### Returns

`void`

***

### writeInt8()

> **writeInt8**(`value`): `void`

Defined in: [src/utils.ts:191](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L191)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeString()

> **writeString**(`value`): `void`

Defined in: [src/utils.ts:274](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L274)

#### Parameters

##### value

`string`

#### Returns

`void`

***

### writeUint16()

> **writeUint16**(`value`): `void`

Defined in: [src/utils.ts:214](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L214)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUint32()

> **writeUint32**(`value`): `void`

Defined in: [src/utils.ts:234](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L234)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUint64()

> **writeUint64**(`value`): `void`

Defined in: [src/utils.ts:255](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L255)

#### Parameters

##### value

`string` \| `number` \| `bigint`

#### Returns

`void`

***

### writeUint8()

> **writeUint8**(`value`): `void`

Defined in: [src/utils.ts:199](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L199)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeVarint32()

> **writeVarint32**(`value`): `void`

Defined in: [src/utils.ts:266](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L266)

#### Parameters

##### value

`number`

#### Returns

`void`
