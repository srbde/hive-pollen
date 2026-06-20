[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / retryingFetch

# Function: retryingFetch()

> **retryingFetch**(`currentAddress`, `allAddresses`, `opts`, `timeout`, `failoverThreshold`, `consoleOnFailover`, `backoff`, `fetchTimeout?`, `retryContext?`): `Promise`\<\{ `currentAddress`: `string`; `response`: `any`; \}\>

Defined in: [src/utils.ts:484](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L484)

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
