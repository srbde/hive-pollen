[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CreateAccountOptions

# Interface: CreateAccountOptions

Defined in: [src/helpers/broadcast.ts:75](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L75)

Options used by [BroadcastAPI.createTestAccount](../classes/BroadcastAPI.md#createtestaccount).

## Remarks

Tests can either provide a master password, letting Pollen derive role keys
with Hive's login convention, or provide explicit authorities for deterministic
account fixtures.

## Example

```ts
const options: CreateAccountOptions = {
  username: 'pollen-dev',
  password: 'correct horse battery staple',
  creator: 'initminer',
  metadata: { app: 'pollen-tests' }
}
```

## Properties

### auths?

> `optional` **auths?**: `object`

Defined in: [src/helpers/broadcast.ts:88](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L88)

Account authorities, used to manually set account keys.
Can not be used together with the password option.

#### active

> **active**: `string` \| [`AuthorityType`](AuthorityType.md) \| [`PublicKey`](../classes/PublicKey.md)

#### memoKey

> **memoKey**: `string` \| [`PublicKey`](../classes/PublicKey.md)

#### owner

> **owner**: `string` \| [`AuthorityType`](AuthorityType.md) \| [`PublicKey`](../classes/PublicKey.md)

#### posting

> **posting**: `string` \| [`AuthorityType`](AuthorityType.md) \| [`PublicKey`](../classes/PublicKey.md)

***

### creator

> **creator**: `string`

Defined in: [src/helpers/broadcast.ts:98](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L98)

Creator account, fee will be deducted from this and the key to sign
the transaction must be the creators active key.

***

### delegation?

> `optional` **delegation?**: `string` \| `number` \| [`Asset`](../classes/Asset.md)

Defined in: [src/helpers/broadcast.ts:108](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L108)

Account delegation, amount of VESTS to delegate to the new account.
If omitted the delegation amount will be the lowest possible based
on the fee. Can be set to zero to disable delegation.

***

### fee?

> `optional` **fee?**: `string` \| `number` \| [`Asset`](../classes/Asset.md)

Defined in: [src/helpers/broadcast.ts:102](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L102)

Account creation fee. If omitted fee will be set to lowest possible.

***

### metadata?

> `optional` **metadata?**: `object`

Defined in: [src/helpers/broadcast.ts:112](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L112)

Optional account meta-data.

#### Index Signature

\[`key`: `string`\]: `any`

***

### password?

> `optional` **password?**: `string`

Defined in: [src/helpers/broadcast.ts:83](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L83)

Password for the new account, if set, all keys will be derived from this.

***

### username

> **username**: `string`

Defined in: [src/helpers/broadcast.ts:79](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/broadcast.ts#L79)

Username for the new account.
