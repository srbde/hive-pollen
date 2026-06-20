[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / opFilter

# Function: opFilter()

> **opFilter**(...`ops`): \[`bigint`, `bigint`\]

Defined in: [src/chain/op-filter.ts:131](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/op-filter.ts#L131)

Combines one or more OP bitmasks into the [low, high] BigInt pair expected
by condenser_api.get_account_history params 4 and 5.

## Parameters

### ops

...`bigint`[]

## Returns

\[`bigint`, `bigint`\]

## Example

```ts
import { OP, opFilter } from '@srbde/pollen'

const [low, high] = opFilter(OP.fill_order)
const history = await client.call(
  'condenser_api', 'get_account_history',
  ['myaccount', -1, 1000, low, high]
)
```
