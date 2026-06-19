[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / EscrowReleaseOperation

# Interface: EscrowReleaseOperation

Defined in: [src/chain/operation.ts:761](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L761)

This operation can be used by anyone associated with the escrow transfer to
release funds if they have permission.

The permission scheme is as follows:
If there is no dispute and escrow has not expired, either party can release funds to the other.
If escrow expires and there is no dispute, either party can release funds to either party.
If there is a dispute regardless of expiration, the agent can release funds to either party
   following whichever agreement was in place between the parties.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"escrow_release"`

Defined in: [src/chain/operation.ts:762](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L762)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:763](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L763)

#### agent

> **agent**: `string`

#### escrow\_id

> **escrow\_id**: `number`

#### from

> **from**: `string`

#### hbd\_amount

> **hbd\_amount**: `string` \| [`Asset`](../classes/Asset.md)

The amount of hbd to release.

#### hive\_amount

> **hive\_amount**: `string` \| [`Asset`](../classes/Asset.md)

The amount of hive to release.

#### receiver

> **receiver**: `string`

The account that should receive funds (might be from, might be to).

#### to

> **to**: `string`

The original 'to'.

#### who

> **who**: `string`

The account that is attempting to release the funds, determines valid 'receiver'.

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
