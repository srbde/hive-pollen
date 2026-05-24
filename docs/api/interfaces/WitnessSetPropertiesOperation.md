[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / WitnessSetPropertiesOperation

# Interface: WitnessSetPropertiesOperation

Defined in: [src/chain/operation.ts:1127](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L1127)

Generic Hive operation tuple.

## Remarks

Position `0` is the operation name; position `1` is the payload object. Use
the specific operation interfaces when constructing transactions so TypeScript
can validate the payload shape.

## Example

```ts
const op: Operation = ['transfer', {
  from: 'srbde',
  to: 'alice',
  amount: '1.000 HIVE',
  memo: 'Pollen'
}]
```

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"witness_set_properties"`

Defined in: [src/chain/operation.ts:1128](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L1128)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1129](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L1129)

#### extensions

> **extensions**: `any`[]

#### owner

> **owner**: `string`

#### props

> **props**: \[`string`, `string`\][]

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
