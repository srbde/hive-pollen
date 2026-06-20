[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CommunityDetail

# Interface: CommunityDetail

Defined in: [src/chain/hivemind.ts:18](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L18)

Community metadata returned by Hivemind bridge calls.

## Remarks

This shape contains presentation metadata, moderation/admin team fields, and
aggregate pending-post counters that Hive front ends use for community pages.

## Example

```ts
const [community] = await client.hivemind.getCommunity({
  name: 'hive-139531',
  observer: 'srbde'
})

console.log(community.title, community.subscribers)
```

## Properties

### about

> **about**: `string`

Defined in: [src/chain/hivemind.ts:22](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L22)

***

### admins?

> `optional` **admins?**: `string`[]

Defined in: [src/chain/hivemind.ts:37](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L37)

***

### avatar\_url

> **avatar\_url**: `string`

Defined in: [src/chain/hivemind.ts:31](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L31)

***

### context

> **context**: `object`

Defined in: [src/chain/hivemind.ts:32](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L32)

***

### created\_at

> **created\_at**: `string`

Defined in: [src/chain/hivemind.ts:30](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L30)

***

### description

> **description**: `string`

Defined in: [src/chain/hivemind.ts:33](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L33)

***

### flag\_text

> **flag\_text**: `string`

Defined in: [src/chain/hivemind.ts:34](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L34)

***

### id

> **id**: `number`

Defined in: [src/chain/hivemind.ts:19](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L19)

***

### is\_nsfw

> **is\_nsfw**: `false`

Defined in: [src/chain/hivemind.ts:25](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L25)

***

### lang

> **lang**: `string`

Defined in: [src/chain/hivemind.ts:23](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L23)

***

### name

> **name**: `string`

Defined in: [src/chain/hivemind.ts:20](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L20)

***

### num\_authors

> **num\_authors**: `number`

Defined in: [src/chain/hivemind.ts:29](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L29)

***

### num\_pending

> **num\_pending**: `number`

Defined in: [src/chain/hivemind.ts:28](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L28)

***

### settings

> **settings**: `object`

Defined in: [src/chain/hivemind.ts:35](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L35)

***

### subscribers

> **subscribers**: `number`

Defined in: [src/chain/hivemind.ts:26](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L26)

***

### sum\_pending

> **sum\_pending**: `number`

Defined in: [src/chain/hivemind.ts:27](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L27)

***

### team?

> `optional` **team?**: `string`[]

Defined in: [src/chain/hivemind.ts:36](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L36)

***

### title

> **title**: `string`

Defined in: [src/chain/hivemind.ts:21](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L21)

***

### type\_id

> **type\_id**: `number`

Defined in: [src/chain/hivemind.ts:24](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/hivemind.ts#L24)
