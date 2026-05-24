[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / HardforkHiveOperation

# Interface: HardforkHiveOperation

Defined in: [src/chain/operation.ts:1543](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1543)

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

> **0**: `"hardfork_hive"`

Defined in: [src/chain/operation.ts:1544](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1544)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1545](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1545)

#### account

> **account**: `string`

#### hbd\_transferred

> **hbd\_transferred**: `string` \| [`Asset`](../classes/Asset.md)

#### hive\_transferred

> **hive\_transferred**: `string` \| [`Asset`](../classes/Asset.md)

#### other\_affected\_accounts

> **other\_affected\_accounts**: `string`[]

#### total\_hive\_from\_vests

> **total\_hive\_from\_vests**: `string` \| [`Asset`](../classes/Asset.md)

#### treasury

> **treasury**: `string`

#### vests\_converted

> **vests\_converted**: `string` \| [`Asset`](../classes/Asset.md)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
