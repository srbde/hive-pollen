[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / getVests

# Function: getVests()

> **getVests**(`account`, `subtract_delegated?`, `add_received?`): `number`

Defined in: [src/chain/misc.ts:350](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/misc.ts#L350)

Calculates an account's effective vesting shares.

## Parameters

### account

[`Account`](../interfaces/Account.md)

Account containing vesting, delegation, and withdrawal
fields.

### subtract\_delegated?

`boolean` = `true`

Whether outgoing delegations should reduce the
result.

### add\_received?

`boolean` = `true`

Whether incoming delegations should increase the
result.

## Returns

`number`

Effective VESTS amount as a number.

## Remarks

The calculation subtracts pending power-down withdrawals, then optionally
adjusts for delegated and received vesting shares. RC and voting mana helpers
use this to derive maximum voting mana.

## Example

```ts
const [account] = await client.database.getAccounts(['srbde'])
const effectiveVests = getVests(account)
```
