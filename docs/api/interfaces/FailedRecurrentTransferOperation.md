[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / FailedRecurrentTransferOperation

# Interface: FailedRecurrentTransferOperation

Defined in: [src/chain/operation.ts:1695](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1695)

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

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"failed_recurrent_transfer"`

Defined in: [src/chain/operation.ts:1696](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1696)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1697](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1697)

#### amount

> **amount**: `string` \| [`Asset`](../classes/Asset.md)

#### consecutive\_failures

> **consecutive\_failures**: `number`

#### deleted

> **deleted**: `boolean`

#### extensions

> **extensions**: `any`[]

#### from

> **from**: `string`

#### memo

> **memo**: `string`

#### remaining\_executions

> **remaining\_executions**: `number`

#### to

> **to**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
