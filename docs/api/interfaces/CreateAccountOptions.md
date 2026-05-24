[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CreateAccountOptions

# Interface: CreateAccountOptions

Defined in: [src/helpers/broadcast.ts:78](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/broadcast.ts#L78)

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

Defined in: [src/helpers/broadcast.ts:91](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/broadcast.ts#L91)

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

Defined in: [src/helpers/broadcast.ts:101](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/broadcast.ts#L101)

Creator account, fee will be deducted from this and the key to sign
the transaction must be the creators active key.

***

### delegation?

> `optional` **delegation?**: `string` \| `number` \| [`Asset`](../classes/Asset.md)

Defined in: [src/helpers/broadcast.ts:111](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/broadcast.ts#L111)

Account delegation, amount of VESTS to delegate to the new account.
If omitted the delegation amount will be the lowest possible based
on the fee. Can be set to zero to disable delegation.

***

### fee?

> `optional` **fee?**: `string` \| `number` \| [`Asset`](../classes/Asset.md)

Defined in: [src/helpers/broadcast.ts:105](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/broadcast.ts#L105)

Account creation fee. If omitted fee will be set to lowest possible.

***

### metadata?

> `optional` **metadata?**: `object`

Defined in: [src/helpers/broadcast.ts:115](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/broadcast.ts#L115)

Optional account meta-data.

#### Index Signature

\[`key`: `string`\]: `any`

***

### password?

> `optional` **password?**: `string`

Defined in: [src/helpers/broadcast.ts:86](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/broadcast.ts#L86)

Password for the new account, if set, all keys will be derived from this.

***

### username

> **username**: `string`

Defined in: [src/helpers/broadcast.ts:82](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/broadcast.ts#L82)

Username for the new account.
