[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / BeneficiaryRoute

# Interface: BeneficiaryRoute

Defined in: [src/chain/comment.ts:151](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L151)

Beneficiary payout route attached to comment options.

## Remarks

Weights are expressed in hundredths of a percent: `10000` means 100%.

## Example

```ts
const beneficiary: BeneficiaryRoute = {
  account: 'srbde',
  weight: 500
}
```

## Properties

### account

> **account**: `string`

Defined in: [src/chain/comment.ts:152](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L152)

***

### weight

> **weight**: `number`

Defined in: [src/chain/comment.ts:153](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/comment.ts#L153)
