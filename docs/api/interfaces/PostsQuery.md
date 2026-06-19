[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / PostsQuery

# Interface: PostsQuery

Defined in: [src/helpers/hivemind.ts:27](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L27)

Query options for ranked Hivemind post feeds.

## Remarks

Bridge ranking supports global feeds, community feeds, pagination, and an
observer account for personalized muted/reputation context.

## Example

```ts
const query: PostsQuery = {
  sort: 'trending',
  tag: 'hive-139531',
  limit: 10,
  observer: 'srbde'
}
```

## Properties

### limit?

> `optional` **limit?**: `number`

Defined in: [src/helpers/hivemind.ts:31](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L31)

Number of posts to fetch

***

### observer?

> `optional` **observer?**: `string`

Defined in: [src/helpers/hivemind.ts:43](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L43)

Observer account

***

### sort

> **sort**: `"hot"` \| `"promoted"` \| `"trending"` \| `"created"` \| `"payout"` \| `"payout_comments"` \| `"muted"`

Defined in: [src/helpers/hivemind.ts:35](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L35)

Sorting posts

***

### start\_author?

> `optional` **start\_author?**: `string`

Defined in: [src/helpers/hivemind.ts:47](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L47)

Paginating last post author

***

### start\_permlink?

> `optional` **start\_permlink?**: `string`

Defined in: [src/helpers/hivemind.ts:51](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L51)

Paginating last post permlink

***

### tag?

> `optional` **tag?**: `string` \| `string`[]

Defined in: [src/helpers/hivemind.ts:39](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/helpers/hivemind.ts#L39)

Filtering with tags
