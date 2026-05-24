[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Account

# Interface: Account

Defined in: [src/chain/account.ts:132](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L132)

Core Hive account object returned by condenser account lookups.

## Remarks

This shape includes authority keys, balances, savings balances, vesting
state, voting state, recovery metadata, and historical counters. Use
[ExtendedAccount](ExtendedAccount.md) when condenser returns augmented social/history
fields.

## Example

```ts
const [account] = await client.database.getAccounts(['srbde'])
console.log(account.balance, account.vesting_shares)
```

## Extended by

- [`ExtendedAccount`](ExtendedAccount.md)

## Properties

### active

> **active**: [`Authority`](../classes/Authority.md)

Defined in: [src/chain/account.ts:136](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L136)

***

### active\_challenged

> **active\_challenged**: `boolean`

Defined in: [src/chain/account.ts:147](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L147)

***

### average\_bandwidth

> **average\_bandwidth**: `string` \| `number`

Defined in: [src/chain/account.ts:190](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L190)

***

### average\_market\_bandwidth

> **average\_market\_bandwidth**: `string` \| `number`

Defined in: [src/chain/account.ts:193](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L193)

***

### balance

> **balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:163](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L163)

***

### can\_vote

> **can\_vote**: `boolean`

Defined in: [src/chain/account.ts:156](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L156)

***

### comment\_count

> **comment\_count**: `number`

Defined in: [src/chain/account.ts:153](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L153)

***

### created

> **created**: `string`

Defined in: [src/chain/account.ts:144](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L144)

***

### curation\_rewards

> **curation\_rewards**: `string` \| `number`

Defined in: [src/chain/account.ts:178](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L178)

***

### delegated\_vesting\_shares

> **delegated\_vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:181](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L181)

***

### hbd\_balance

> **hbd\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:165](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L165)

***

### hbd\_last\_interest\_payment

> **hbd\_last\_interest\_payment**: `string`

Defined in: [src/chain/account.ts:168](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L168)

***

### hbd\_seconds

> **hbd\_seconds**: `string`

Defined in: [src/chain/account.ts:166](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L166)

***

### hbd\_seconds\_last\_update

> **hbd\_seconds\_last\_update**: `string`

Defined in: [src/chain/account.ts:167](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L167)

***

### id

> **id**: `number`

Defined in: [src/chain/account.ts:133](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L133)

***

### json\_metadata

> **json\_metadata**: `string`

Defined in: [src/chain/account.ts:139](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L139)

***

### last\_account\_recovery

> **last\_account\_recovery**: `string`

Defined in: [src/chain/account.ts:152](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L152)

***

### last\_account\_update

> **last\_account\_update**: `string`

Defined in: [src/chain/account.ts:143](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L143)

***

### last\_active\_proved

> **last\_active\_proved**: `string`

Defined in: [src/chain/account.ts:149](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L149)

***

### last\_bandwidth\_update

> **last\_bandwidth\_update**: `string`

Defined in: [src/chain/account.ts:192](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L192)

***

### last\_market\_bandwidth\_update

> **last\_market\_bandwidth\_update**: `string`

Defined in: [src/chain/account.ts:195](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L195)

***

### last\_owner\_proved

> **last\_owner\_proved**: `string`

Defined in: [src/chain/account.ts:148](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L148)

***

### last\_owner\_update

> **last\_owner\_update**: `string`

Defined in: [src/chain/account.ts:142](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L142)

***

### last\_post

> **last\_post**: `string`

Defined in: [src/chain/account.ts:196](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L196)

***

### last\_root\_post

> **last\_root\_post**: `string`

Defined in: [src/chain/account.ts:197](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L197)

***

### last\_vote\_time

> **last\_vote\_time**: `string`

Defined in: [src/chain/account.ts:158](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L158)

***

### lifetime\_bandwidth

> **lifetime\_bandwidth**: `string` \| `number`

Defined in: [src/chain/account.ts:191](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L191)

***

### lifetime\_market\_bandwidth

> **lifetime\_market\_bandwidth**: `string` \| `number`

Defined in: [src/chain/account.ts:194](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L194)

***

### lifetime\_vote\_count

> **lifetime\_vote\_count**: `number`

Defined in: [src/chain/account.ts:154](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L154)

***

### memo\_key

> **memo\_key**: `string`

Defined in: [src/chain/account.ts:138](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L138)

***

### mined

> **mined**: `boolean`

Defined in: [src/chain/account.ts:145](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L145)

***

### name

> **name**: `string`

Defined in: [src/chain/account.ts:134](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L134)

***

### next\_vesting\_withdrawal

> **next\_vesting\_withdrawal**: `string`

Defined in: [src/chain/account.ts:184](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L184)

***

### owner

> **owner**: [`Authority`](../classes/Authority.md)

Defined in: [src/chain/account.ts:135](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L135)

***

### owner\_challenged

> **owner\_challenged**: `boolean`

Defined in: [src/chain/account.ts:146](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L146)

***

### post\_count

> **post\_count**: `number`

Defined in: [src/chain/account.ts:155](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L155)

***

### posting

> **posting**: [`Authority`](../classes/Authority.md)

Defined in: [src/chain/account.ts:137](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L137)

***

### posting\_json\_metadata

> **posting\_json\_metadata**: `string`

Defined in: [src/chain/account.ts:140](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L140)

***

### posting\_rewards

> **posting\_rewards**: `string` \| `number`

Defined in: [src/chain/account.ts:179](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L179)

***

### proxied\_vsf\_votes

> **proxied\_vsf\_votes**: `number`[]

Defined in: [src/chain/account.ts:188](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L188)

***

### proxy

> **proxy**: `string`

Defined in: [src/chain/account.ts:141](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L141)

***

### received\_vesting\_shares

> **received\_vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:182](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L182)

***

### recovery\_account

> **recovery\_account**: `string`

Defined in: [src/chain/account.ts:150](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L150)

***

### reset\_account

> **reset\_account**: `string`

Defined in: [src/chain/account.ts:151](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L151)

***

### reward\_hbd\_balance

> **reward\_hbd\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:174](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L174)

***

### reward\_hive\_balance

> **reward\_hive\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:175](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L175)

***

### reward\_vesting\_balance

> **reward\_vesting\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:176](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L176)

***

### reward\_vesting\_hive

> **reward\_vesting\_hive**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:177](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L177)

***

### savings\_balance

> **savings\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:164](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L164)

***

### savings\_hbd\_balance

> **savings\_hbd\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:169](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L169)

***

### savings\_hbd\_last\_interest\_payment

> **savings\_hbd\_last\_interest\_payment**: `string`

Defined in: [src/chain/account.ts:172](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L172)

***

### savings\_hbd\_seconds

> **savings\_hbd\_seconds**: `string`

Defined in: [src/chain/account.ts:170](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L170)

***

### savings\_hbd\_seconds\_last\_update

> **savings\_hbd\_seconds\_last\_update**: `string`

Defined in: [src/chain/account.ts:171](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L171)

***

### savings\_withdraw\_requests

> **savings\_withdraw\_requests**: `number`

Defined in: [src/chain/account.ts:173](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L173)

***

### to\_withdraw

> **to\_withdraw**: `string` \| `number`

Defined in: [src/chain/account.ts:186](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L186)

***

### vesting\_shares

> **vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:180](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L180)

***

### vesting\_withdraw\_rate

> **vesting\_withdraw\_rate**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:183](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L183)

***

### voting\_manabar

> **voting\_manabar**: `object`

Defined in: [src/chain/account.ts:159](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L159)

#### current\_mana

> **current\_mana**: `string` \| `number`

#### last\_update\_time

> **last\_update\_time**: `number`

***

### voting\_power

> **voting\_power**: `number`

Defined in: [src/chain/account.ts:157](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L157)

***

### withdraw\_routes

> **withdraw\_routes**: `number`

Defined in: [src/chain/account.ts:187](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L187)

***

### withdrawn

> **withdrawn**: `string` \| `number`

Defined in: [src/chain/account.ts:185](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L185)

***

### witnesses\_voted\_for

> **witnesses\_voted\_for**: `number`

Defined in: [src/chain/account.ts:189](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/chain/account.ts#L189)
