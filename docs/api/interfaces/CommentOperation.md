[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CommentOperation

# Interface: CommentOperation

Defined in: [src/chain/operation.ts:433](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L433)

Creates or updates a post or reply.

## Remarks

Empty `parent_author` creates a top-level post. Non-empty `parent_author`
creates a reply under the parent author/permlink pair.

## Example

```ts
const op: CommentOperation = ['comment', {
  parent_author: '',
  parent_permlink: 'hive-139531',
  author: 'srbde',
  permlink: 'hello-pollen',
  title: 'Hello Pollen',
  body: 'Posted with Pollen.',
  json_metadata: JSON.stringify({ tags: ['hive-139531'] })
}]
```

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"comment"`

Defined in: [src/chain/operation.ts:434](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L434)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:435](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L435)

#### author

> **author**: `string`

#### body

> **body**: `string`

#### json\_metadata

> **json\_metadata**: `string`

#### parent\_author

> **parent\_author**: `string`

#### parent\_permlink

> **parent\_permlink**: `string`

#### permlink

> **permlink**: `string`

#### title

> **title**: `string`

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
