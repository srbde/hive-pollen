[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / makeBitMaskFilter

# Function: makeBitMaskFilter()

> **makeBitMaskFilter**(`allowedOperations`): (`string` \| `null`)[]

Defined in: [src/utils.ts:890](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L890)

Builds the two-word operation bitmask accepted by `get_account_history`.

## Parameters

### allowedOperations

`number`[]

Operation ids from [operationOrders](../variables/operationOrders.md).

## Returns

(`string` \| `null`)[]

Tuple-like low/high mask values as strings or `null`.

## Remarks

Hive splits operation history filters across two 64-bit masks. Pollen uses
JSBI so the mask is reliable in browsers that lack native bigint support in
older targets.

## Example

```ts
const mask = makeBitMaskFilter([
  operationOrders.transfer,
  operationOrders.claim_reward_balance
])

const history = await client.database.getAccountHistory('srbde', -1, 100, mask)
```
