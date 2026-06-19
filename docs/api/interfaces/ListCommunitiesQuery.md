[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ListCommunitiesQuery

# Interface: ListCommunitiesQuery

Defined in: [src/helpers/hivemind.ts:121](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L121)

Query options for listing communities known to Hivemind.

## Example

```ts
const query: ListCommunitiesQuery = {
  limit: 20,
  observer: 'srbde'
}
```

## Properties

### last?

> `optional` **last?**: `string`

Defined in: [src/helpers/hivemind.ts:125](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L125)

Paginating last

***

### limit

> **limit**: `number`

Defined in: [src/helpers/hivemind.ts:129](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L129)

Number of communities to fetch

***

### observer?

> `optional` **observer?**: `string`

Defined in: [src/helpers/hivemind.ts:137](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L137)

Observer account

***

### query?

> `optional` **query?**: `any`

Defined in: [src/helpers/hivemind.ts:133](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L133)

To be developed, not ready yet
