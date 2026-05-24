[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DisqussionQuery

# Interface: DisqussionQuery

Defined in: [src/helpers/database.ts:94](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L94)

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

Defined in: [src/helpers/database.ts:103](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L103)

***

### limit

> **limit**: `number`

Defined in: [src/helpers/database.ts:102](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L102)

Number of results, max 100.

***

### parent\_author?

> `optional` **parent\_author?**: `string`

Defined in: [src/helpers/database.ts:120](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L120)

***

### parent\_permlink?

> `optional` **parent\_permlink?**: `string`

Defined in: [src/helpers/database.ts:121](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L121)

***

### select\_authors?

> `optional` **select\_authors?**: `string`[]

Defined in: [src/helpers/database.ts:104](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L104)

***

### select\_tags?

> `optional` **select\_tags?**: `string`[]

Defined in: [src/helpers/database.ts:105](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L105)

***

### start\_author?

> `optional` **start\_author?**: `string`

Defined in: [src/helpers/database.ts:114](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L114)

Name of author to start from, used for paging.
Should be used in conjunction with `start_permlink`.

***

### start\_permlink?

> `optional` **start\_permlink?**: `string`

Defined in: [src/helpers/database.ts:119](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L119)

Permalink of post to start from, used for paging.
Should be used in conjunction with `start_author`.

***

### tag?

> `optional` **tag?**: `string`

Defined in: [src/helpers/database.ts:98](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L98)

Name of author or tag to fetch.

***

### truncate\_body?

> `optional` **truncate\_body?**: `number`

Defined in: [src/helpers/database.ts:109](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/database.ts#L109)

Number of bytes of post body to fetch, default 0 (all)
