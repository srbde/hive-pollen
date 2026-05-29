[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / SignedTransaction

# Interface: SignedTransaction

Defined in: [src/chain/transaction.ts:94](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/transaction.ts#L94)

Hive transaction plus compact ECDSA signatures.

## Remarks

Signatures are hex-encoded wire signatures produced from the chain-id-prefixed
transaction digest.

## Example

```ts
const signed = client.broadcast.sign(transaction, activeKey)
console.log(signed.signatures)
```

## Extends

- [`Transaction`](Transaction.md)

## Properties

### expiration

> **expiration**: `string`

Defined in: [src/chain/transaction.ts:69](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/transaction.ts#L69)

UTC expiration timestamp without a trailing timezone suffix.

#### Inherited from

[`Transaction`](Transaction.md).[`expiration`](Transaction.md#expiration)

***

### extensions

> **extensions**: `unknown`[]

Defined in: [src/chain/transaction.ts:78](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/transaction.ts#L78)

Transaction extension values. Hive currently expects this to be empty for
the operations supported by Pollen.

#### Inherited from

[`Transaction`](Transaction.md).[`extensions`](Transaction.md#extensions)

***

### operations

> **operations**: [`Operation`](../type-aliases/Operation.md)[]

Defined in: [src/chain/transaction.ts:73](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/transaction.ts#L73)

Ordered operation list executed atomically by the chain.

#### Inherited from

[`Transaction`](Transaction.md).[`operations`](Transaction.md#operations)

***

### ref\_block\_num

> **ref\_block\_num**: `number`

Defined in: [src/chain/transaction.ts:61](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/transaction.ts#L61)

Lower 16 bits of the referenced head block number.

#### Inherited from

[`Transaction`](Transaction.md).[`ref_block_num`](Transaction.md#ref_block_num)

***

### ref\_block\_prefix

> **ref\_block\_prefix**: `number`

Defined in: [src/chain/transaction.ts:65](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/transaction.ts#L65)

Prefix extracted from the referenced block id.

#### Inherited from

[`Transaction`](Transaction.md).[`ref_block_prefix`](Transaction.md#ref_block_prefix)

***

### signatures

> **signatures**: `string`[]

Defined in: [src/chain/transaction.ts:98](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/transaction.ts#L98)

Hex-encoded recoverable signatures.
