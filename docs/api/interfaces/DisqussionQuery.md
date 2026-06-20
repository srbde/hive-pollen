[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DisqussionQuery

# Interface: DisqussionQuery

Defined in: [src/helpers/database.ts:216](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L216)

Query shape accepted by Hive discussion listing endpoints.

## Remarks

The name is preserved for API compatibility even though the historical type
spelling is `DisqussionQuery`.

## Example

```ts
const query: DisqussionQuery = {
  tag: 'photography',
  limit: 20,
  truncate_body: 512
}
```

## Properties

### filter\_tags?

> `optional` **filter\_tags?**: `string`[]

Defined in: [src/helpers/database.ts:225](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L225)

***

### limit

> **limit**: `number`

Defined in: [src/helpers/database.ts:224](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L224)

Number of results, max 100.

***

### parent\_author?

> `optional` **parent\_author?**: `string`

Defined in: [src/helpers/database.ts:242](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L242)

***

### parent\_permlink?

> `optional` **parent\_permlink?**: `string`

Defined in: [src/helpers/database.ts:243](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L243)

***

### select\_authors?

> `optional` **select\_authors?**: `string`[]

Defined in: [src/helpers/database.ts:226](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L226)

***

### select\_tags?

> `optional` **select\_tags?**: `string`[]

Defined in: [src/helpers/database.ts:227](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L227)

***

### start\_author?

> `optional` **start\_author?**: `string`

Defined in: [src/helpers/database.ts:236](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L236)

Name of author to start from, used for paging.
Should be used in conjunction with `start_permlink`.

***

### start\_permlink?

> `optional` **start\_permlink?**: `string`

Defined in: [src/helpers/database.ts:241](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L241)

Permalink of post to start from, used for paging.
Should be used in conjunction with `start_author`.

***

### tag?

> `optional` **tag?**: `string`

Defined in: [src/helpers/database.ts:220](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L220)

Name of author or tag to fetch.

***

### truncate\_body?

> `optional` **truncate\_body?**: `number`

Defined in: [src/helpers/database.ts:231](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/database.ts#L231)

Number of bytes of post body to fetch, default 0 (all)
