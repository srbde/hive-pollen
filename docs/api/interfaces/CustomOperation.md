[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CustomOperation

# Interface: CustomOperation

Defined in: [src/chain/operation.ts:505](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L505)

Legacy binary custom operation requiring active authority.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"custom"`

Defined in: [src/chain/operation.ts:506](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L506)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:507](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L507)

#### data

> **data**: `number`[] \| [`HexBuffer`](../classes/HexBuffer.md) \| `Buffer`\<`ArrayBufferLike`\>

#### id

> **id**: `number`

#### required\_auths

> **required\_auths**: `string`[]

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
