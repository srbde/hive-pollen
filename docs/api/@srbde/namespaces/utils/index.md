[**@srbde/pollen**](../../../index.md)

***

[@srbde/pollen](../../../index.md) / utils

# utils

Utility namespace containing byte writers, retry helpers, streams, and
witness-property builders.

## Remarks

Pollen exports utilities as a namespace to keep the primary API focused on
the client and chain models while still exposing protocol tools for advanced
integrations.

## Example

```ts
import { utils } from '@srbde/pollen'

const mask = utils.makeBitMaskFilter([utils.operationOrders.transfer])
```

## Classes

- [BinaryReader](classes/BinaryReader.md)
- [BinaryWriter](classes/BinaryWriter.md)

## Interfaces

- [RetryContext](interfaces/RetryContext.md)
- [WitnessProps](interfaces/WitnessProps.md)

## Variables

- [operationOrders](variables/operationOrders.md)

## Functions

- [assert](functions/assert.md)
- [buildWitnessUpdateOp](functions/buildWitnessUpdateOp.md)
- [bytesEqual](functions/bytesEqual.md)
- [concat](functions/concat.md)
- [copy](functions/copy.md)
- [exponentialBackoffWithJitter](functions/exponentialBackoffWithJitter.md)
- [fromHex](functions/fromHex.md)
- [iteratorStream](functions/iteratorStream.md)
- [makeBitMaskFilter](functions/makeBitMaskFilter.md)
- [retryingFetch](functions/retryingFetch.md)
- [sleep](functions/sleep.md)
- [toHex](functions/toHex.md)
