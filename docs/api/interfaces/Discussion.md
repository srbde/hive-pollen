[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Discussion

# Interface: Discussion

Defined in: [src/chain/comment.ts:122](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L122)

Hivemind/condenser discussion record for posts and enriched comments.

## Remarks

`Discussion` extends the base comment object with URL, root title, active
votes, reblog data, pending payout values, and reputation fields used by Hive
front ends.

## Example

```ts
const [post] = await client.hivemind.getRankedPosts({
  sort: 'hot',
  tag: 'hive-139531',
  limit: 1
})

console.log(post.url, post.pending_payout_value)
```

## Extends

- [`Comment`](Comment.md)

## Properties

### abs\_rshares

> **abs\_rshares**: `string`

Defined in: [src/chain/comment.ts:74](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L74)

#### Inherited from

[`Comment`](Comment.md).[`abs_rshares`](Comment.md#abs_rshares)

***

### active

> **active**: `string`

Defined in: [src/chain/comment.ts:69](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L69)

#### Inherited from

[`Comment`](Comment.md).[`active`](Comment.md#active)

***

### active\_votes

> **active\_votes**: [`VoteState`](VoteState.md)[]

Defined in: [src/chain/comment.ts:127](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L127)

***

### allow\_curation\_rewards

> **allow\_curation\_rewards**: `boolean`

Defined in: [src/chain/comment.ts:90](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L90)

#### Inherited from

[`Comment`](Comment.md).[`allow_curation_rewards`](Comment.md#allow_curation_rewards)

***

### allow\_replies

> **allow\_replies**: `boolean`

Defined in: [src/chain/comment.ts:88](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L88)

#### Inherited from

[`Comment`](Comment.md).[`allow_replies`](Comment.md#allow_replies)

***

### allow\_votes

> **allow\_votes**: `boolean`

Defined in: [src/chain/comment.ts:89](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L89)

#### Inherited from

[`Comment`](Comment.md).[`allow_votes`](Comment.md#allow_votes)

***

### author

> **author**: `string`

Defined in: [src/chain/comment.ts:62](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L62)

#### Inherited from

[`Comment`](Comment.md).[`author`](Comment.md#author)

***

### author\_reputation

> **author\_reputation**: `number`

Defined in: [src/chain/comment.ts:129](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L129)

***

### author\_rewards

> **author\_rewards**: `string`

Defined in: [src/chain/comment.ts:83](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L83)

#### Inherited from

[`Comment`](Comment.md).[`author_rewards`](Comment.md#author_rewards)

***

### beneficiaries

> **beneficiaries**: [`BeneficiaryRoute`](BeneficiaryRoute.md)[]

Defined in: [src/chain/comment.ts:91](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L91)

#### Inherited from

[`Comment`](Comment.md).[`beneficiaries`](Comment.md#beneficiaries)

***

### body

> **body**: `string`

Defined in: [src/chain/comment.ts:65](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L65)

#### Inherited from

[`Comment`](Comment.md).[`body`](Comment.md#body)

***

### body\_length

> **body\_length**: `string`

Defined in: [src/chain/comment.ts:131](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L131)

***

### cashout\_time

> **cashout\_time**: `string`

Defined in: [src/chain/comment.ts:77](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L77)

#### Inherited from

[`Comment`](Comment.md).[`cashout_time`](Comment.md#cashout_time)

***

### category

> **category**: `string`

Defined in: [src/chain/comment.ts:59](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L59)

#### Inherited from

[`Comment`](Comment.md).[`category`](Comment.md#category)

***

### children

> **children**: `number`

Defined in: [src/chain/comment.ts:72](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L72)

#### Inherited from

[`Comment`](Comment.md).[`children`](Comment.md#children)

***

### children\_abs\_rshares

> **children\_abs\_rshares**: `string`

Defined in: [src/chain/comment.ts:76](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L76)

#### Inherited from

[`Comment`](Comment.md).[`children_abs_rshares`](Comment.md#children_abs_rshares)

***

### created

> **created**: `string`

Defined in: [src/chain/comment.ts:68](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L68)

#### Inherited from

[`Comment`](Comment.md).[`created`](Comment.md#created)

***

### curator\_payout\_value

> **curator\_payout\_value**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/comment.ts:82](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L82)

#### Inherited from

[`Comment`](Comment.md).[`curator_payout_value`](Comment.md#curator_payout_value)

***

### depth

> **depth**: `number`

Defined in: [src/chain/comment.ts:71](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L71)

#### Inherited from

[`Comment`](Comment.md).[`depth`](Comment.md#depth)

***

### first\_reblogged\_by?

> `optional` **first\_reblogged\_by?**: `string`

Defined in: [src/chain/comment.ts:133](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L133)

***

### first\_reblogged\_on?

> `optional` **first\_reblogged\_on?**: `string`

Defined in: [src/chain/comment.ts:134](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L134)

***

### id

> **id**: `number`

Defined in: [src/chain/comment.ts:58](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L58)

#### Inherited from

[`Comment`](Comment.md).[`id`](Comment.md#id)

***

### json\_metadata

> **json\_metadata**: `string`

Defined in: [src/chain/comment.ts:66](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L66)

#### Inherited from

[`Comment`](Comment.md).[`json_metadata`](Comment.md#json_metadata)

***

### last\_payout

> **last\_payout**: `string`

Defined in: [src/chain/comment.ts:70](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L70)

#### Inherited from

[`Comment`](Comment.md).[`last_payout`](Comment.md#last_payout)

***

### last\_update

> **last\_update**: `string`

Defined in: [src/chain/comment.ts:67](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L67)

#### Inherited from

[`Comment`](Comment.md).[`last_update`](Comment.md#last_update)

***

### max\_accepted\_payout

> **max\_accepted\_payout**: `string`

Defined in: [src/chain/comment.ts:86](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L86)

#### Inherited from

[`Comment`](Comment.md).[`max_accepted_payout`](Comment.md#max_accepted_payout)

***

### max\_cashout\_time

> **max\_cashout\_time**: `string`

Defined in: [src/chain/comment.ts:78](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L78)

#### Inherited from

[`Comment`](Comment.md).[`max_cashout_time`](Comment.md#max_cashout_time)

***

### net\_rshares

> **net\_rshares**: `string`

Defined in: [src/chain/comment.ts:73](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L73)

#### Inherited from

[`Comment`](Comment.md).[`net_rshares`](Comment.md#net_rshares)

***

### net\_votes

> **net\_votes**: `number`

Defined in: [src/chain/comment.ts:84](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L84)

#### Inherited from

[`Comment`](Comment.md).[`net_votes`](Comment.md#net_votes)

***

### parent\_author

> **parent\_author**: `string`

Defined in: [src/chain/comment.ts:60](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L60)

#### Inherited from

[`Comment`](Comment.md).[`parent_author`](Comment.md#parent_author)

***

### parent\_permlink

> **parent\_permlink**: `string`

Defined in: [src/chain/comment.ts:61](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L61)

#### Inherited from

[`Comment`](Comment.md).[`parent_permlink`](Comment.md#parent_permlink)

***

### pending\_payout\_value

> **pending\_payout\_value**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/comment.ts:125](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L125)

***

### percent\_hbd

> **percent\_hbd**: `number`

Defined in: [src/chain/comment.ts:87](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L87)

#### Inherited from

[`Comment`](Comment.md).[`percent_hbd`](Comment.md#percent_hbd)

***

### permlink

> **permlink**: `string`

Defined in: [src/chain/comment.ts:63](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L63)

#### Inherited from

[`Comment`](Comment.md).[`permlink`](Comment.md#permlink)

***

### promoted

> **promoted**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/comment.ts:130](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L130)

***

### reblogged\_by

> **reblogged\_by**: `string`[]

Defined in: [src/chain/comment.ts:132](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L132)

***

### replies

> **replies**: `string`[]

Defined in: [src/chain/comment.ts:128](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L128)

***

### reward\_weight

> **reward\_weight**: `number`

Defined in: [src/chain/comment.ts:80](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L80)

#### Inherited from

[`Comment`](Comment.md).[`reward_weight`](Comment.md#reward_weight)

***

### root\_comment

> **root\_comment**: `number`

Defined in: [src/chain/comment.ts:85](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L85)

#### Inherited from

[`Comment`](Comment.md).[`root_comment`](Comment.md#root_comment)

***

### root\_title

> **root\_title**: `string`

Defined in: [src/chain/comment.ts:124](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L124)

***

### title

> **title**: `string`

Defined in: [src/chain/comment.ts:64](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L64)

#### Inherited from

[`Comment`](Comment.md).[`title`](Comment.md#title)

***

### total\_payout\_value

> **total\_payout\_value**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/comment.ts:81](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L81)

#### Inherited from

[`Comment`](Comment.md).[`total_payout_value`](Comment.md#total_payout_value)

***

### total\_pending\_payout\_value

> **total\_pending\_payout\_value**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/comment.ts:126](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L126)

***

### total\_vote\_weight

> **total\_vote\_weight**: `number`

Defined in: [src/chain/comment.ts:79](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L79)

#### Inherited from

[`Comment`](Comment.md).[`total_vote_weight`](Comment.md#total_vote_weight)

***

### url

> **url**: `string`

Defined in: [src/chain/comment.ts:123](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L123)

***

### vote\_rshares

> **vote\_rshares**: `string`

Defined in: [src/chain/comment.ts:75](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L75)

#### Inherited from

[`Comment`](Comment.md).[`vote_rshares`](Comment.md#vote_rshares)
