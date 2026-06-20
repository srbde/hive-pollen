[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Types

# Variable: Types

> `const` **Types**: `object`

Defined in: [src/chain/serializer.ts:676](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/serializer.ts#L676)

Hive protocol serializer registry.

## Type Declaration

### Array

> **Array**: (`itemSerializer`) => (`buffer`, `data`) => `void` = `ArraySerializer`

#### Parameters

##### itemSerializer

[`Serializer`](../type-aliases/Serializer.md)

#### Returns

(`buffer`, `data`) => `void`

### Asset

> **Asset**: (`buffer`, `data`) => `void` = `AssetSerializer`

Serialize asset.

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`string` \| `number` \| [`Asset`](../classes/Asset.md)

#### Returns

`void`

#### Remarks

This loses precision for amounts larger than 2^53-1/10^precision.
Should not be a problem in real-world usage.

### Authority

> **Authority**: (`buffer`, `data`) => `void` = `AuthoritySerializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`any`

#### Returns

`void`

### Binary

> **Binary**: (`size?`) => (`buffer`, `data`) => `void` = `BinarySerializer`

#### Parameters

##### size?

`number`

#### Returns

(`buffer`, `data`) => `void`

### Boolean

> **Boolean**: (`buffer`, `data`) => `void` = `BooleanSerializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`boolean`

#### Returns

`void`

### Date

> **Date**: (`buffer`, `data`) => `void` = `DateSerializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`string`

#### Returns

`void`

### EncryptedMemo

> **EncryptedMemo**: (`buffer`, `data`) => `void` = `EncryptedMemoSerializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`any`

#### Returns

`void`

### FlatMap

> **FlatMap**: (`keySerializer`, `valueSerializer`) => (`buffer`, `data`) => `void` = `FlatMapSerializer`

#### Parameters

##### keySerializer

[`Serializer`](../type-aliases/Serializer.md)

##### valueSerializer

[`Serializer`](../type-aliases/Serializer.md)

#### Returns

(`buffer`, `data`) => `void`

### Int16

> **Int16**: (`buffer`, `data`) => `void` = `Int16Serializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`number`

#### Returns

`void`

### Int32

> **Int32**: (`buffer`, `data`) => `void` = `Int32Serializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`number`

#### Returns

`void`

### Int64

> **Int64**: (`buffer`, `data`) => `void` = `Int64Serializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`number`

#### Returns

`void`

### Int8

> **Int8**: (`buffer`, `data`) => `void` = `Int8Serializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`number`

#### Returns

`void`

### Object

> **Object**: (`keySerializers`) => (`buffer`, `data`) => `void` = `ObjectSerializer`

#### Parameters

##### keySerializers

\[`string`, [`Serializer`](../type-aliases/Serializer.md)\][]

#### Returns

(`buffer`, `data`) => `void`

### Operation

> **Operation**: (`buffer`, `operation`) => `void` = `OperationSerializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### operation

[`Operation`](../type-aliases/Operation.md)

#### Returns

`void`

### Optional

> **Optional**: (`valueSerializer`) => (`buffer`, `data`) => `void` = `OptionalSerializer`

#### Parameters

##### valueSerializer

[`Serializer`](../type-aliases/Serializer.md)

#### Returns

(`buffer`, `data`) => `void`

### Price

> **Price**: (`buffer`, `data`) => `void` = `PriceSerializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`any`

#### Returns

`void`

### PublicKey

> **PublicKey**: (`buffer`, `data`) => `void` = `PublicKeySerializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`string` \| [`PublicKey`](../classes/PublicKey.md) \| `null`

#### Returns

`void`

### StaticVariant

> **StaticVariant**: (`itemSerializers`) => (`buffer`, `data`) => `void` = `StaticVariantSerializer`

#### Parameters

##### itemSerializers

[`Serializer`](../type-aliases/Serializer.md)[]

#### Returns

(`buffer`, `data`) => `void`

### String

> **String**: (`buffer`, `data`) => `void` = `StringSerializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`string`

#### Returns

`void`

### Transaction

> **Transaction**: (`buffer`, `data`) => `void` = `TransactionSerializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`any`

#### Returns

`void`

### UInt16

> **UInt16**: (`buffer`, `data`) => `void` = `UInt16Serializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`number`

#### Returns

`void`

### UInt32

> **UInt32**: (`buffer`, `data`) => `void` = `UInt32Serializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`number`

#### Returns

`void`

### UInt64

> **UInt64**: (`buffer`, `data`) => `void` = `UInt64Serializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`number`

#### Returns

`void`

### UInt8

> **UInt8**: (`buffer`, `data`) => `void` = `UInt8Serializer`

#### Parameters

##### buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

##### data

`number`

#### Returns

`void`

### Void

> **Void**: (`_buffer`) => `never` = `VoidSerializer`

#### Parameters

##### \_buffer

[`BinaryWriter`](../@srbde/namespaces/utils/classes/BinaryWriter.md)

#### Returns

`never`

## Remarks

`Types` is the internal engine behind transaction signing, transaction id
generation, memo envelopes, and witness property encoding. Each member writes
one Hive-compatible value into a [BinaryWriter](../@srbde/namespaces/utils/classes/BinaryWriter.md), which is backed by
`Uint8Array` and `DataView` rather than legacy byte-buffer dependencies. The
object is exported for advanced protocol tooling, but most applications
should use higher-level helpers such as `client.broadcast`.

## Example

```ts
const writer = new BinaryWriter()
Types.Transaction(writer, transaction)

const bytes = writer.getBuffer()
```

## Throws

Error
Individual serializers throw when a value cannot be represented in the
expected Hive wire format, such as a binary field with the wrong byte length
or an operation name with no registered serializer.
