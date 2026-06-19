[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / BlockchainStreamOptions

# Interface: BlockchainStreamOptions

Defined in: [src/helpers/blockchain.ts:76](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/blockchain.ts#L76)

Controls the block range and finality policy used by blockchain streams.

## Example

```ts
import { BlockchainMode, Client } from '@srbde/pollen'

const client = new Client('https://api.hive.blog')

for await (const block of client.blockchain.getBlocks({
  from: 90_000_000,
  to: 90_000_010,
  mode: BlockchainMode.Irreversible
})) {
  console.log(block.block_id)
}
```

## Properties

### from?

> `optional` **from?**: `number`

Defined in: [src/helpers/blockchain.ts:80](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/blockchain.ts#L80)

Start block number, inclusive. If omitted generation will start from current block height.

***

### mode?

> `optional` **mode?**: [`BlockchainMode`](../enumerations/BlockchainMode.md)

Defined in: [src/helpers/blockchain.ts:89](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/blockchain.ts#L89)

Streaming mode, if set to `Latest` may include blocks that are not applied to the final chain.
Defaults to `Irreversible`.

***

### to?

> `optional` **to?**: `number`

Defined in: [src/helpers/blockchain.ts:84](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/blockchain.ts#L84)

End block number, inclusive. If omitted stream will continue indefinitely.
