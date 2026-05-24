[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / BlockHeader

# Interface: BlockHeader

Defined in: [src/chain/block.ts:51](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/block.ts#L51)

Hive block header without the witness signature.

## Remarks

Block headers link blocks through `previous`, identify the producing witness,
and commit to the transaction list through the transaction Merkle root.

## Example

```ts
const header = await client.database.getBlockHeader(90_000_000)
console.log(header.witness, header.timestamp)
```

## Extended by

- [`SignedBlockHeader`](SignedBlockHeader.md)

## Properties

### extensions

> **extensions**: `any`[]

Defined in: [src/chain/block.ts:56](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/block.ts#L56)

***

### previous

> **previous**: `string`

Defined in: [src/chain/block.ts:52](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/block.ts#L52)

***

### timestamp

> **timestamp**: `string`

Defined in: [src/chain/block.ts:53](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/block.ts#L53)

***

### transaction\_merkle\_root

> **transaction\_merkle\_root**: `string`

Defined in: [src/chain/block.ts:55](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/block.ts#L55)

***

### witness

> **witness**: `string`

Defined in: [src/chain/block.ts:54](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/block.ts#L54)
