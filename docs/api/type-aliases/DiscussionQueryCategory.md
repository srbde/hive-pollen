[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DiscussionQueryCategory

# Type Alias: DiscussionQueryCategory

> **DiscussionQueryCategory** = `"active"` \| `"blog"` \| `"cashout"` \| `"children"` \| `"comments"` \| `"feed"` \| `"hot"` \| `"promoted"` \| `"trending"` \| `"votes"` \| `"created"`

Defined in: [src/helpers/database.ts:65](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L65)

Sort or lookup category used by Hive's `get_discussions_by_*` RPC family.

## Remarks

Categories map directly to condenser API method suffixes. For `blog` and
`feed`, Hive expects the query `tag` to be an account name rather than a
content tag.

## Example

```ts
const posts = await client.database.getDiscussions('trending', {
  tag: 'hive-139531',
  limit: 10
})
```
