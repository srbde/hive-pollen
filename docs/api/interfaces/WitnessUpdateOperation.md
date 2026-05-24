[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / WitnessUpdateOperation

# Interface: WitnessUpdateOperation

Defined in: [src/chain/operation.ts:1213](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1213)

Users who wish to become a witness must pay a fee acceptable to
the current witnesses to apply for the position and allow voting
to begin.

If the owner isn't a witness they will become a witness.  Witnesses
are charged a fee equal to 1 weeks worth of witness pay which in
turn is derived from the current share supply.  The fee is
only applied if the owner is not already a witness.

If the block_signing_key is null then the witness is removed from
contention.  The network will pick the top 21 witnesses for
producing blocks.

## Extends

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"witness_update"`

Defined in: [src/chain/operation.ts:1214](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1214)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:1215](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/operation.ts#L1215)

#### block\_signing\_key

> **block\_signing\_key**: `string` \| [`PublicKey`](../classes/PublicKey.md) \| `null`

#### fee

> **fee**: `string` \| [`Asset`](../classes/Asset.md)

The fee paid to register a new witness, should be 10x current block production pay.

#### owner

> **owner**: `string`

#### props

> **props**: [`ChainProperties`](ChainProperties.md)

#### url

> **url**: `string`

URL for witness, usually a link to a post in the witness-category tag.

#### Overrides

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
