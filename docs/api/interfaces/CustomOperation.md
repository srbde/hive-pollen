[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CustomOperation

# Interface: CustomOperation

Defined in: [src/chain/operation.ts:608](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L608)

Legacy binary custom operation requiring active authority.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"custom"`

Defined in: [src/chain/operation.ts:609](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L609)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:610](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L610)

#### data

> **data**: `number`[] \| `Uint8Array`\<`ArrayBufferLike`\> \| [`HexBuffer`](../classes/HexBuffer.md)

#### id

> **id**: `number`

#### required\_auths

> **required\_auths**: `string`[]

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
