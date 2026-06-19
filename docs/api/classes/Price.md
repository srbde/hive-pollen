[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Price

# Class: Price

Defined in: [src/chain/asset.ts:377](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/asset.ts#L377)

Price ratio between two different Hive assets.

## Remarks

`Price` behaves like a currency pair: `base` is expressed relative to
`quote`. Witness feeds commonly describe how much HBD one HIVE is worth.

## Example

```ts
const price = Price.from({
  base: '1.000 HIVE',
  quote: '0.300 HBD'
})

const hbd = price.convert(Asset.from('10.000 HIVE'))
```

## Constructors

### Constructor

> **new Price**(`base`, `quote`): `Price`

Defined in: [src/chain/asset.ts:392](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/asset.ts#L392)

Creates a price ratio from non-zero base and quote assets.

#### Parameters

##### base

[`Asset`](Asset.md)

Asset being priced.

##### quote

[`Asset`](Asset.md)

Relative asset used to express the price.

#### Returns

`Price`

#### Throws

AssertionError
Thrown when either amount is zero or both assets use the same symbol.

#### Example

```ts
const price = new Price(Asset.from('1.000 HIVE'), Asset.from('0.300 HBD'))
```

## Properties

### base

> `readonly` **base**: [`Asset`](Asset.md)

Defined in: [src/chain/asset.ts:393](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/asset.ts#L393)

Asset being priced.

***

### quote

> `readonly` **quote**: [`Asset`](Asset.md)

Defined in: [src/chain/asset.ts:394](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/asset.ts#L394)

Relative asset used to express the price.

## Methods

### convert()

> **convert**(`asset`): [`Asset`](Asset.md)

Defined in: [src/chain/asset.ts:447](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/asset.ts#L447)

Converts an asset between the price pair's two symbols.

#### Parameters

##### asset

[`Asset`](Asset.md)

Asset using either the base or quote symbol.

#### Returns

[`Asset`](Asset.md)

Converted asset using the opposite symbol.

#### Throws

Error
Thrown when `asset.symbol` is not part of this price pair.

#### Example

```ts
const hbd = price.convert(Asset.from('10.000 HIVE'))
```

***

### toString()

> **toString**(): `string`

Defined in: [src/chain/asset.ts:429](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/asset.ts#L429)

Renders the price pair.

#### Returns

`string`

String in `base:quote` form.

#### Example

```ts
price.toString()
```

***

### from()

> `static` **from**(`value`): `Price`

Defined in: [src/chain/asset.ts:411](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/asset.ts#L411)

Normalizes a price-like value into a Price.

#### Parameters

##### value

[`PriceType`](../type-aliases/PriceType.md)

Existing price or object containing base and quote assets.

#### Returns

`Price`

A normalized price.

#### Example

```ts
const price = Price.from({ base: '1.000 HIVE', quote: '0.300 HBD' })
```
