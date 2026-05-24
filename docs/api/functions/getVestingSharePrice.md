[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / getVestingSharePrice

# Function: getVestingSharePrice()

> **getVestingSharePrice**(`props`): [`Price`](../classes/Price.md)

Defined in: [src/chain/misc.ts:312](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L312)

Calculates the HIVE/VESTS conversion price from global properties.

## Parameters

### props

[`DynamicGlobalProperties`](../interfaces/DynamicGlobalProperties.md)

Dynamic global properties containing total vesting fund and
total vesting shares.

## Returns

[`Price`](../classes/Price.md)

A price that converts between VESTS and HIVE.

## Remarks

Hive expresses influence in VESTS while users often reason about powered-up
HIVE. If either side of the vesting pool is zero, Pollen returns a neutral
1:1 fallback price to keep downstream math defined.

## Example

```ts
const props = await client.database.getDynamicGlobalProperties()
const vestingPrice = getVestingSharePrice(props)
```
