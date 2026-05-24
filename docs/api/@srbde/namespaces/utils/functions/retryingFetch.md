[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / retryingFetch

# Function: retryingFetch()

> **retryingFetch**(`currentAddress`, `allAddresses`, `opts`, `timeout`, `failoverThreshold`, `consoleOnFailover`, `backoff`, `fetchTimeout?`, `retryContext?`): `Promise`\<\{ `currentAddress`: `string`; `response`: `any`; \}\>

Defined in: [src/utils.ts:471](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L471)

Sends an RPC request with ordered node failover and health tracking.

## Parameters

### currentAddress

`string`

Currently active RPC endpoint.

### allAddresses

`string` \| `string`[]

Single endpoint or ordered failover endpoint list.

### opts

`any`

Fetch options including request body and headers.

### timeout

`number`

Overall retry timeout in milliseconds. `0` means unlimited.

### failoverThreshold

`number`

Number of full endpoint rounds before giving up.
`0` means retry until `timeout` stops the call.

### consoleOnFailover

`boolean`

Whether failover events should be logged.

### backoff

(`tries`) => `number`

Function returning the between-round delay.

### fetchTimeout?

(`tries`) => `number`

Optional per-attempt timeout function.

### retryContext?

[`RetryContext`](../interfaces/RetryContext.md)

Optional API and broadcast-safety metadata.

## Returns

`Promise`\<\{ `currentAddress`: `string`; `response`: `any`; \}\>

The JSON-RPC response and endpoint that produced it.

## Remarks

Read operations immediately rotate through healthy nodes and only back off
between full rounds. Broadcasts are intentionally stricter: Pollen retries
only pre-connection failures where the request certainly never reached a node,
preventing duplicate transfers, votes, or posts.

## Throws

Error
Throws the last network, HTTP, timeout, or fetch error after timeout or
failover limits are reached.

## Example

```ts
const { response, currentAddress } = await retryingFetch(
  'https://api.hive.blog',
  ['https://api.hive.blog', 'https://api.openhive.network'],
  opts,
  60_000,
  3,
  false,
  exponentialBackoffWithJitter
)
```
