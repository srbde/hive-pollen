[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountPostsQuery

# Interface: AccountPostsQuery

Defined in: [src/helpers/hivemind.ts:69](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/hivemind.ts#L69)

Query options for posts associated with a specific account.

## Example

```ts
const query: AccountPostsQuery = {
  account: 'srbde',
  sort: 'posts',
  limit: 10
}
```

## Extends

- `Omit`\<[`PostsQuery`](PostsQuery.md), `"sort"`\>

## Properties

### account

> **account**: `string`

Defined in: [src/helpers/hivemind.ts:70](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/hivemind.ts#L70)

***

### limit?

> `optional` **limit?**: `number`

Defined in: [src/helpers/hivemind.ts:31](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/hivemind.ts#L31)

Number of posts to fetch

#### Inherited from

[`PostsQuery`](PostsQuery.md).[`limit`](PostsQuery.md#limit)

***

### observer?

> `optional` **observer?**: `string`

Defined in: [src/helpers/hivemind.ts:43](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/hivemind.ts#L43)

Observer account

#### Inherited from

[`PostsQuery`](PostsQuery.md).[`observer`](PostsQuery.md#observer)

***

### sort

> **sort**: `"posts"`

Defined in: [src/helpers/hivemind.ts:71](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/hivemind.ts#L71)

***

### start\_author?

> `optional` **start\_author?**: `string`

Defined in: [src/helpers/hivemind.ts:47](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/hivemind.ts#L47)

Paginating last post author

#### Inherited from

[`PostsQuery`](PostsQuery.md).[`start_author`](PostsQuery.md#start_author)

***

### start\_permlink?

> `optional` **start\_permlink?**: `string`

Defined in: [src/helpers/hivemind.ts:51](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/hivemind.ts#L51)

Paginating last post permlink

#### Inherited from

[`PostsQuery`](PostsQuery.md).[`start_permlink`](PostsQuery.md#start_permlink)

***

### tag?

> `optional` **tag?**: `string` \| `string`[]

Defined in: [src/helpers/hivemind.ts:39](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/hivemind.ts#L39)

Filtering with tags

#### Inherited from

[`PostsQuery`](PostsQuery.md).[`tag`](PostsQuery.md#tag)
