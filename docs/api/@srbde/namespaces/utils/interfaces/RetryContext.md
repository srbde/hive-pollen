[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / RetryContext

# Interface: RetryContext

Defined in: [src/utils.ts:64](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L64)

Context for smart retry and failover decisions.

## Remarks

The client passes this metadata into [retryingFetch](../functions/retryingFetch.md) so the transport
can distinguish read calls from broadcasts and record node health at the
correct API granularity.

## Example

```ts
const retryContext: RetryContext = {
  healthTracker: client.healthTracker,
  api: 'condenser_api',
  isBroadcast: false
}
```

## Properties

### api?

> `optional` **api?**: `string`

Defined in: [src/utils.ts:68](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L68)

The API being called (e.g. "bridge", "condenser_api", "database_api")

***

### consoleOnFailover?

> `optional` **consoleOnFailover?**: `boolean`

Defined in: [src/utils.ts:72](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L72)

Whether to log failover events to console

***

### healthTracker?

> `optional` **healthTracker?**: [`NodeHealthTracker`](../../../../classes/NodeHealthTracker.md)

Defined in: [src/utils.ts:66](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L66)

Health tracker instance for per-node, per-API tracking

***

### isBroadcast?

> `optional` **isBroadcast?**: `boolean`

Defined in: [src/utils.ts:70](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L70)

Whether this is a broadcast operation — never retry after request may have been received
