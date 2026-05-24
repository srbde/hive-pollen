[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Manabar

# Interface: Manabar

Defined in: [src/chain/rc.ts:117](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/rc.ts#L117)

Projected manabar value returned by Pollen mana helpers.

## Remarks

`percentage` is expressed in hundredths of a percent. Divide by 100 for a
human-readable percent value.

## Example

```ts
const mana = await client.rc.getVPMana('srbde')
console.log(`${mana.percentage / 100}%`)
```

## Properties

### current\_mana

> **current\_mana**: `number`

Defined in: [src/chain/rc.ts:118](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/rc.ts#L118)

***

### max\_mana

> **max\_mana**: `number`

Defined in: [src/chain/rc.ts:119](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/rc.ts#L119)

***

### percentage

> **percentage**: `number`

Defined in: [src/chain/rc.ts:120](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/rc.ts#L120)
