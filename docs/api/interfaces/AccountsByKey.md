[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountsByKey

# Interface: AccountsByKey

Defined in: [src/helpers/key.ts:9](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/key.ts#L9)

## Properties

### accounts

> **accounts**: `string`[][]

Defined in: [src/helpers/key.ts:17](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/helpers/key.ts#L17)

Account names grouped by the queried public key order.

#### Remarks

Each inner array contains the accounts that reference the corresponding
public key in owner or active authorities.
