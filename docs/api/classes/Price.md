[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Price

# Class: Price

Defined in: [src/chain/asset.ts:405](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L405)

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

Defined in: [src/chain/asset.ts:420](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L420)

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

Defined in: [src/chain/asset.ts:420](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L420)

Asset being priced.

***

### quote

> `readonly` **quote**: [`Asset`](Asset.md)

Defined in: [src/chain/asset.ts:420](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L420)

Relative asset used to express the price.

## Methods

### convert()

> **convert**(`asset`): [`Asset`](Asset.md)

Defined in: [src/chain/asset.ts:478](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L478)

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

Defined in: [src/chain/asset.ts:460](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L460)

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

Defined in: [src/chain/asset.ts:442](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L442)

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
