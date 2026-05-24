[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / exponentialBackoffWithJitter

# Function: exponentialBackoffWithJitter()

> **exponentialBackoffWithJitter**(`tries`, `baseDelay?`, `maxDelay?`, `jitter?`): `number`

Defined in: [src/utils.ts:423](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L423)

Computes an exponential retry delay with random jitter.

## Parameters

### tries

`number`

Number of failed attempts or rounds already observed.

### baseDelay?

`number` = `500`

Initial delay in milliseconds.

### maxDelay?

`number` = `10000`

Maximum exponential component in milliseconds.

### jitter?

`number` = `100`

Maximum random jitter to add in milliseconds.

## Returns

`number`

Delay in milliseconds.

## Remarks

Formula: `min(maxDelay, baseDelay * 2^tries) + random(0, jitter)`.
Jitter keeps many clients from retrying the same Hive RPC nodes in lockstep.

## Example

```ts
const delay = exponentialBackoffWithJitter(2, 500, 10_000, 250)
```
