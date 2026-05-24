[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DynamicParam

# Interface: DynamicParam

Defined in: [src/chain/rc.ts:39](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L39)

Dynamic RC pool tuning values for one resource class.

## Remarks

These fields describe how the resource pool regenerates, decays, and caps
over time.

## Properties

### budget\_per\_time\_unit

> **budget\_per\_time\_unit**: `number`

Defined in: [src/chain/rc.ts:41](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L41)

***

### decay\_params

> **decay\_params**: `object`

Defined in: [src/chain/rc.ts:44](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L44)

#### decay\_per\_time\_unit

> **decay\_per\_time\_unit**: `string`

#### decay\_per\_time\_unit\_denom\_shift

> **decay\_per\_time\_unit\_denom\_shift**: `number`

***

### max\_pool\_size

> **max\_pool\_size**: `string`

Defined in: [src/chain/rc.ts:43](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L43)

***

### min\_decay

> **min\_decay**: `number`

Defined in: [src/chain/rc.ts:48](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L48)

***

### pool\_eq

> **pool\_eq**: `string`

Defined in: [src/chain/rc.ts:42](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L42)

***

### resource\_unit

> **resource\_unit**: `number`

Defined in: [src/chain/rc.ts:40](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L40)
