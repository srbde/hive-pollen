[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / CustomJsonOperation

# Interface: CustomJsonOperation

Defined in: [src/chain/operation.ts:653](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L653)

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

- [`OperationTuple`](OperationTuple.md)

## Properties

### 0

> **0**: `"custom_json"`

Defined in: [src/chain/operation.ts:654](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L654)

#### Overrides

[`OperationTuple`](OperationTuple.md).[`0`](OperationTuple.md#0)

***

### 1

> **1**: `object`

Defined in: [src/chain/operation.ts:655](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L655)

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

[`OperationTuple`](OperationTuple.md).[`1`](OperationTuple.md#1)
