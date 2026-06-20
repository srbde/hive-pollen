[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CreateAccountOptions

# Interface: CreateAccountOptions

Defined in: [src/helpers/broadcast.ts:74](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/broadcast.ts#L74)

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

Defined in: [src/helpers/broadcast.ts:87](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/broadcast.ts#L87)

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

Defined in: [src/helpers/broadcast.ts:97](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/broadcast.ts#L97)

Creator account, fee will be deducted from this and the key to sign
the transaction must be the creators active key.

***

### delegation?

> `optional` **delegation?**: `string` \| `number` \| [`Asset`](../classes/Asset.md)

Defined in: [src/helpers/broadcast.ts:107](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/broadcast.ts#L107)

Account delegation, amount of VESTS to delegate to the new account.
If omitted the delegation amount will be the lowest possible based
on the fee. Can be set to zero to disable delegation.

***

### fee?

> `optional` **fee?**: `string` \| `number` \| [`Asset`](../classes/Asset.md)

Defined in: [src/helpers/broadcast.ts:101](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/broadcast.ts#L101)

Account creation fee. If omitted fee will be set to lowest possible.

***

### metadata?

> `optional` **metadata?**: `object`

Defined in: [src/helpers/broadcast.ts:111](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/broadcast.ts#L111)

Optional account meta-data.

#### Index Signature

\[`key`: `string`\]: `any`

***

### password?

> `optional` **password?**: `string`

Defined in: [src/helpers/broadcast.ts:82](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/broadcast.ts#L82)

Password for the new account, if set, all keys will be derived from this.

***

### username

> **username**: `string`

Defined in: [src/helpers/broadcast.ts:78](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/helpers/broadcast.ts#L78)

Username for the new account.
