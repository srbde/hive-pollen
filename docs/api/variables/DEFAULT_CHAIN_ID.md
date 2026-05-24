[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DEFAULT\_CHAIN\_ID

# Variable: DEFAULT\_CHAIN\_ID

> `const` **DEFAULT\_CHAIN\_ID**: `Buffer`\<`ArrayBuffer`\>

Defined in: [src/client.ts:86](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L86)

Main Hive network chain id as a 32-byte buffer.

## Remarks

The chain id is mixed into transaction signatures. Keeping the default here
prevents signatures produced for Hive mainnet from being replayed on a
different chain.

## Example

```ts
import { DEFAULT_CHAIN_ID } from '@srbde/pollen'

console.log(DEFAULT_CHAIN_ID.toString('hex'))
```
