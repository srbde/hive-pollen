[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / VestingDelegation

# Interface: VestingDelegation

Defined in: [src/chain/misc.ts:157](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L157)

Vesting-share delegation from one account to another.

## Remarks

Delegated VESTS remain owned by the delegator but transfer voting influence
and RC capacity to the delegatee until removed and cooled down.

## Example

```ts
const delegations = await client.database.getVestingDelegations('srbde')
console.log(delegations[0]?.delegatee)
```

## Properties

### delegatee

> **delegatee**: `string`

Defined in: [src/chain/misc.ts:169](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L169)

Account that is receiving vests from delegator.

***

### delegator

> **delegator**: `string`

Defined in: [src/chain/misc.ts:165](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L165)

Account that is delegating vests to delegatee.

***

### id

> **id**: `number`

Defined in: [src/chain/misc.ts:161](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L161)

Delegation id.

***

### min\_delegation\_time

> **min\_delegation\_time**: `string`

Defined in: [src/chain/misc.ts:177](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L177)

Earliest date delegation can be removed.

***

### vesting\_shares

> **vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:173](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L173)

Amount of VESTS delegated.
