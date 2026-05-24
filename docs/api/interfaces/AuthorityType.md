[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AuthorityType

# Interface: AuthorityType

Defined in: [src/chain/account.ts:56](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/account.ts#L56)

Raw Hive authority object.

## Remarks

Hive authorities combine weighted account references and public-key
references. A transaction is authorized when collected signatures and nested
authorities meet `weight_threshold`.

## Example

```ts
const authority: AuthorityType = {
  weight_threshold: 1,
  account_auths: [],
  key_auths: [[publicKey, 1]]
}
```

## Properties

### account\_auths

> **account\_auths**: \[`string`, `number`\][]

Defined in: [src/chain/account.ts:58](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/account.ts#L58)

***

### key\_auths

> **key\_auths**: \[`string` \| [`PublicKey`](../classes/PublicKey.md), `number`\][]

Defined in: [src/chain/account.ts:59](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/account.ts#L59)

***

### weight\_threshold

> **weight\_threshold**: `number`

Defined in: [src/chain/account.ts:57](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/chain/account.ts#L57)
