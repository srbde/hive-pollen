[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DynamicGlobalProperties

# Interface: DynamicGlobalProperties

Defined in: [src/chain/misc.ts:188](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L188)

Dynamic global chain state reported by a Hive RPC node.

## Remarks

These values drive transaction TAPOS fields, stream cursors, supply displays,
voting-power calculations, witness participation dashboards, and bandwidth
estimates.

## Example

```ts
const props = await client.database.getDynamicGlobalProperties()
console.log(props.head_block_number, props.last_irreversible_block_num)
```

## Properties

### average\_block\_size

> **average\_block\_size**: `number`

Defined in: [src/chain/misc.ts:246](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L246)

Average block size is updated every block to be:

    average_block_size = (99 * average_block_size + new_block_size) / 100

 This property is used to update the current_reserve_ratio to maintain
 approximately 50% or less utilization of network capacity.

***

### confidential\_hbd\_supply

> **confidential\_hbd\_supply**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:223](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L223)

Total asset held in confidential balances.

***

### confidential\_supply

> **confidential\_supply**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:218](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L218)

Total asset held in confidential balances.

***

### current\_aslot

> **current\_aslot**: `number`

Defined in: [src/chain/misc.ts:262](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L262)

The current absolute slot number. Equal to the total
number of slots since genesis. Also equal to the total
number of missed slots plus head_block_number.

***

### current\_hbd\_supply

> **current\_hbd\_supply**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:219](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L219)

***

### current\_reserve\_ratio

> **current\_reserve\_ratio**: `number`

Defined in: [src/chain/misc.ts:285](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L285)

Any time average_block_size <= 50% maximum_block_size this value grows by 1 until it
reaches MAX_RESERVE_RATIO.  Any time average_block_size is greater than
50% it falls by 1%.  Upward adjustments happen once per round, downward adjustments
happen every block.

***

### current\_supply

> **current\_supply**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:214](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L214)

***

### current\_witness

> **current\_witness**: `string`

Defined in: [src/chain/misc.ts:202](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L202)

Currently elected witness.

***

### hbd\_interest\_rate

> **hbd\_interest\_rate**: `number`

Defined in: [src/chain/misc.ts:236](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L236)

This property defines the interest rate that HBD deposits receive.

***

### hbd\_print\_rate

> **hbd\_print\_rate**: `number`

Defined in: [src/chain/misc.ts:237](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L237)

***

### head\_block\_id

> **head\_block\_id**: `string`

Defined in: [src/chain/misc.ts:194](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L194)

***

### head\_block\_number

> **head\_block\_number**: `number`

Defined in: [src/chain/misc.ts:193](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L193)

Current block height.

***

### id

> **id**: `number`

Defined in: [src/chain/misc.ts:189](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L189)

***

### last\_irreversible\_block\_num

> **last\_irreversible\_block\_num**: `number`

Defined in: [src/chain/misc.ts:268](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L268)

***

### max\_virtual\_bandwidth

> **max\_virtual\_bandwidth**: `string`

Defined in: [src/chain/misc.ts:278](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L278)

The maximum bandwidth the blockchain can support is:

   max_bandwidth = maximum_block_size * BANDWIDTH_AVERAGE_WINDOW_SECONDS / BLOCK_INTERVAL

The maximum virtual bandwidth is:

   max_bandwidth * current_reserve_ratio

***

### maximum\_block\_size

> **maximum\_block\_size**: `number`

Defined in: [src/chain/misc.ts:256](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L256)

Maximum block size is decided by the set of active witnesses which change every round.
Each witness posts what they think the maximum size should be as part of their witness
properties, the median size is chosen to be the maximum block size for the round.

#### Remarks

The minimum value for maximum_block_size is defined by the protocol to prevent the
network from getting stuck by witnesses attempting to set this too low.

***

### num\_pow\_witnesses

> **num\_pow\_witnesses**: `number`

Defined in: [src/chain/misc.ts:212](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L212)

The current count of how many pending POW witnesses there are, determines
the difficulty of doing pow.

***

### participation\_count

> **participation\_count**: `number`

Defined in: [src/chain/misc.ts:267](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L267)

***

### pending\_rewarded\_vesting\_hive

> **pending\_rewarded\_vesting\_hive**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:232](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L232)

***

### pending\_rewarded\_vesting\_shares

> **pending\_rewarded\_vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:231](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L231)

***

### recent\_slots\_filled

> **recent\_slots\_filled**: `string`

Defined in: [src/chain/misc.ts:266](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L266)

Used to compute witness participation.

***

### time

> **time**: `string`

Defined in: [src/chain/misc.ts:198](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L198)

UTC Server time, e.g. 2020-01-15T00:42:00

***

### total\_pow

> **total\_pow**: `number`

Defined in: [src/chain/misc.ts:207](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L207)

The total POW accumulated, aka the sum of num_pow_witness at the time
new POW is added.

***

### total\_reward\_fund\_hive

> **total\_reward\_fund\_hive**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:226](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L226)

***

### total\_reward\_shares2

> **total\_reward\_shares2**: `string`

Defined in: [src/chain/misc.ts:230](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L230)

The running total of REWARD^2.

***

### total\_vesting\_fund\_hive

> **total\_vesting\_fund\_hive**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:224](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L224)

***

### total\_vesting\_shares

> **total\_vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:225](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L225)

***

### virtual\_supply

> **virtual\_supply**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:213](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L213)

***

### vote\_power\_reserve\_rate

> **vote\_power\_reserve\_rate**: `number`

Defined in: [src/chain/misc.ts:291](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/misc.ts#L291)

The number of votes regenerated per day.  Any user voting slower than this rate will be
"wasting" voting power through spillover; any user voting faster than this rate will have
their votes reduced.
