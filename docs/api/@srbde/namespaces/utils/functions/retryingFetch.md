[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / retryingFetch

# Function: retryingFetch()

> **retryingFetch**(`currentAddress`, `allAddresses`, `opts`, `timeout`, `failoverThreshold`, `consoleOnFailover`, `backoff`, `fetchTimeout?`, `retryContext?`): `Promise`\<\{ `currentAddress`: `string`; `response`: `any`; \}\>

Defined in: [src/utils.ts:477](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L477)

Sends an RPC request with ordered node failover and health tracking.

## Parameters

### currentAddress

`string`

### allAddresses

`string` \| `string`[]

### opts

`any`

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
