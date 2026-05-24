[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Asset

# Class: Asset

Defined in: [src/chain/asset.ts:86](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L86)

Immutable representation of a Hive asset amount and symbol.

## Remarks

Hive serializes liquid assets at three decimal places and VESTS at six.
`Asset` keeps arithmetic symbol-aware so accidental HIVE/HBD/VESTS mixing is
caught before a transaction is signed.

## Example

```ts
const balance = Asset.from('12.345 HIVE')
const payout = balance.add('1.000 HIVE')

console.log(payout.toString())
```

## Constructors

### Constructor

> **new Asset**(`amount`, `symbol`): `Asset`

Defined in: [src/chain/asset.ts:93](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L93)

Creates an asset from an amount and symbol.

#### Parameters

##### amount

`number`

Numeric amount in display units.

##### symbol

[`AssetSymbol`](../type-aliases/AssetSymbol.md)

Hive asset symbol.

#### Returns

`Asset`

## Properties

### amount

> `readonly` **amount**: `number`

Defined in: [src/chain/asset.ts:94](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L94)

Numeric amount in display units.

***

### symbol

> `readonly` **symbol**: [`AssetSymbol`](../type-aliases/AssetSymbol.md)

Defined in: [src/chain/asset.ts:95](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L95)

Hive asset symbol.

## Methods

### add()

> **add**(`amount`): `Asset`

Defined in: [src/chain/asset.ts:292](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L292)

Adds another amount with the same symbol.

#### Parameters

##### amount

`string` \| `number` \| `Asset`

Asset-like amount to add.

#### Returns

`Asset`

A new asset containing the sum.

#### Throws

AssertionError
Thrown when `amount` uses a different symbol.

#### Example

```ts
const total = Asset.from('1.000 HIVE').add('2.500 HIVE')
```

***

### divide()

> **divide**(`divisor`): `Asset`

Defined in: [src/chain/asset.ts:358](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L358)

Divides this asset amount by another same-symbol amount.

#### Parameters

##### divisor

`string` \| `number` \| `Asset`

Asset-like divisor.

#### Returns

`Asset`

A new asset containing the quotient.

#### Throws

AssertionError
Thrown when `divisor` uses a different symbol.

#### Example

```ts
const half = Asset.from('2.000 HIVE').divide('2.000 HIVE')
```

***

### getPrecision()

> **getPrecision**(): `number`

Defined in: [src/chain/asset.ts:223](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L223)

Resolves the display precision for this asset symbol.

#### Returns

`number`

`3` for liquid Hive-family assets and `6` for VESTS.

#### Example

```ts
Asset.from('1.000000 VESTS').getPrecision()
```

***

### multiply()

> **multiply**(`factor`): `Asset`

Defined in: [src/chain/asset.ts:335](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L335)

Multiplies this asset amount by another same-symbol amount.

#### Parameters

##### factor

`string` \| `number` \| `Asset`

Asset-like factor.

#### Returns

`Asset`

A new asset containing the product.

#### Throws

AssertionError
Thrown when `factor` uses a different symbol.

#### Example

```ts
const doubled = Asset.from('2.000 HIVE').multiply('2.000 HIVE')
```

***

### steem\_symbols()

> **steem\_symbols**(): `Asset`

Defined in: [src/chain/asset.ts:253](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L253)

Converts display Hive symbols to protocol serialization symbols.

#### Returns

`Asset`

An asset using `STEEM` for `HIVE` and `SBD` for `HBD`, or this
asset unchanged for symbols that already serialize directly.

#### Remarks

Hive inherited protocol-level asset symbols from Steem. Pollen keeps public
APIs Hive-native while mapping to legacy wire symbols during serialization.

#### Example

```ts
const wireAsset = Asset.from('1.000 HIVE').steem_symbols()
console.log(wireAsset.toString()) // 1.000 STEEM
```

***

### subtract()

> **subtract**(`amount`): `Asset`

Defined in: [src/chain/asset.ts:312](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L312)

Subtracts another amount with the same symbol.

#### Parameters

##### amount

`string` \| `number` \| `Asset`

Asset-like amount to subtract.

#### Returns

`Asset`

A new asset containing the difference.

#### Throws

AssertionError
Thrown when `amount` uses a different symbol.

#### Example

```ts
const remaining = Asset.from('5.000 HIVE').subtract('1.250 HIVE')
```

***

### toJSON()

> **toJSON**(): `string`

Defined in: [src/chain/asset.ts:370](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L370)

For JSON serialization, same as toString().

#### Returns

`string`

***

### toString()

> **toString**(): `string`

Defined in: [src/chain/asset.ts:274](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L274)

Renders the asset using Hive display precision.

#### Returns

`string`

Asset string such as `42.000 HIVE`.

#### Example

```ts
Asset.from(42, 'HIVE').toString()
```

***

### from()

> `static` **from**(`value`, `symbol?`): `Asset`

Defined in: [src/chain/asset.ts:150](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L150)

Normalizes an asset-like value into an Asset.

#### Parameters

##### value

`string` \| `number` \| `Asset`

Asset instance, asset string, or numeric amount.

##### symbol?

[`AssetSymbol`](../type-aliases/AssetSymbol.md)

Symbol to use for numeric values and to validate asset
strings or existing instances.

#### Returns

`Asset`

A normalized asset.

#### Throws

Error
Thrown when the value cannot be parsed or fails the symbol guard.

#### Example

```ts
const fee = Asset.from(3, 'HIVE')
const balance = Asset.from('10.000 HBD', 'HBD')
```

***

### fromString()

> `static` **fromString**(`string`, `expectedSymbol?`): `Asset`

Defined in: [src/chain/asset.ts:114](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L114)

Parses a Hive asset string.

#### Parameters

##### string

`string`

Asset string such as `42.000 HIVE`.

##### expectedSymbol?

[`AssetSymbol`](../type-aliases/AssetSymbol.md)

Optional symbol guard.

#### Returns

`Asset`

A parsed Asset.

#### Throws

Error
Thrown when the string has an unsupported symbol, a non-numeric amount, or
a symbol that does not match `expectedSymbol`.

#### Example

```ts
const amount = Asset.fromString('42.000 HIVE', 'HIVE')
```

***

### max()

> `static` **max**(`a`, `b`): `Asset`

Defined in: [src/chain/asset.ts:205](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L205)

Returns the larger of two same-symbol assets.

#### Parameters

##### a

`Asset`

First asset.

##### b

`Asset`

Second asset.

#### Returns

`Asset`

The asset with the higher amount.

#### Throws

AssertionError
Thrown when the two assets use different symbols.

#### Example

```ts
const required = Asset.max(minimumFee, offeredFee)
```

***

### min()

> `static` **min**(`a`, `b`): `Asset`

Defined in: [src/chain/asset.ts:182](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/asset.ts#L182)

Returns the smaller of two same-symbol assets.

#### Parameters

##### a

`Asset`

First asset.

##### b

`Asset`

Second asset.

#### Returns

`Asset`

The asset with the lower amount.

#### Throws

AssertionError
Thrown when the two assets use different symbols.

#### Example

```ts
const capped = Asset.min(requested, available)
```
