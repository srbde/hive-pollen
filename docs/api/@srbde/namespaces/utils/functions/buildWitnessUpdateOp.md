[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / buildWitnessUpdateOp

# Function: buildWitnessUpdateOp()

> **buildWitnessUpdateOp**(`owner`, `props`): [`WitnessSetPropertiesOperation`](../../../../interfaces/WitnessSetPropertiesOperation.md)

Defined in: [src/utils.ts:721](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L721)

Builds a Hive `witness_set_properties` operation from friendly property values.

## Parameters

### owner

`string`

Witness account name.

### props

[`WitnessProps`](../interfaces/WitnessProps.md)

Witness properties to serialize into sorted hex pairs.

## Returns

[`WitnessSetPropertiesOperation`](../../../../interfaces/WitnessSetPropertiesOperation.md)

A ready-to-broadcast `witness_set_properties` operation.

## Remarks

Hive expects witness property values to be pre-serialized hex strings in a
sorted flat map. This helper keeps that low-level representation out of
application code.

## Throws

Error
Thrown when `props` contains an unsupported witness property.

## Example

```ts
const op = buildWitnessUpdateOp('srbde-witness', {
  key: signingPublicKey,
  maximum_block_size: 65_536,
  url: 'https://example.com/witness'
})
```
