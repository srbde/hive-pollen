[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DisqussionQuery

# Interface: DisqussionQuery

Defined in: [src/helpers/database.ts:91](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L91)

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

Defined in: [src/helpers/database.ts:100](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L100)

***

### limit

> **limit**: `number`

Defined in: [src/helpers/database.ts:99](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L99)

Number of results, max 100.

***

### parent\_author?

> `optional` **parent\_author?**: `string`

Defined in: [src/helpers/database.ts:117](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L117)

***

### parent\_permlink?

> `optional` **parent\_permlink?**: `string`

Defined in: [src/helpers/database.ts:118](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L118)

***

### select\_authors?

> `optional` **select\_authors?**: `string`[]

Defined in: [src/helpers/database.ts:101](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L101)

***

### select\_tags?

> `optional` **select\_tags?**: `string`[]

Defined in: [src/helpers/database.ts:102](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L102)

***

### start\_author?

> `optional` **start\_author?**: `string`

Defined in: [src/helpers/database.ts:111](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L111)

Name of author to start from, used for paging.
Should be used in conjunction with `start_permlink`.

***

### start\_permlink?

> `optional` **start\_permlink?**: `string`

Defined in: [src/helpers/database.ts:116](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L116)

Permalink of post to start from, used for paging.
Should be used in conjunction with `start_author`.

***

### tag?

> `optional` **tag?**: `string`

Defined in: [src/helpers/database.ts:95](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L95)

Name of author or tag to fetch.

***

### truncate\_body?

> `optional` **truncate\_body?**: `number`

Defined in: [src/helpers/database.ts:106](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/database.ts#L106)

Number of bytes of post body to fetch, default 0 (all)
