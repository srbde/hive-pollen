[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / HivemindAPI

# Class: HivemindAPI

Defined in: [src/helpers/hivemind.ts:160](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/hivemind.ts#L160)

Helper for Hive Hivemind and bridge API reads.

## Remarks

Hivemind powers social data that is not stored directly in block operations:
ranked posts, community metadata, subscriptions, and notification feeds. This
helper routes calls through the `bridge` API namespace used by modern Hive
front ends.

## Example

```ts
const posts = await client.hivemind.getRankedPosts({
  sort: 'trending',
  tag: 'hive-139531',
  limit: 10
})

console.log(posts.map((post) => post.title))
```

## Constructors

### Constructor

> **new HivemindAPI**(`client`): `HivemindAPI`

Defined in: [src/helpers/hivemind.ts:166](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/hivemind.ts#L166)

Creates a Hivemind helper bound to a client.

#### Parameters

##### client

[`Client`](Client.md)

Client used to call the bridge API namespace.

#### Returns

`HivemindAPI`

## Properties

### client

> `readonly` **client**: [`Client`](Client.md)

Defined in: [src/helpers/hivemind.ts:166](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/hivemind.ts#L166)

Client used to call the bridge API namespace.

## Methods

### call()

> **call**(`method`, `params?`): `Promise`\<`any`\>

Defined in: [src/helpers/hivemind.ts:187](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/hivemind.ts#L187)

Sends a raw bridge API call.

#### Parameters

##### method

`string`

Bridge method name.

##### params?

`any`

Method-specific named parameters.

#### Returns

`Promise`\<`any`\>

The decoded bridge result.

#### Throws

RPCError
Thrown when the active node does not expose bridge or rejects the request.

#### Example

```ts
const posts = await client.hivemind.call('get_ranked_posts', {
  sort: 'hot',
  tag: 'hive-139531',
  limit: 5
})
```

***

### getAccountNotifications()

> **getAccountNotifications**(`options?`): `Promise`\<[`Notifications`](../interfaces/Notifications.md)[]\>

Defined in: [src/helpers/hivemind.ts:297](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/hivemind.ts#L297)

Fetches an account's Hivemind notification feed.

#### Parameters

##### options?

[`AccountNotifsQuery`](../interfaces/AccountNotifsQuery.md)

Account, limit, and optional notification type filter.

#### Returns

`Promise`\<[`Notifications`](../interfaces/Notifications.md)[]\>

Notification records for the account.

#### Throws

RPCError
Thrown when bridge rejects the notification query.

#### Example

```ts
const notifications = await client.hivemind.getAccountNotifications({
  account: 'srbde',
  limit: 25
})
```

***

### getAccountPosts()

> **getAccountPosts**(`options`): `Promise`\<[`Discussion`](../interfaces/Discussion.md)[]\>

Defined in: [src/helpers/hivemind.ts:233](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/hivemind.ts#L233)

Fetches posts authored or surfaced by a specific account.

#### Parameters

##### options

[`AccountPostsQuery`](../interfaces/AccountPostsQuery.md)

Account, pagination, observer, and limit settings.

#### Returns

`Promise`\<[`Discussion`](../interfaces/Discussion.md)[]\>

Discussion records from the account's post feed.

#### Throws

RPCError
Thrown when bridge rejects the account-post query.

#### Example

```ts
const posts = await client.hivemind.getAccountPosts({
  account: 'srbde',
  sort: 'posts',
  limit: 10
})
```

***

### getCommunity()

> **getCommunity**(`options`): `Promise`\<[`CommunityDetail`](../interfaces/CommunityDetail.md)[]\>

Defined in: [src/helpers/hivemind.ts:257](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/hivemind.ts#L257)

Fetches community metadata from Hivemind.

#### Parameters

##### options

[`CommunityQuery`](../interfaces/CommunityQuery.md)

Community name and observer account.

#### Returns

`Promise`\<[`CommunityDetail`](../interfaces/CommunityDetail.md)[]\>

Community detail records including roles, subscribers, and
display metadata.

#### Throws

RPCError
Thrown when the community cannot be read.

#### Example

```ts
const [community] = await client.hivemind.getCommunity({
  name: 'hive-139531',
  observer: 'srbde'
})

console.log(community.title)
```

***

### getRankedPosts()

> **getRankedPosts**(`options`): `Promise`\<[`Discussion`](../interfaces/Discussion.md)[]\>

Defined in: [src/helpers/hivemind.ts:211](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/hivemind.ts#L211)

Fetches ranked posts from Hivemind.

#### Parameters

##### options

[`PostsQuery`](../interfaces/PostsQuery.md)

Sort, tag/community, pagination, observer, and limit
settings.

#### Returns

`Promise`\<[`Discussion`](../interfaces/Discussion.md)[]\>

Discussion records ordered by the selected ranking mode.

#### Throws

RPCError
Thrown when bridge rejects the ranking query.

#### Example

```ts
const posts = await client.hivemind.getRankedPosts({
  sort: 'created',
  tag: 'hive-139531',
  limit: 20,
  observer: 'srbde'
})
```

***

### listAllSubscriptions()

> **listAllSubscriptions**(`account`): `Promise`\<[`Discussion`](../interfaces/Discussion.md)[]\>

Defined in: [src/helpers/hivemind.ts:276](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/hivemind.ts#L276)

Lists communities followed by an account.

#### Parameters

##### account

`string` \| `object`

Account name or bridge-compatible account parameter.

#### Returns

`Promise`\<[`Discussion`](../interfaces/Discussion.md)[]\>

Subscription records containing community and role information.

#### Throws

RPCError
Thrown when bridge rejects the subscription lookup.

#### Example

```ts
const subscriptions = await client.hivemind.listAllSubscriptions('srbde')
console.log(subscriptions)
```

***

### listCommunities()

> **listCommunities**(`options`): `Promise`\<[`CommunityDetail`](../interfaces/CommunityDetail.md)[]\>

Defined in: [src/helpers/hivemind.ts:318](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/hivemind.ts#L318)

Lists communities known to Hivemind.

#### Parameters

##### options

[`ListCommunitiesQuery`](../interfaces/ListCommunitiesQuery.md)

Pagination, limit, query, and observer settings.

#### Returns

`Promise`\<[`CommunityDetail`](../interfaces/CommunityDetail.md)[]\>

Community detail records.

#### Throws

RPCError
Thrown when bridge rejects the community list query.

#### Example

```ts
const communities = await client.hivemind.listCommunities({
  limit: 20,
  observer: 'srbde'
})
```
