[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / RCAccount

# Interface: RCAccount

Defined in: [src/chain/rc.ts:94](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L94)

RC account state returned by `find_rc_accounts`.

## Remarks

`rc_manabar` is a decaying/regenerating value. Use
[RCAPI.calculateRCMana](../classes/RCAPI.md#calculatercmana) or [RCAPI.getRCMana](../classes/RCAPI.md#getrcmana) to project the
current value instead of reading `current_mana` directly.

## Example

```ts
const [account] = await client.rc.findRCAccounts(['srbde'])
console.log(account.max_rc)
```

## Properties

### account

> **account**: `string`

Defined in: [src/chain/rc.ts:95](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L95)

***

### max\_rc

> **max\_rc**: `string`

Defined in: [src/chain/rc.ts:101](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L101)

***

### max\_rc\_creation\_adjustment

> **max\_rc\_creation\_adjustment**: `string` \| [`SMTAsset`](SMTAsset.md)

Defined in: [src/chain/rc.ts:100](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L100)

***

### rc\_manabar

> **rc\_manabar**: `object`

Defined in: [src/chain/rc.ts:96](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L96)

#### current\_mana

> **current\_mana**: `string`

#### last\_update\_time

> **last\_update\_time**: `number`
