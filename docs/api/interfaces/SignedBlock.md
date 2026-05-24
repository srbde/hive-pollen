[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / SignedBlock

# Interface: SignedBlock

Defined in: [src/chain/block.ts:91](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L91)

Full Hive signed block including transactions.

## Remarks

This is the primary unit consumed by indexers. It carries the signed header,
transaction ids, and the deserialized transactions in block order.

## Example

```ts
const block = await client.database.getBlock(90_000_000)
for (const transaction of block.transactions) {
  console.log(transaction.operations.length)
}
```

## Extends

- [`SignedBlockHeader`](SignedBlockHeader.md)

## Properties

### block\_id

> **block\_id**: `string`

Defined in: [src/chain/block.ts:92](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L92)

***

### extensions

> **extensions**: `any`[]

Defined in: [src/chain/block.ts:56](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L56)

#### Inherited from

[`SignedBlockHeader`](SignedBlockHeader.md).[`extensions`](SignedBlockHeader.md#extensions)

***

### previous

> **previous**: `string`

Defined in: [src/chain/block.ts:52](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L52)

#### Inherited from

[`SignedBlockHeader`](SignedBlockHeader.md).[`previous`](SignedBlockHeader.md#previous)

***

### signing\_key

> **signing\_key**: `string`

Defined in: [src/chain/block.ts:93](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L93)

***

### timestamp

> **timestamp**: `string`

Defined in: [src/chain/block.ts:53](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L53)

#### Inherited from

[`SignedBlockHeader`](SignedBlockHeader.md).[`timestamp`](SignedBlockHeader.md#timestamp)

***

### transaction\_ids

> **transaction\_ids**: `string`[]

Defined in: [src/chain/block.ts:94](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L94)

***

### transaction\_merkle\_root

> **transaction\_merkle\_root**: `string`

Defined in: [src/chain/block.ts:55](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L55)

#### Inherited from

[`SignedBlockHeader`](SignedBlockHeader.md).[`transaction_merkle_root`](SignedBlockHeader.md#transaction_merkle_root)

***

### transactions

> **transactions**: [`Transaction`](Transaction.md)[]

Defined in: [src/chain/block.ts:95](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L95)

***

### witness

> **witness**: `string`

Defined in: [src/chain/block.ts:54](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L54)

#### Inherited from

[`SignedBlockHeader`](SignedBlockHeader.md).[`witness`](SignedBlockHeader.md#witness)

***

### witness\_signature

> **witness\_signature**: `string`

Defined in: [src/chain/block.ts:73](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/block.ts#L73)

#### Inherited from

[`SignedBlockHeader`](SignedBlockHeader.md).[`witness_signature`](SignedBlockHeader.md#witness_signature)
