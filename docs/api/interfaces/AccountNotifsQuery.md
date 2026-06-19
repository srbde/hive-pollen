[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountNotifsQuery

# Interface: AccountNotifsQuery

Defined in: [src/helpers/hivemind.ts:104](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L104)

Query options for an account notification feed.

## Example

```ts
const query: AccountNotifsQuery = {
  account: 'srbde',
  limit: 25
}
```

## Properties

### account

> **account**: `string`

Defined in: [src/helpers/hivemind.ts:105](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L105)

***

### limit

> **limit**: `number`

Defined in: [src/helpers/hivemind.ts:106](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L106)

***

### type?

> `optional` **type?**: `"new_community"` \| `"pin_post"`

Defined in: [src/helpers/hivemind.ts:107](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L107)
