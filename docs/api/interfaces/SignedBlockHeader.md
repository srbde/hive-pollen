[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / SignedBlockHeader

# Interface: SignedBlockHeader

Defined in: [src/chain/block.ts:72](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L72)

Hive block header plus witness signature.

## Remarks

Witness signatures prove that the scheduled witness produced the block using
its active block-signing key.

## Example

```ts
const block = await client.database.getBlock(90_000_000)
console.log(block.witness_signature)
```

## Extends

- [`BlockHeader`](BlockHeader.md)

## Extended by

- [`SignedBlock`](SignedBlock.md)

## Properties

### extensions

> **extensions**: `any`[]

Defined in: [src/chain/block.ts:56](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L56)

#### Inherited from

[`BlockHeader`](BlockHeader.md).[`extensions`](BlockHeader.md#extensions)

***

### previous

> **previous**: `string`

Defined in: [src/chain/block.ts:52](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L52)

#### Inherited from

[`BlockHeader`](BlockHeader.md).[`previous`](BlockHeader.md#previous)

***

### timestamp

> **timestamp**: `string`

Defined in: [src/chain/block.ts:53](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L53)

#### Inherited from

[`BlockHeader`](BlockHeader.md).[`timestamp`](BlockHeader.md#timestamp)

***

### transaction\_merkle\_root

> **transaction\_merkle\_root**: `string`

Defined in: [src/chain/block.ts:55](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L55)

#### Inherited from

[`BlockHeader`](BlockHeader.md).[`transaction_merkle_root`](BlockHeader.md#transaction_merkle_root)

***

### witness

> **witness**: `string`

Defined in: [src/chain/block.ts:54](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L54)

#### Inherited from

[`BlockHeader`](BlockHeader.md).[`witness`](BlockHeader.md#witness)

***

### witness\_signature

> **witness\_signature**: `string`

Defined in: [src/chain/block.ts:73](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L73)
