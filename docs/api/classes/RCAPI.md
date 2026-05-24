[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / RCAPI

# Class: RCAPI

Defined in: [src/helpers/rc.ts:25](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L25)

Helper for Hive Resource Credit and voting mana calculations.

## Remarks

`RCAPI` reads `rc_api` data and converts Hive manabar state into current
mana and percentage values. RC mana controls transaction capacity, while
voting mana controls curation influence; both regenerate over Hive's
five-day manabar window.

## Example

```ts
const rc = await client.rc.getRCMana('srbde')
const vp = await client.rc.getVPMana('srbde')

console.log(rc.percentage / 100, vp.percentage / 100)
```

## Constructors

### Constructor

> **new RCAPI**(`client`): `RCAPI`

Defined in: [src/helpers/rc.ts:31](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L31)

Creates an RC helper bound to a client.

#### Parameters

##### client

[`Client`](Client.md)

Client used to call `rc_api` and condenser account data.

#### Returns

`RCAPI`

## Properties

### client

> `readonly` **client**: [`Client`](Client.md)

Defined in: [src/helpers/rc.ts:31](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L31)

Client used to call `rc_api` and condenser account data.

## Methods

### calculateRCMana()

> **calculateRCMana**(`rc_account`): [`Manabar`](../interfaces/Manabar.md)

Defined in: [src/helpers/rc.ts:175](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L175)

Calculates current RC mana from an RC account record.

#### Parameters

##### rc\_account

[`RCAccount`](../interfaces/RCAccount.md)

Account record returned by [findRCAccounts](#findrcaccounts).

#### Returns

[`Manabar`](../interfaces/Manabar.md)

Projected manabar state at the current wall-clock time.

#### Example

```ts
const [rcAccount] = await client.rc.findRCAccounts(['srbde'])
const mana = client.rc.calculateRCMana(rcAccount)
```

***

### calculateVPMana()

> **calculateVPMana**(`account`): [`Manabar`](../interfaces/Manabar.md)

Defined in: [src/helpers/rc.ts:192](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L192)

Calculates current voting mana from a condenser account record.

#### Parameters

##### account

[`Account`](../interfaces/Account.md)

Account object containing vesting shares and voting
manabar state.

#### Returns

[`Manabar`](../interfaces/Manabar.md)

Projected voting manabar state at the current wall-clock time.

#### Example

```ts
const [account] = await client.database.getAccounts(['srbde'])
const mana = client.rc.calculateVPMana(account)
```

***

### call()

> **call**(`method`, `params?`): `Promise`\<`any`\>

Defined in: [src/helpers/rc.ts:51](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L51)

Sends a raw `rc_api` call through the parent client.

#### Parameters

##### method

`string`

RC API method name.

##### params?

`any`

Named parameter object accepted by the method.

#### Returns

`Promise`\<`any`\>

The decoded RPC result.

#### Throws

RPCError
Thrown when the active RPC node does not expose `rc_api` or rejects the
request.

#### Example

```ts
const result = await client.rc.call('find_rc_accounts', {
  accounts: ['srbde']
})
```

***

### findRCAccounts()

> **findRCAccounts**(`usernames`): `Promise`\<[`RCAccount`](../interfaces/RCAccount.md)[]\>

Defined in: [src/helpers/rc.ts:70](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L70)

Fetches RC account records for one or more usernames.

#### Parameters

##### usernames

`string`[]

Account names to inspect.

#### Returns

`Promise`\<[`RCAccount`](../interfaces/RCAccount.md)[]\>

RC account records including max RC and current RC manabar state.

#### Throws

RPCError
Thrown when the node cannot serve `find_rc_accounts`.

#### Example

```ts
const [rcAccount] = await client.rc.findRCAccounts(['srbde'])
console.log(rcAccount.max_rc)
```

***

### getRCMana()

> **getRCMana**(`username`): `Promise`\<[`Manabar`](../interfaces/Manabar.md)\>

Defined in: [src/helpers/rc.ts:131](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L131)

Fetches and calculates current RC mana for an account.

#### Parameters

##### username

`string`

Account name to inspect.

#### Returns

`Promise`\<[`Manabar`](../interfaces/Manabar.md)\>

Manabar values with current mana, maximum mana, and percentage in
hundredths of a percent.

#### Remarks

The calculation projects regeneration from the account's last RC manabar
update to the current wall-clock time.

#### Throws

RPCError
Thrown when RC account lookup fails.

#### Example

```ts
const mana = await client.rc.getRCMana('srbde')
console.log(`${mana.percentage / 100}% RC`)
```

***

### getResourceParams()

> **getResourceParams**(): `Promise`\<[`RCParams`](../interfaces/RCParams.md)\>

Defined in: [src/helpers/rc.ts:89](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L89)

Fetches global RC resource parameters.

#### Returns

`Promise`\<[`RCParams`](../interfaces/RCParams.md)\>

Chain-wide coefficients used to price CPU, state bytes, history,
execution time, and market bandwidth.

#### Throws

RPCError
Thrown when the node cannot serve `get_resource_params`.

#### Example

```ts
const params = await client.rc.getResourceParams()
console.log(params.resource_params)
```

***

### getResourcePool()

> **getResourcePool**(): `Promise`\<[`RCPool`](../interfaces/RCPool.md)\>

Defined in: [src/helpers/rc.ts:107](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L107)

Fetches the current RC resource pool.

#### Returns

`Promise`\<[`RCPool`](../interfaces/RCPool.md)\>

Current pool levels for the chain's RC resource classes.

#### Throws

RPCError
Thrown when the node cannot serve `get_resource_pool`.

#### Example

```ts
const pool = await client.rc.getResourcePool()
console.log(pool.resource_pool)
```

***

### getVPMana()

> **getVPMana**(`username`): `Promise`\<[`Manabar`](../interfaces/Manabar.md)\>

Defined in: [src/helpers/rc.ts:156](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/rc.ts#L156)

Fetches and calculates current voting mana for an account.

#### Parameters

##### username

`string`

Account name to inspect.

#### Returns

`Promise`\<[`Manabar`](../interfaces/Manabar.md)\>

Voting manabar values with current mana, maximum mana, and
percentage in hundredths of a percent.

#### Remarks

Maximum voting mana is derived from vesting shares, then regenerated across
Hive's five-day voting manabar window.

#### Throws

RPCError
Thrown when account lookup fails.

#### Example

```ts
const mana = await client.rc.getVPMana('srbde')
console.log(`${mana.percentage / 100}% voting mana`)
```
