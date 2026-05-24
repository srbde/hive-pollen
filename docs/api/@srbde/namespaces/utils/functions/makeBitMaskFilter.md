[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / makeBitMaskFilter

# Function: makeBitMaskFilter()

> **makeBitMaskFilter**(`allowedOperations`): (`string` \| `null`)[]

Defined in: [src/utils.ts:803](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/utils.ts#L803)

Builds the two-word account-history operation mask accepted by Hive.

## Parameters

### allowedOperations

`number`[]

Operation ids from [operationOrders](../variables/operationOrders.md).

## Returns

(`string` \| `null`)[]

Low/high mask words as decimal strings, with zero words represented
as `null`.

## Remarks

Native `bigint` is used for the 64-bit mask words, replacing the older JSBI
shim while keeping the returned RPC shape as decimal strings or `null`.

## Example

```ts
const mask = makeBitMaskFilter([
  operationOrders.transfer,
  operationOrders.claim_reward_balance
])
```
