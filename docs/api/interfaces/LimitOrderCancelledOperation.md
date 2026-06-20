[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / LimitOrderCancelledOperation

# Interface: LimitOrderCancelledOperation

Defined in: [src/chain/operation.ts:1709](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1709)

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

> **0**: `"limit_order_cancelled"`

Defined in: [src/chain/operation.ts:1710](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1710)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1711](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L1711)

#### amount\_back

> **amount\_back**: `string` \| [`Asset`](../classes/Asset.md)

#### orderid

> **orderid**: `number`

#### seller

> **seller**: `string`

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
