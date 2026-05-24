[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / EscrowReleaseOperation

# Interface: EscrowReleaseOperation

Defined in: [src/chain/operation.ts:658](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L658)

This operation can be used by anyone associated with the escrow transfer to
release funds if they have permission.

The permission scheme is as follows:
If there is no dispute and escrow has not expired, either party can release funds to the other.
If escrow expires and there is no dispute, either party can release funds to either party.
If there is a dispute regardless of expiration, the agent can release funds to either party
   following whichever agreement was in place between the parties.

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"escrow_release"`

Defined in: [src/chain/operation.ts:659](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L659)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:660](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/operation.ts#L660)

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

[`Operation`](Operation.md).[`1`](Operation.md#1)
