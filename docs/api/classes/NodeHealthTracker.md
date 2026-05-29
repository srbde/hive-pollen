[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / NodeHealthTracker

# Class: NodeHealthTracker

Defined in: [src/health-tracker.ts:112](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L112)

Tracks per-node health for resilient Hive RPC failover.

## Remarks

`NodeHealthTracker` separates global node failures from API/plugin-specific
failures. A node missing `rc_api` can be deprioritized for RC calls while
remaining available for database reads. It also tracks rate-limit cooldowns
and stale head-block data so Pollen can prefer fresher nodes.

## Example

```ts
const tracker = new NodeHealthTracker({ staleBlockThreshold: 20 })
tracker.recordSuccess('https://api.hive.blog', 'condenser_api')

const ordered = tracker.getOrderedNodes([
  'https://api.hive.blog',
  'https://api.openhive.network'
])
```

## Constructors

### Constructor

> **new NodeHealthTracker**(`options?`): `NodeHealthTracker`

Defined in: [src/health-tracker.ts:130](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L130)

Creates a health tracker with optional cooldown and freshness tuning.

#### Parameters

##### options?

[`HealthTrackerOptions`](../interfaces/HealthTrackerOptions.md) = `{}`

Health tracker thresholds and cooldown durations.

#### Returns

`NodeHealthTracker`

## Methods

### getHealthSnapshot()

> **getHealthSnapshot**(): `Map`\<`string`, \{ `apiFailures`: `Record`\<`string`, \{ `count`: `number`; \}\>; `consecutiveFailures`: `number`; `headBlock`: `number`; `healthy`: `boolean`; \}\>

Defined in: [src/health-tracker.ts:406](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L406)

Returns a diagnostic snapshot of tracked node health.

#### Returns

`Map`\<`string`, \{ `apiFailures`: `Record`\<`string`, \{ `count`: `number`; \}\>; `consecutiveFailures`: `number`; `headBlock`: `number`; `healthy`: `boolean`; \}\>

A map keyed by node URL with failure counts, head block, API
failure counts, and current health.

#### Example

```ts
for (const [node, health] of tracker.getHealthSnapshot()) {
  console.log(node, health.healthy)
}
```

***

### getOrderedNodes()

> **getOrderedNodes**(`allNodes`, `api?`): `string`[]

Defined in: [src/health-tracker.ts:364](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L364)

Orders endpoint URLs by current health for an API call.

#### Parameters

##### allNodes

`string`[]

Endpoints in caller-preferred order.

##### api?

`string`

Optional API namespace for plugin-specific health.

#### Returns

`string`[]

Healthy nodes first, preserving relative order, followed by
unhealthy nodes as fallback.

#### Example

```ts
const ordered = tracker.getOrderedNodes(nodes, 'condenser_api')
```

***

### isNodeHealthy()

> **isNodeHealthy**(`node`, `api?`): `boolean`

Defined in: [src/health-tracker.ts:308](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L308)

Checks whether a node should be preferred for a given API.

#### Parameters

##### node

`string`

RPC endpoint URL.

##### api?

`string`

Optional API namespace for plugin-specific health.

#### Returns

`boolean`

True when the node is not cooling down, rate-limited, or stale.

#### Example

```ts
const healthy = tracker.isNodeHealthy('https://api.hive.blog', 'bridge')
```

***

### isRateLimited()

> **isRateLimited**(`node`): `boolean`

Defined in: [src/health-tracker.ts:235](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L235)

Checks whether a node is currently in a rate-limit cooldown.

#### Parameters

##### node

`string`

RPC endpoint URL.

#### Returns

`boolean`

True when a prior 429 cooldown has not expired.

#### Example

```ts
if (!tracker.isRateLimited(node)) {
  // node can be attempted
}
```

***

### recordApiFailure()

> **recordApiFailure**(`node`, `api`): `void`

Defined in: [src/health-tracker.ts:257](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L257)

Records an API/plugin-specific failure.

#### Parameters

##### node

`string`

RPC endpoint URL.

##### api

`string`

API namespace that failed.

#### Returns

`void`

#### Remarks

This does not increment the global node failure counter. It is designed for
cases such as `method not found` where one plugin is disabled but other APIs
on the same node may still be healthy.

#### Example

```ts
tracker.recordApiFailure('https://api.hive.blog', 'transaction_status_api')
```

***

### recordFailure()

> **recordFailure**(`node`, `api`): `void`

Defined in: [src/health-tracker.ts:191](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L191)

Records a network-level failure for a node and API.

#### Parameters

##### node

`string`

RPC endpoint URL.

##### api

`string`

API namespace that failed.

#### Returns

`void`

#### Remarks

Network failures increment both the global consecutive failure count and the
API-specific failure count because they make the whole endpoint suspect.

#### Example

```ts
tracker.recordFailure('https://api.hive.blog', 'bridge')
```

***

### recordRateLimit()

> **recordRateLimit**(`node`, `retryAfterSeconds?`): `void`

Defined in: [src/health-tracker.ts:214](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L214)

Records that a node returned HTTP 429.

#### Parameters

##### node

`string`

RPC endpoint URL.

##### retryAfterSeconds?

`number`

Optional `Retry-After` header value in seconds.

#### Returns

`void`

#### Remarks

Rate-limited nodes are skipped until their cooldown expires. If the server
omits `Retry-After`, Pollen uses `defaultRateLimitMs`.

#### Example

```ts
tracker.recordRateLimit('https://api.hive.blog', 10)
```

***

### recordSuccess()

> **recordSuccess**(`node`, `api`): `void`

Defined in: [src/health-tracker.ts:170](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L170)

Records a successful call to a node for a specific API.

#### Parameters

##### node

`string`

RPC endpoint URL.

##### api

`string`

API namespace that succeeded.

#### Returns

`void`

#### Remarks

Success clears the global consecutive failure counter and any API-specific
failures for the namespace that just succeeded.

#### Example

```ts
tracker.recordSuccess('https://api.hive.blog', 'condenser_api')
```

***

### reset()

> **reset**(): `void`

Defined in: [src/health-tracker.ts:387](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L387)

Clears all tracked health, rate-limit, and freshness data.

#### Returns

`void`

#### Example

```ts
tracker.reset()
```

***

### updateHeadBlock()

> **updateHeadBlock**(`node`, `headBlock`): `void`

Defined in: [src/health-tracker.ts:285](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/health-tracker.ts#L285)

Updates the last observed head block number for a node.

#### Parameters

##### node

`string`

RPC endpoint URL.

##### headBlock

`number`

Head block number reported by the node.

#### Returns

`void`

#### Remarks

The client calls this passively when
`get_dynamic_global_properties` responses are observed, allowing failover to
prefer nodes that are not lagging behind the best known head.

#### Example

```ts
tracker.updateHeadBlock('https://api.hive.blog', 90_000_000)
```
