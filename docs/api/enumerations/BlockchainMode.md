[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / BlockchainMode

# Enumeration: BlockchainMode

Defined in: [src/helpers/blockchain.ts:39](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/helpers/blockchain.ts#L39)

## Enumeration Members

### Irreversible

> **Irreversible**: `0`

Defined in: [src/helpers/blockchain.ts:47](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/helpers/blockchain.ts#L47)

Stream only blocks that the Hive consensus protocol has made irreversible.

#### Remarks

This is the safest mode for indexing, accounting, and other workflows that
must not react to a block that can still be replaced by a fork.

***

### Latest

> **Latest**: `1`

Defined in: [src/helpers/blockchain.ts:55](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/helpers/blockchain.ts#L55)

Stream from the latest head block, including blocks that are still reversible.

#### Remarks

Use this mode when low latency matters more than finality. Applications
should be prepared to reconcile forked blocks when consuming latest mode.
