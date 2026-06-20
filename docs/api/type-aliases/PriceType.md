[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / PriceType

# Type Alias: PriceType

> **PriceType** = [`Price`](../classes/Price.md) \| \{ `base`: [`Asset`](../classes/Asset.md) \| `string`; `quote`: [`Asset`](../classes/Asset.md) \| `string`; \}

Defined in: [src/chain/asset.ts:358](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/asset.ts#L358)

Value accepted anywhere Pollen needs a Hive price ratio.

## Example

```ts
const feed: PriceType = {
  base: '1.000 HIVE',
  quote: '0.300 HBD'
}
```
