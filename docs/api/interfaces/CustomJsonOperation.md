[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CustomJsonOperation

# Interface: CustomJsonOperation

Defined in: [src/chain/operation.ts:550](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L550)

JSON custom operation used by Hive application protocols.

## Remarks

The `json` field must already be serialized. Posting authority is common for
social protocols; active authority is used for protocols with financial or
account-control implications.

## Example

```ts
const op: CustomJsonOperation = ['custom_json', {
  required_auths: [],
  required_posting_auths: ['srbde'],
  id: 'pollen.demo',
  json: JSON.stringify({ ok: true })
}]
```

## Extends

- [`Operation`](Operation.md)

## Properties

### 0

> **0**: `"custom_json"`

Defined in: [src/chain/operation.ts:551](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L551)

#### Overrides

[`Operation`](Operation.md).[`0`](Operation.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:552](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/operation.ts#L552)

#### id

> **id**: `string`

ID string, must be less than 32 characters long.

#### json

> **json**: `string`

JSON encoded string, must be valid JSON.

#### required\_auths

> **required\_auths**: `string`[]

#### required\_posting\_auths

> **required\_posting\_auths**: `string`[]

#### Overrides

[`Operation`](Operation.md).[`1`](Operation.md#1)
