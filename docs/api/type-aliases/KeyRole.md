[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / KeyRole

# Type Alias: KeyRole

> **KeyRole** = `"owner"` \| `"active"` \| `"posting"` \| `"memo"`

Defined in: [src/crypto.ts:321](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/crypto.ts#L321)

Hive authority role used for password-derived account keys.

## Example

```ts
const role: KeyRole = 'posting'
const key = PrivateKey.fromLogin('srbde', masterPassword, role)
```
