/**
 * @file Hive asset type definitions and helpers.
 * @author Johan Nordberg <code@johan-nordberg.com>
 * @license
 * Copyright (c) 2017 Johan Nordberg. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * You acknowledge that this software is not designed, licensed or intended for use
 * in the design, construction, operation or maintenance of any military facility.
 */

import { assert } from "../utils.js";

export interface SMTAsset {
  /**
   * Integer amount in the token's smallest precision unit.
   */
  amount: string | number;
  /**
   * Number of decimal places used by the token.
   */
  precision: number;
  /**
   * Numeric asset identifier assigned by Hive's SMT protocol.
   */
  nai: string;
}

/**
 * Asset symbol supported by Hive-compatible asset serialization.
 *
 * @example
 * ```ts
 * const symbol: AssetSymbol = 'HIVE'
 * ```
 */
export type AssetSymbol = "HIVE" | "VESTS" | "HBD" | "TESTS" | "TBD" | "STEEM" | "SBD";

/**
 * Immutable representation of a Hive asset amount and symbol.
 *
 * @remarks
 * Hive serializes liquid assets at three decimal places and VESTS at six.
 * `Asset` keeps arithmetic symbol-aware so accidental HIVE/HBD/VESTS mixing is
 * caught before a transaction is signed.
 *
 * @example
 * ```ts
 * const balance = Asset.from('12.345 HIVE')
 * const payout = balance.add('1.000 HIVE')
 *
 * console.log(payout.toString())
 * ```
 */
export class Asset {
  /**
   * Creates an asset from an amount and symbol.
   *
   * @param amount - Numeric amount in display units.
   * @param symbol - Hive asset symbol.
   */
  constructor(
    public readonly amount: number,
    public readonly symbol: AssetSymbol,
  ) {}

  /**
   * Parses a Hive asset string.
   *
   * @param string - Asset string such as `42.000 HIVE`.
   * @param expectedSymbol - Optional symbol guard.
   * @returns A parsed {@link Asset}.
   *
   * @throws Error
   * Thrown when the string has an unsupported symbol, a non-numeric amount, or
   * a symbol that does not match `expectedSymbol`.
   *
   * @example
   * ```ts
   * const amount = Asset.fromString('42.000 HIVE', 'HIVE')
   * ```
   */
  public static fromString(string: string, expectedSymbol?: AssetSymbol) {
    const [amountString, symbol] = string.split(" ");
    if (!["HIVE", "VESTS", "HBD", "TESTS", "TBD", "SBD", "STEEM"].includes(symbol)) {
      throw new Error(`Invalid asset symbol: ${symbol}`);
    }
    if (expectedSymbol && symbol !== expectedSymbol) {
      throw new Error(`Invalid asset, expected symbol: ${expectedSymbol} got: ${symbol}`);
    }
    const amount = Number.parseFloat(amountString);
    if (!Number.isFinite(amount)) {
      throw new Error(`Invalid asset amount: ${amountString}`);
    }
    return new Asset(amount, symbol as AssetSymbol);
  }

  /**
   * Normalizes an asset-like value into an {@link Asset}.
   *
   * @param value - Asset instance, asset string, or numeric amount.
   * @param symbol - Symbol to use for numeric values and to validate asset
   * strings or existing instances.
   * @returns A normalized asset.
   *
   * @throws Error
   * Thrown when the value cannot be parsed or fails the symbol guard.
   *
   * @example
   * ```ts
   * const fee = Asset.from(3, 'HIVE')
   * const balance = Asset.from('10.000 HBD', 'HBD')
   * ```
   */
  public static from(value: string | Asset | number, symbol?: AssetSymbol) {
    if (value instanceof Asset) {
      if (symbol && value.symbol !== symbol) {
        throw new Error(`Invalid asset, expected symbol: ${symbol} got: ${value.symbol}`);
      }
      return value;
    } else if (typeof value === "number" && Number.isFinite(value)) {
      return new Asset(value, symbol || "STEEM");
    } else if (typeof value === "string") {
      return Asset.fromString(value, symbol);
    } else {
      throw new Error(`Invalid asset '${String(value)}'`);
    }
  }

  /**
   * Returns the smaller of two same-symbol assets.
   *
   * @param a - First asset.
   * @param b - Second asset.
   * @returns The asset with the lower amount.
   *
   * @throws AssertionError
   * Thrown when the two assets use different symbols.
   *
   * @example
   * ```ts
   * const capped = Asset.min(requested, available)
   * ```
   */
  public static min(a: Asset, b: Asset) {
    assert(a.symbol === b.symbol, "can not compare assets with different symbols");
    return a.amount < b.amount ? a : b;
  }

  /**
   * Returns the larger of two same-symbol assets.
   *
   * @param a - First asset.
   * @param b - Second asset.
   * @returns The asset with the higher amount.
   *
   * @throws AssertionError
   * Thrown when the two assets use different symbols.
   *
   * @example
   * ```ts
   * const required = Asset.max(minimumFee, offeredFee)
   * ```
   */
  public static max(a: Asset, b: Asset) {
    assert(a.symbol === b.symbol, "can not compare assets with different symbols");
    return a.amount > b.amount ? a : b;
  }

  /**
   * Resolves the display precision for this asset symbol.
   *
   * @returns `3` for liquid Hive-family assets and `6` for VESTS.
   *
   * @example
   * ```ts
   * Asset.from('1.000000 VESTS').getPrecision()
   * ```
   */
  public getPrecision(): number {
    switch (this.symbol) {
      case "TESTS":
      case "TBD":
      case "HIVE":
      case "HBD":
      case "SBD":
      case "STEEM":
        return 3;
      case "VESTS":
        return 6;
    }
  }

  /**
   * Converts display Hive symbols to protocol serialization symbols.
   *
   * @returns An asset using `STEEM` for `HIVE` and `SBD` for `HBD`, or this
   * asset unchanged for symbols that already serialize directly.
   *
   * @remarks
   * Hive inherited protocol-level asset symbols from Steem. Pollen keeps public
   * APIs Hive-native while mapping to legacy wire symbols during serialization.
   *
   * @example
   * ```ts
   * const wireAsset = Asset.from('1.000 HIVE').steem_symbols()
   * console.log(wireAsset.toString()) // 1.000 STEEM
   * ```
   */
  public steem_symbols(): Asset {
    switch (this.symbol) {
      case "HIVE":
        return Asset.from(this.amount, "STEEM");
      case "HBD":
        return Asset.from(this.amount, "SBD");
      default:
        return this;
    }
  }

  /**
   * Renders the asset using Hive display precision.
   *
   * @returns Asset string such as `42.000 HIVE`.
   *
   * @example
   * ```ts
   * Asset.from(42, 'HIVE').toString()
   * ```
   */
  public toString(): string {
    return `${this.amount.toFixed(this.getPrecision())} ${this.symbol}`;
  }

  /**
   * Adds another amount with the same symbol.
   *
   * @param amount - Asset-like amount to add.
   * @returns A new asset containing the sum.
   *
   * @throws AssertionError
   * Thrown when `amount` uses a different symbol.
   *
   * @example
   * ```ts
   * const total = Asset.from('1.000 HIVE').add('2.500 HIVE')
   * ```
   */
  public add(amount: Asset | string | number): Asset {
    const other = Asset.from(amount, this.symbol);
    assert(this.symbol === other.symbol, "can not add with different symbols");
    return new Asset(this.amount + other.amount, this.symbol);
  }

  /**
   * Subtracts another amount with the same symbol.
   *
   * @param amount - Asset-like amount to subtract.
   * @returns A new asset containing the difference.
   *
   * @throws AssertionError
   * Thrown when `amount` uses a different symbol.
   *
   * @example
   * ```ts
   * const remaining = Asset.from('5.000 HIVE').subtract('1.250 HIVE')
   * ```
   */
  public subtract(amount: Asset | string | number): Asset {
    const other = Asset.from(amount, this.symbol);
    assert(this.symbol === other.symbol, "can not subtract with different symbols");
    return new Asset(this.amount - other.amount, this.symbol);
  }

  /**
   * Multiplies this asset amount by another same-symbol amount.
   *
   * @param factor - Asset-like factor.
   * @returns A new asset containing the product.
   *
   * @throws AssertionError
   * Thrown when `factor` uses a different symbol.
   *
   * @example
   * ```ts
   * const doubled = Asset.from('2.000 HIVE').multiply('2.000 HIVE')
   * ```
   */
  public multiply(factor: Asset | string | number): Asset {
    const other = Asset.from(factor, this.symbol);
    assert(this.symbol === other.symbol, "can not multiply with different symbols");
    return new Asset(this.amount * other.amount, this.symbol);
  }

  /**
   * Divides this asset amount by another same-symbol amount.
   *
   * @param divisor - Asset-like divisor.
   * @returns A new asset containing the quotient.
   *
   * @throws AssertionError
   * Thrown when `divisor` uses a different symbol.
   *
   * @example
   * ```ts
   * const half = Asset.from('2.000 HIVE').divide('2.000 HIVE')
   * ```
   */
  public divide(divisor: Asset | string | number): Asset {
    const other = Asset.from(divisor, this.symbol);
    assert(this.symbol === other.symbol, "can not divide with different symbols");
    return new Asset(this.amount / other.amount, this.symbol);
  }

  /**
   * For JSON serialization, same as toString().
   */
  public toJSON(): string {
    return this.toString();
  }
}

/**
 * Value accepted anywhere Pollen needs a Hive price ratio.
 *
 * @example
 * ```ts
 * const feed: PriceType = {
 *   base: '1.000 HIVE',
 *   quote: '0.300 HBD'
 * }
 * ```
 */
export type PriceType = Price | { base: Asset | string; quote: Asset | string };

/**
 * Price ratio between two different Hive assets.
 *
 * @remarks
 * `Price` behaves like a currency pair: `base` is expressed relative to
 * `quote`. Witness feeds commonly describe how much HBD one HIVE is worth.
 *
 * @example
 * ```ts
 * const price = Price.from({
 *   base: '1.000 HIVE',
 *   quote: '0.300 HBD'
 * })
 *
 * const hbd = price.convert(Asset.from('10.000 HIVE'))
 * ```
 */
export class Price {
  /**
   * Creates a price ratio from non-zero base and quote assets.
   *
   * @param base - Asset being priced.
   * @param quote - Relative asset used to express the price.
   *
   * @throws AssertionError
   * Thrown when either amount is zero or both assets use the same symbol.
   *
   * @example
   * ```ts
   * const price = new Price(Asset.from('1.000 HIVE'), Asset.from('0.300 HBD'))
   * ```
   */
  constructor(
    public readonly base: Asset,
    public readonly quote: Asset,
  ) {
    assert(base.amount !== 0 && quote.amount !== 0, "base and quote assets must be non-zero");
    assert(base.symbol !== quote.symbol, "base and quote can not have the same symbol");
  }

  /**
   * Normalizes a price-like value into a {@link Price}.
   *
   * @param value - Existing price or object containing base and quote assets.
   * @returns A normalized price.
   *
   * @example
   * ```ts
   * const price = Price.from({ base: '1.000 HIVE', quote: '0.300 HBD' })
   * ```
   */
  public static from(value: PriceType) {
    if (value instanceof Price) {
      return value;
    } else {
      return new Price(Asset.from(value.base), Asset.from(value.quote));
    }
  }

  /**
   * Renders the price pair.
   *
   * @returns String in `base:quote` form.
   *
   * @example
   * ```ts
   * price.toString()
   * ```
   */
  public toString() {
    return `${this.base}:${this.quote}`;
  }

  /**
   * Converts an asset between the price pair's two symbols.
   *
   * @param asset - Asset using either the base or quote symbol.
   * @returns Converted asset using the opposite symbol.
   *
   * @throws Error
   * Thrown when `asset.symbol` is not part of this price pair.
   *
   * @example
   * ```ts
   * const hbd = price.convert(Asset.from('10.000 HIVE'))
   * ```
   */
  public convert(asset: Asset) {
    if (asset.symbol === this.base.symbol) {
      assert(this.base.amount > 0);
      return new Asset((asset.amount * this.quote.amount) / this.base.amount, this.quote.symbol);
    } else if (asset.symbol === this.quote.symbol) {
      assert(this.quote.amount > 0);
      return new Asset((asset.amount * this.base.amount) / this.quote.amount, this.base.symbol);
    } else {
      throw new Error(`Can not convert ${asset} with ${this}`);
    }
  }
}
