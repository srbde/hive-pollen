[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CustomBinaryOperation

# Interface: CustomBinaryOperation

Defined in: [src/chain/operation.ts:517](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L517)

Binary custom operation supporting owner, active, posting, and authority auths.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"custom_binary"`

Defined in: [src/chain/operation.ts:518](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L518)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:519](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L519)

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

[`Operation`](Operation.md).[`1`](Operation.md#1)
