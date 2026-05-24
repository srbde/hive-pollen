[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / VestingDelegation

# Interface: VestingDelegation

Defined in: [src/chain/misc.ts:151](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L151)

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

Defined in: [src/chain/misc.ts:163](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L163)

Account that is receiving vests from delegator.

***

### delegator

> **delegator**: `string`

Defined in: [src/chain/misc.ts:159](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L159)

Account that is delegating vests to delegatee.

***

### id

> **id**: `number`

Defined in: [src/chain/misc.ts:155](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L155)

Delegation id.

***

### min\_delegation\_time

> **min\_delegation\_time**: `string`

Defined in: [src/chain/misc.ts:171](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L171)

Earliest date delegation can be removed.

***

### vesting\_shares

> **vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:167](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L167)

Amount of VESTS delegated.
