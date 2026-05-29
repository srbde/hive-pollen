[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / exponentialBackoffWithJitter

# Function: exponentialBackoffWithJitter()

> **exponentialBackoffWithJitter**(`tries`, `baseDelay?`, `maxDelay?`, `jitter?`): `number`

Defined in: [src/utils.ts:471](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/utils.ts#L471)

Computes an exponential retry delay with random jitter.

## Parameters

### tries

`number`

### baseDelay?

`number` = `500`

### maxDelay?

`number` = `10000`

### jitter?

`number` = `100`

## Returns

`number`
