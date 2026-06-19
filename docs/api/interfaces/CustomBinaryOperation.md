[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CustomBinaryOperation

# Interface: CustomBinaryOperation

Defined in: [src/chain/operation.ts:620](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L620)

Binary custom operation supporting owner, active, posting, and authority auths.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"custom_binary"`

Defined in: [src/chain/operation.ts:621](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L621)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:622](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L622)

#### data

> **data**: `number`[] \| `Uint8Array`\<`ArrayBufferLike`\> \| [`HexBuffer`](../classes/HexBuffer.md)

#### id

> **id**: `string`

ID string, must be less than 32 characters long.

#### required\_active\_auths

> **required\_active\_auths**: `string`[]

#### required\_auths

> **required\_auths**: [`AuthorityType`](AuthorityType.md)[]

#### required\_owner\_auths

> **required\_owner\_auths**: `string`[]

#### required\_posting\_auths

> **required\_posting\_auths**: `string`[]

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
