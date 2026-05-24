[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountByKeyAPI

# Class: AccountByKeyAPI

Defined in: [src/helpers/key.ts:33](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/key.ts#L33)

Helper for resolving Hive accounts by authority public key.

## Remarks

The `account_by_key_api` plugin is useful for wallet recovery, ownership
audits, and account discovery from a known owner or active public key.

## Example

```ts
const references = await client.keys.getKeyReferences([publicKey])
console.log(references.accounts[0])
```

## Constructors

### Constructor

> **new AccountByKeyAPI**(`client`): `AccountByKeyAPI`

Defined in: [src/helpers/key.ts:39](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/key.ts#L39)

Creates an account-by-key helper bound to a client.

#### Parameters

##### client

[`Client`](Client.md)

Client used to call `account_by_key_api`.

#### Returns

`AccountByKeyAPI`

## Properties

### client

> `readonly` **client**: [`Client`](Client.md)

Defined in: [src/helpers/key.ts:39](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/key.ts#L39)

Client used to call `account_by_key_api`.

## Methods

### call()

> **call**(`method`, `params?`): `Promise`\<`any`\>

Defined in: [src/helpers/key.ts:58](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/key.ts#L58)

Sends a raw `account_by_key_api` call.

#### Parameters

##### method

`string`

API method name.

##### params?

`any`

Method-specific parameter object.

#### Returns

`Promise`\<`any`\>

The decoded RPC result.

#### Throws

RPCError
Thrown when the node does not expose the plugin or rejects the request.

#### Example

```ts
const result = await client.keys.call('get_key_references', {
  keys: [publicKey.toString()]
})
```

***

### getKeyReferences()

> **getKeyReferences**(`keys`): `Promise`\<[`AccountsByKey`](../interfaces/AccountsByKey.md)\>

Defined in: [src/helpers/key.ts:85](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/helpers/key.ts#L85)

Fetches accounts that reference the supplied public keys.

#### Parameters

##### keys

(`string` \| [`PublicKey`](PublicKey.md))[]

Public keys or public-key strings to search.

#### Returns

`Promise`\<[`AccountsByKey`](../interfaces/AccountsByKey.md)\>

Account-name groups aligned to the input key order.

#### Remarks

Hive returns accounts whose owner or active authorities include each key.
The helper stringifies [PublicKey](PublicKey.md) instances before sending the RPC
payload.

#### Throws

RPCError
Thrown when account-by-key lookup is unavailable or the node rejects a key.

#### Example

```ts
const references = await client.keys.getKeyReferences([
  'STM8m5UgaFAAYQRuaNejYdS8FVLVp9Ss3K1qAVk5de6F8s3HnVbvA'
])

console.log(references.accounts[0])
```
