[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DelegateVestingSharesOperation

# Interface: DelegateVestingSharesOperation

Defined in: [src/chain/operation.ts:686](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L686)

Delegates vesting shares from one account to another.

## Remarks

Set `vesting_shares` to `0.000000 VESTS` to remove an existing delegation.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"delegate_vesting_shares"`

Defined in: [src/chain/operation.ts:687](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L687)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:688](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L688)

#### delegatee

> **delegatee**: `string`

The account receiving vesting shares.

#### delegator

> **delegator**: `string`

The account delegating vesting shares.

#### vesting\_shares

> **vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

The amount of vesting shares delegated.

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
