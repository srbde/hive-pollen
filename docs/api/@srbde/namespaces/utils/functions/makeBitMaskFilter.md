[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / makeBitMaskFilter

# Function: makeBitMaskFilter()

> **makeBitMaskFilter**(`allowedOperations`): (`string` \| `null`)[]

Defined in: [src/utils.ts:810](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/utils.ts#L810)

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
