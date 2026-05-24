[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DEFAULT\_CHAIN\_ID

# Variable: DEFAULT\_CHAIN\_ID

> `const` **DEFAULT\_CHAIN\_ID**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [src/client.ts:88](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/client.ts#L88)

Main Hive network chain id as 32 raw bytes.

## Remarks

The chain id is mixed into transaction signatures. Keeping the default here
prevents signatures produced for Hive mainnet from being replayed on a
different chain.

## Example

```ts
import { DEFAULT_CHAIN_ID } from '@srbde/pollen'

console.log(toHex(DEFAULT_CHAIN_ID))
```
