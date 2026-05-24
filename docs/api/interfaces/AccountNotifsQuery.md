[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / AccountNotifsQuery

# Interface: AccountNotifsQuery

Defined in: [src/helpers/hivemind.ts:104](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/hivemind.ts#L104)

Query options for an account notification feed.

## Example

```ts
const query: AccountNotifsQuery = {
  account: 'srbde',
  limit: 25
}
```

## Properties

### account

> **account**: `string`

Defined in: [src/helpers/hivemind.ts:105](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/hivemind.ts#L105)

***

### limit

> **limit**: `number`

Defined in: [src/helpers/hivemind.ts:106](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/hivemind.ts#L106)

***

### type?

> `optional` **type?**: `"new_community"` \| `"pin_post"`

Defined in: [src/helpers/hivemind.ts:107](https://github.com/TheCrazyGM/dhive/blob/0ed1b4ad88b2fc94d193020c03d6253503431e9e/src/helpers/hivemind.ts#L107)
