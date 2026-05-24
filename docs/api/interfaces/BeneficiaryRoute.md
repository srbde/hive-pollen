[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / BeneficiaryRoute

# Interface: BeneficiaryRoute

Defined in: [src/chain/comment.ts:142](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/comment.ts#L142)

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

Defined in: [src/chain/comment.ts:143](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/comment.ts#L143)

***

### weight

> **weight**: `number`

Defined in: [src/chain/comment.ts:144](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/comment.ts#L144)
