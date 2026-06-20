[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / BinaryWriter

# Class: BinaryWriter

Defined in: [src/utils.ts:188](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L188)

Growable little-endian byte writer used by Hive serializers.

## Remarks

The writer is built on `Uint8Array` and `DataView`, so protocol serialization
does not depend on Node `Buffer` or third-party byte-buffer packages. 64-bit
integers are accepted as `number`, decimal `string`, or native `bigint` and
are written in Hive's little-endian wire order.

## Constructors

### Constructor

> **new BinaryWriter**(`size?`): `BinaryWriter`

Defined in: [src/utils.ts:192](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L192)

#### Parameters

##### size?

`number` = `1024`

#### Returns

`BinaryWriter`

## Methods

### getBuffer()

> **getBuffer**(): `Uint8Array`

Defined in: [src/utils.ts:299](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L299)

#### Returns

`Uint8Array`

***

### writeBytes()

> **writeBytes**(`bytes`): `void`

Defined in: [src/utils.ts:293](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L293)

#### Parameters

##### bytes

`Uint8Array`

#### Returns

`void`

***

### writeInt16()

> **writeInt16**(`value`): `void`

Defined in: [src/utils.ts:217](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L217)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeInt32()

> **writeInt32**(`value`): `void`

Defined in: [src/utils.ts:237](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L237)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeInt64()

> **writeInt64**(`value`): `void`

Defined in: [src/utils.ts:257](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L257)

#### Parameters

##### value

`string` \| `number` \| `bigint`

#### Returns

`void`

***

### writeInt8()

> **writeInt8**(`value`): `void`

Defined in: [src/utils.ts:204](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L204)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeString()

> **writeString**(`value`): `void`

Defined in: [src/utils.ts:287](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L287)

#### Parameters

##### value

`string`

#### Returns

`void`

***

### writeUint16()

> **writeUint16**(`value`): `void`

Defined in: [src/utils.ts:227](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L227)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUint32()

> **writeUint32**(`value`): `void`

Defined in: [src/utils.ts:247](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L247)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUint64()

> **writeUint64**(`value`): `void`

Defined in: [src/utils.ts:268](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L268)

#### Parameters

##### value

`string` \| `number` \| `bigint`

#### Returns

`void`

***

### writeUint8()

> **writeUint8**(`value`): `void`

Defined in: [src/utils.ts:212](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L212)

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeVarint32()

> **writeVarint32**(`value`): `void`

Defined in: [src/utils.ts:279](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L279)

#### Parameters

##### value

`number`

#### Returns

`void`
