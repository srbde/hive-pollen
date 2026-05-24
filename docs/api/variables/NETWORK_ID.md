[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / NETWORK\_ID

# Variable: NETWORK\_ID

> `const` **NETWORK\_ID**: `Buffer`\<`ArrayBuffer`\>

Defined in: [src/crypto.ts:63](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L63)

Network marker byte used by Hive WIF private keys.

## Remarks

Hive private keys use the same `0x80` prefix convention as Bitcoin-style WIF
keys before adding the double-SHA-256 checksum.

## Example

```ts
import { NETWORK_ID } from '@srbde/pollen'

console.log(NETWORK_ID.toString('hex')) // "80"
```
