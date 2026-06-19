[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CommentOperation

# Interface: CommentOperation

Defined in: [src/chain/operation.ts:536](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L536)

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

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"comment"`

Defined in: [src/chain/operation.ts:537](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L537)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:538](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L538)

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

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
