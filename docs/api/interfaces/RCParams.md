[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / RCParams

# Interface: RCParams

Defined in: [src/chain/rc.ts:18](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L18)

Global RC pricing parameters for every Hive resource class.

## Remarks

RC pricing separates history bytes, account creation, market bytes, state
bytes, and execution time. Each resource has dynamics parameters and a price
curve used by the chain to compute RC costs.

## Example

```ts
const params = await client.rc.getResourceParams()
console.log(params.resource_execution_time.price_curve_params)
```

## Properties

### resource\_execution\_time

> **resource\_execution\_time**: [`Resource`](Resource.md)

Defined in: [src/chain/rc.ts:23](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L23)

***

### resource\_history\_bytes

> **resource\_history\_bytes**: [`Resource`](Resource.md)

Defined in: [src/chain/rc.ts:19](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L19)

***

### resource\_market\_bytes

> **resource\_market\_bytes**: [`Resource`](Resource.md)

Defined in: [src/chain/rc.ts:21](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L21)

***

### resource\_new\_accounts

> **resource\_new\_accounts**: [`Resource`](Resource.md)

Defined in: [src/chain/rc.ts:20](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L20)

***

### resource\_state\_bytes

> **resource\_state\_bytes**: [`Resource`](Resource.md)

Defined in: [src/chain/rc.ts:22](https://github.com/TheCrazyGM/dhive/blob/30e513f7071b156ae2048e0f9aa531643a28717f/src/chain/rc.ts#L22)
