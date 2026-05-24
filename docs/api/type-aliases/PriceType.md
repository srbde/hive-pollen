[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / PriceType

# Type Alias: PriceType

> **PriceType** = [`Price`](../classes/Price.md) \| \{ `base`: [`Asset`](../classes/Asset.md) \| `string`; `quote`: [`Asset`](../classes/Asset.md) \| `string`; \}

Defined in: [src/chain/asset.ts:386](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L386)

Value accepted anywhere Pollen needs a Hive price ratio.

## Example

```ts
const feed: PriceType = {
  base: '1.000 HIVE',
  quote: '0.300 HBD'
}
```
