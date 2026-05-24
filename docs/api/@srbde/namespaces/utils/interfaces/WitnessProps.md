[**@srbde/pollen**](../../../../index.md)

***

[@srbde/pollen](../../../../index.md) / [utils](../index.md) / WitnessProps

# Interface: WitnessProps

Defined in: [src/utils.ts:679](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L679)

Friendly witness property values accepted by [buildWitnessUpdateOp](../functions/buildWitnessUpdateOp.md).

## Remarks

Hive expects `witness_set_properties` values as sorted serialized hex pairs.
This shape lets callers provide normal Pollen assets, prices, keys, and
numbers before the helper performs protocol serialization.

## Example

```ts
const props: WitnessProps = {
  key: signingPublicKey,
  maximum_block_size: 65_536,
  url: 'https://example.com/witness'
}
```

## Properties

### account\_creation\_fee?

> `optional` **account\_creation\_fee?**: `string` \| [`Asset`](../../../../classes/Asset.md)

Defined in: [src/utils.ts:680](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L680)

***

### account\_subsidy\_budget?

> `optional` **account\_subsidy\_budget?**: `number`

Defined in: [src/utils.ts:681](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L681)

***

### account\_subsidy\_decay?

> `optional` **account\_subsidy\_decay?**: `number`

Defined in: [src/utils.ts:682](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L682)

***

### hbd\_exchange\_rate?

> `optional` **hbd\_exchange\_rate?**: [`PriceType`](../../../../type-aliases/PriceType.md)

Defined in: [src/utils.ts:686](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L686)

***

### hbd\_interest\_rate?

> `optional` **hbd\_interest\_rate?**: `number`

Defined in: [src/utils.ts:687](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L687)

***

### key

> **key**: `string` \| [`PublicKey`](../../../../classes/PublicKey.md)

Defined in: [src/utils.ts:683](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L683)

***

### maximum\_block\_size?

> `optional` **maximum\_block\_size?**: `number`

Defined in: [src/utils.ts:684](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L684)

***

### new\_signing\_key?

> `optional` **new\_signing\_key?**: `string` \| [`PublicKey`](../../../../classes/PublicKey.md) \| `null`

Defined in: [src/utils.ts:685](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L685)

***

### url?

> `optional` **url?**: `string`

Defined in: [src/utils.ts:688](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/utils.ts#L688)
