[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ChainProperties

# Interface: ChainProperties

Defined in: [src/chain/misc.ts:120](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L120)

Chain properties voted on by Hive witnesses.

## Remarks

Witnesses publish these values and the chain uses the median active-witness
values for account creation fee, block capacity, and HBD interest.

## Example

```ts
const props = await client.database.getChainProperties()
console.log(props.account_creation_fee)
```

## Properties

### account\_creation\_fee

> **account\_creation\_fee**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:132](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L132)

This fee, paid in HIVE, is converted into VESTING SHARES for the new account. Accounts
without vesting shares cannot earn usage rations and therefore are powerless. This minimum
fee requires all accounts to have some kind of commitment to the network that includes the
ability to vote and make transactions.

#### Remarks

This has to be multiplied by STEEMIT ? `CREATE_ACCOUNT_WITH_HIVE_MODIFIER`
(defined as 30 on the main chain) to get the minimum fee needed to create an account.

***

### hbd\_interest\_rate

> **hbd\_interest\_rate**: `number`

Defined in: [src/chain/misc.ts:141](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L141)

The HBD interest percentage rate decided by witnesses, expressed 0 to 10000.

***

### maximum\_block\_size

> **maximum\_block\_size**: `number`

Defined in: [src/chain/misc.ts:137](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L137)

This witnesses vote for the maximum_block_size which is used by the network
to tune rate limiting and capacity.
