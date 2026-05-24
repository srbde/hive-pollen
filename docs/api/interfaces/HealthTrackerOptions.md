[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / HealthTrackerOptions

# Interface: HealthTrackerOptions

Defined in: [src/health-tracker.ts:53](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/health-tracker.ts#L53)

Tuning options for Pollen's RPC node health tracker.

## Remarks

These values shape how aggressively a client deprioritizes nodes after
failures, plugin-specific errors, stale head blocks, or HTTP 429 rate limits.

## Example

```ts
const client = new Client(['https://api.hive.blog', 'https://api.openhive.network'], {
  healthTrackerOptions: {
    maxFailuresBeforeCooldown: 2,
    staleBlockThreshold: 15
  }
})
```

## Properties

### apiCooldownMs?

> `optional` **apiCooldownMs?**: `number`

Defined in: [src/health-tracker.ts:63](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/health-tracker.ts#L63)

How long (ms) to deprioritize a node for a specific API after failures.
Default: 60 seconds.

***

### defaultRateLimitMs?

> `optional` **defaultRateLimitMs?**: `number`

Defined in: [src/health-tracker.ts:89](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/health-tracker.ts#L89)

Default duration (ms) to skip a node after receiving a 429 response,
used when the server doesn't provide a Retry-After header.
Default: 10 seconds.

***

### headBlockTtlMs?

> `optional` **headBlockTtlMs?**: `number`

Defined in: [src/health-tracker.ts:83](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/health-tracker.ts#L83)

How long (ms) head block data remains valid for staleness checks.
Default: 2 minutes.

***

### maxApiFailuresBeforeCooldown?

> `optional` **maxApiFailuresBeforeCooldown?**: `number`

Defined in: [src/health-tracker.ts:73](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/health-tracker.ts#L73)

Number of API-specific failures before deprioritizing for that API.
Default: 2.

***

### maxFailuresBeforeCooldown?

> `optional` **maxFailuresBeforeCooldown?**: `number`

Defined in: [src/health-tracker.ts:68](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/health-tracker.ts#L68)

Number of consecutive failures before a node enters cooldown.
Default: 3.

***

### nodeCooldownMs?

> `optional` **nodeCooldownMs?**: `number`

Defined in: [src/health-tracker.ts:58](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/health-tracker.ts#L58)

How long (ms) to deprioritize a node after consecutive failures.
Default: 30 seconds.

***

### staleBlockThreshold?

> `optional` **staleBlockThreshold?**: `number`

Defined in: [src/health-tracker.ts:78](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/health-tracker.ts#L78)

How many blocks behind the best known head block a node can be
before being considered stale. Default: 30.
