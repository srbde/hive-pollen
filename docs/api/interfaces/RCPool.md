[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / RCPool

# Interface: RCPool

Defined in: [src/chain/rc.ts:67](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L67)

Current available RC pool levels by resource class.

## Example

```ts
const pool = await client.rc.getResourcePool()
console.log(pool.resource_state_bytes.pool)
```

## Properties

### resource\_execution\_time

> **resource\_execution\_time**: [`Pool`](Pool.md)

Defined in: [src/chain/rc.ts:72](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L72)

***

### resource\_history\_bytes

> **resource\_history\_bytes**: [`Pool`](Pool.md)

Defined in: [src/chain/rc.ts:68](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L68)

***

### resource\_market\_bytes

> **resource\_market\_bytes**: [`Pool`](Pool.md)

Defined in: [src/chain/rc.ts:70](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L70)

***

### resource\_new\_accounts

> **resource\_new\_accounts**: [`Pool`](Pool.md)

Defined in: [src/chain/rc.ts:69](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L69)

***

### resource\_state\_bytes

> **resource\_state\_bytes**: [`Pool`](Pool.md)

Defined in: [src/chain/rc.ts:71](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/rc.ts#L71)
