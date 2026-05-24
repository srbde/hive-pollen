[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / waitForEvent

# Function: waitForEvent()

> **waitForEvent**\<`T`\>(`emitter`, `eventName`): `Promise`\<`T`\>

Defined in: [src/utils.ts:297](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L297)

Resolves the next time an event emitter emits a specific event.

## Type Parameters

### T

`T`

## Parameters

### emitter

`EventEmitter`

Event emitter or stream to observe.

### eventName

`string` \| `symbol`

Event name or symbol to wait for.

## Returns

`Promise`\<`T`\>

A promise for the first emitted event payload.

## Example

```ts
await waitForEvent(stream, 'drain')
```
