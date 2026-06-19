[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / EscrowRejectedOperation

# Interface: EscrowRejectedOperation

Defined in: [src/chain/operation.ts:1755](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1755)

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

> **0**: `"escrow_rejected"`

Defined in: [src/chain/operation.ts:1756](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1756)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1757](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L1757)

#### agent

> **agent**: `string`

#### escrow\_id

> **escrow\_id**: `number`

#### fee

> **fee**: `string` \| [`Asset`](../classes/Asset.md)

#### from

> **from**: `string`

#### hbd\_amount

> **hbd\_amount**: `string` \| [`Asset`](../classes/Asset.md)

#### hive\_amount

> **hive\_amount**: `string` \| [`Asset`](../classes/Asset.md)

#### to

> **to**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
