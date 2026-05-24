[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ClientOptions

# Interface: ClientOptions

Defined in: [src/client.ts:172](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/client.ts#L172)

Configuration for a [Client](../classes/Client.md) instance.

## Remarks

Options control both protocol identity, such as `chainId` and
`addressPrefix`, and resilience behavior, such as timeout, failover, and
jittered backoff. A single configured client owns the Nectar helpers for
database reads, broadcasting, RC, Hivemind, and transaction-status calls.

## Example

```ts
import { Client } from '@srbde/pollen'

const client = new Client(
  ['https://api.hive.blog', 'https://api.openhive.network'],
  {
    timeout: 45_000,
    failoverThreshold: 2,
    consoleOnFailover: true
  }
)
```

## Properties

### addressPrefix?

> `optional` **addressPrefix?**: `string`

Defined in: [src/client.ts:184](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/client.ts#L184)

Hive address prefix. Defaults to main network:
`STM`

***

### agent?

> `optional` **agent?**: `unknown`

Defined in: [src/client.ts:217](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/client.ts#L217)

Node.js http(s) agent, use if you want http keep-alive.
Defaults to using https.globalAgent.

#### See

https://nodejs.org/api/http.html#http_new_agent_options.

***

### backoff?

> `optional` **backoff?**: (`tries`) => `number`

Defined in: [src/client.ts:211](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/client.ts#L211)

Retry backoff function, returns milliseconds. Defaults to Pollen's
jittered exponential backoff.

#### Parameters

##### tries

`number`

#### Returns

`number`

***

### chainId?

> `optional` **chainId?**: `string`

Defined in: [src/client.ts:179](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/client.ts#L179)

Hive chain id. Defaults to main hive network:
need the new id?
`beeab0de00000000000000000000000000000000000000000000000000000000`

***

### consoleOnFailover?

> `optional` **consoleOnFailover?**: `boolean`

Defined in: [src/client.ts:205](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/client.ts#L205)

Whether a console.log should be made when RPC failed over to another one

***

### failoverThreshold?

> `optional` **failoverThreshold?**: `number`

Defined in: [src/client.ts:200](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/client.ts#L200)

Specifies the amount of times the urls (RPC nodes) should be
iterated and retried in case of timeout errors.
(important) Requires url parameter to be an array (string[])!
Can be set to 0 to iterate and retry forever. Defaults to 3 rounds.

***

### healthTrackerOptions?

> `optional` **healthTrackerOptions?**: [`HealthTrackerOptions`](HealthTrackerOptions.md)

Defined in: [src/client.ts:222](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/client.ts#L222)

Options for the node health tracker.
Controls cooldown periods, stale block thresholds, etc.

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [src/client.ts:192](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/client.ts#L192)

Send timeout, how long to wait in milliseconds before giving
up on a rpc call. Note that this is not an exact timeout,
no in-flight requests will be aborted, they will just not
be retried any more past the timeout.
Can be set to 0 to retry forever. Defaults to 60 * 1000 ms.
