[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / retryingFetch

# Function: retryingFetch()

> **retryingFetch**(`currentAddress`, `allAddresses`, `opts`, `timeout`, `failoverThreshold`, `consoleOnFailover`, `backoff`, `fetchTimeout?`, `retryContext?`): `Promise`\<\{ `currentAddress`: `string`; `response`: `any`; \}\>

Defined in: [src/utils.ts:484](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/utils.ts#L484)

Sends an RPC request with ordered node failover and health tracking.

## Parameters

### currentAddress

`string`

### allAddresses

`string` \| `string`[]

### opts

`RequestInit` & `object`

### timeout

`number`

### failoverThreshold

`number`

### consoleOnFailover

`boolean`

### backoff

(`tries`) => `number`

### fetchTimeout?

(`tries`) => `number`

### retryContext?

[`RetryContext`](../interfaces/RetryContext.md)

## Returns

`Promise`\<\{ `currentAddress`: `string`; `response`: `any`; \}\>
