[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / DynamicGlobalProperties

# Interface: DynamicGlobalProperties

Defined in: [src/chain/misc.ts:194](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L194)

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

Defined in: [src/chain/misc.ts:252](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L252)

Average block size is updated every block to be:

    average_block_size = (99 * average_block_size + new_block_size) / 100

 This property is used to update the current_reserve_ratio to maintain
 approximately 50% or less utilization of network capacity.

***

### confidential\_hbd\_supply

> **confidential\_hbd\_supply**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:229](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L229)

Total asset held in confidential balances.

***

### confidential\_supply

> **confidential\_supply**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:224](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L224)

Total asset held in confidential balances.

***

### current\_aslot

> **current\_aslot**: `number`

Defined in: [src/chain/misc.ts:268](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L268)

The current absolute slot number. Equal to the total
number of slots since genesis. Also equal to the total
number of missed slots plus head_block_number.

***

### current\_hbd\_supply

> **current\_hbd\_supply**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:225](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L225)

***

### current\_reserve\_ratio

> **current\_reserve\_ratio**: `number`

Defined in: [src/chain/misc.ts:291](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L291)

Any time average_block_size <= 50% maximum_block_size this value grows by 1 until it
reaches MAX_RESERVE_RATIO.  Any time average_block_size is greater than
50% it falls by 1%.  Upward adjustments happen once per round, downward adjustments
happen every block.

***

### current\_supply

> **current\_supply**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:220](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L220)

***

### current\_witness

> **current\_witness**: `string`

Defined in: [src/chain/misc.ts:208](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L208)

Currently elected witness.

***

### hbd\_interest\_rate

> **hbd\_interest\_rate**: `number`

Defined in: [src/chain/misc.ts:242](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L242)

This property defines the interest rate that HBD deposits receive.

***

### hbd\_print\_rate

> **hbd\_print\_rate**: `number`

Defined in: [src/chain/misc.ts:243](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L243)

***

### head\_block\_id

> **head\_block\_id**: `string`

Defined in: [src/chain/misc.ts:200](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L200)

***

### head\_block\_number

> **head\_block\_number**: `number`

Defined in: [src/chain/misc.ts:199](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L199)

Current block height.

***

### id

> **id**: `number`

Defined in: [src/chain/misc.ts:195](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L195)

***

### last\_irreversible\_block\_num

> **last\_irreversible\_block\_num**: `number`

Defined in: [src/chain/misc.ts:274](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L274)

***

### max\_virtual\_bandwidth

> **max\_virtual\_bandwidth**: `string`

Defined in: [src/chain/misc.ts:284](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L284)

The maximum bandwidth the blockchain can support is:

   max_bandwidth = maximum_block_size * BANDWIDTH_AVERAGE_WINDOW_SECONDS / BLOCK_INTERVAL

The maximum virtual bandwidth is:

   max_bandwidth * current_reserve_ratio

***

### maximum\_block\_size

> **maximum\_block\_size**: `number`

Defined in: [src/chain/misc.ts:262](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L262)

Maximum block size is decided by the set of active witnesses which change every round.
Each witness posts what they think the maximum size should be as part of their witness
properties, the median size is chosen to be the maximum block size for the round.

#### Remarks

The minimum value for maximum_block_size is defined by the protocol to prevent the
network from getting stuck by witnesses attempting to set this too low.

***

### num\_pow\_witnesses

> **num\_pow\_witnesses**: `number`

Defined in: [src/chain/misc.ts:218](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L218)

The current count of how many pending POW witnesses there are, determines
the difficulty of doing pow.

***

### participation\_count

> **participation\_count**: `number`

Defined in: [src/chain/misc.ts:273](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L273)

***

### pending\_rewarded\_vesting\_hive

> **pending\_rewarded\_vesting\_hive**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:238](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L238)

***

### pending\_rewarded\_vesting\_shares

> **pending\_rewarded\_vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:237](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L237)

***

### recent\_slots\_filled

> **recent\_slots\_filled**: `string`

Defined in: [src/chain/misc.ts:272](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L272)

Used to compute witness participation.

***

### time

> **time**: `string`

Defined in: [src/chain/misc.ts:204](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L204)

UTC Server time, e.g. 2020-01-15T00:42:00

***

### total\_pow

> **total\_pow**: `number`

Defined in: [src/chain/misc.ts:213](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L213)

The total POW accumulated, aka the sum of num_pow_witness at the time
new POW is added.

***

### total\_reward\_fund\_hive

> **total\_reward\_fund\_hive**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:232](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L232)

***

### total\_reward\_shares2

> **total\_reward\_shares2**: `string`

Defined in: [src/chain/misc.ts:236](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L236)

The running total of REWARD^2.

***

### total\_vesting\_fund\_hive

> **total\_vesting\_fund\_hive**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:230](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L230)

***

### total\_vesting\_shares

> **total\_vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:231](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L231)

***

### virtual\_supply

> **virtual\_supply**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/misc.ts:219](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L219)

***

### vote\_power\_reserve\_rate

> **vote\_power\_reserve\_rate**: `number`

Defined in: [src/chain/misc.ts:297](https://github.com/TheCrazyGM/dhive/blob/b11ca17fe4533aecca91cbd8e7d1c7dfb4f2dff3/src/chain/misc.ts#L297)

The number of votes regenerated per day.  Any user voting slower than this rate will be
"wasting" voting power through spillover; any user voting faster than this rate will have
their votes reduced.
