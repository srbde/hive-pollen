[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / ExtendedAccount

# Interface: ExtendedAccount

Defined in: [src/chain/account.ts:214](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L214)

Augmented account object returned by condenser `get_accounts`.

## Remarks

Extended accounts add reputation, converted vesting balance, witness votes,
and several legacy history collections used by social applications.

## Example

```ts
const [account] = await client.database.getAccounts(['srbde'])
console.log(account.reputation, account.witness_votes)
```

## Extends

- [`Account`](Account.md)

## Properties

### active

> **active**: [`Authority`](../classes/Authority.md)

Defined in: [src/chain/account.ts:137](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L137)

#### Inherited from

[`Account`](Account.md).[`active`](Account.md#active)

***

### active\_challenged

> **active\_challenged**: `boolean`

Defined in: [src/chain/account.ts:148](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L148)

#### Inherited from

[`Account`](Account.md).[`active_challenged`](Account.md#active_challenged)

***

### average\_bandwidth

> **average\_bandwidth**: `string` \| `number`

Defined in: [src/chain/account.ts:191](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L191)

#### Inherited from

[`Account`](Account.md).[`average_bandwidth`](Account.md#average_bandwidth)

***

### average\_market\_bandwidth

> **average\_market\_bandwidth**: `string` \| `number`

Defined in: [src/chain/account.ts:194](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L194)

#### Inherited from

[`Account`](Account.md).[`average_market_bandwidth`](Account.md#average_market_bandwidth)

***

### balance

> **balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:164](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L164)

#### Inherited from

[`Account`](Account.md).[`balance`](Account.md#balance)

***

### blog?

> `optional` **blog?**: `string`[]

Defined in: [src/chain/account.ts:236](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L236)

***

### can\_vote

> **can\_vote**: `boolean`

Defined in: [src/chain/account.ts:157](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L157)

#### Inherited from

[`Account`](Account.md).[`can_vote`](Account.md#can_vote)

***

### comment\_count

> **comment\_count**: `number`

Defined in: [src/chain/account.ts:154](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L154)

#### Inherited from

[`Account`](Account.md).[`comment_count`](Account.md#comment_count)

***

### comments?

> `optional` **comments?**: `string`[]

Defined in: [src/chain/account.ts:235](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L235)

***

### created

> **created**: `string`

Defined in: [src/chain/account.ts:145](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L145)

#### Inherited from

[`Account`](Account.md).[`created`](Account.md#created)

***

### curation\_rewards

> **curation\_rewards**: `string` \| `number`

Defined in: [src/chain/account.ts:179](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L179)

#### Inherited from

[`Account`](Account.md).[`curation_rewards`](Account.md#curation_rewards)

***

### delegated\_vesting\_shares

> **delegated\_vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:182](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L182)

#### Inherited from

[`Account`](Account.md).[`delegated_vesting_shares`](Account.md#delegated_vesting_shares)

***

### feed?

> `optional` **feed?**: `string`[]

Defined in: [src/chain/account.ts:237](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L237)

***

### guest\_bloggers

> **guest\_bloggers**: `string`[]

Defined in: [src/chain/account.ts:233](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L233)

***

### hbd\_balance

> **hbd\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:166](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L166)

#### Inherited from

[`Account`](Account.md).[`hbd_balance`](Account.md#hbd_balance)

***

### hbd\_last\_interest\_payment

> **hbd\_last\_interest\_payment**: `string`

Defined in: [src/chain/account.ts:169](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L169)

#### Inherited from

[`Account`](Account.md).[`hbd_last_interest_payment`](Account.md#hbd_last_interest_payment)

***

### hbd\_seconds

> **hbd\_seconds**: `string`

Defined in: [src/chain/account.ts:167](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L167)

#### Inherited from

[`Account`](Account.md).[`hbd_seconds`](Account.md#hbd_seconds)

***

### hbd\_seconds\_last\_update

> **hbd\_seconds\_last\_update**: `string`

Defined in: [src/chain/account.ts:168](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L168)

#### Inherited from

[`Account`](Account.md).[`hbd_seconds_last_update`](Account.md#hbd_seconds_last_update)

***

### id

> **id**: `number`

Defined in: [src/chain/account.ts:134](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L134)

#### Inherited from

[`Account`](Account.md).[`id`](Account.md#id)

***

### json\_metadata

> **json\_metadata**: `string`

Defined in: [src/chain/account.ts:140](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L140)

#### Inherited from

[`Account`](Account.md).[`json_metadata`](Account.md#json_metadata)

***

### last\_account\_recovery

> **last\_account\_recovery**: `string`

Defined in: [src/chain/account.ts:153](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L153)

#### Inherited from

[`Account`](Account.md).[`last_account_recovery`](Account.md#last_account_recovery)

***

### last\_account\_update

> **last\_account\_update**: `string`

Defined in: [src/chain/account.ts:144](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L144)

#### Inherited from

[`Account`](Account.md).[`last_account_update`](Account.md#last_account_update)

***

### last\_active\_proved

> **last\_active\_proved**: `string`

Defined in: [src/chain/account.ts:150](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L150)

#### Inherited from

[`Account`](Account.md).[`last_active_proved`](Account.md#last_active_proved)

***

### last\_bandwidth\_update

> **last\_bandwidth\_update**: `string`

Defined in: [src/chain/account.ts:193](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L193)

#### Inherited from

[`Account`](Account.md).[`last_bandwidth_update`](Account.md#last_bandwidth_update)

***

### last\_market\_bandwidth\_update

> **last\_market\_bandwidth\_update**: `string`

Defined in: [src/chain/account.ts:196](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L196)

#### Inherited from

[`Account`](Account.md).[`last_market_bandwidth_update`](Account.md#last_market_bandwidth_update)

***

### last\_owner\_proved

> **last\_owner\_proved**: `string`

Defined in: [src/chain/account.ts:149](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L149)

#### Inherited from

[`Account`](Account.md).[`last_owner_proved`](Account.md#last_owner_proved)

***

### last\_owner\_update

> **last\_owner\_update**: `string`

Defined in: [src/chain/account.ts:143](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L143)

#### Inherited from

[`Account`](Account.md).[`last_owner_update`](Account.md#last_owner_update)

***

### last\_post

> **last\_post**: `string`

Defined in: [src/chain/account.ts:197](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L197)

#### Inherited from

[`Account`](Account.md).[`last_post`](Account.md#last_post)

***

### last\_root\_post

> **last\_root\_post**: `string`

Defined in: [src/chain/account.ts:198](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L198)

#### Inherited from

[`Account`](Account.md).[`last_root_post`](Account.md#last_root_post)

***

### last\_vote\_time

> **last\_vote\_time**: `string`

Defined in: [src/chain/account.ts:159](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L159)

#### Inherited from

[`Account`](Account.md).[`last_vote_time`](Account.md#last_vote_time)

***

### lifetime\_bandwidth

> **lifetime\_bandwidth**: `string` \| `number`

Defined in: [src/chain/account.ts:192](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L192)

#### Inherited from

[`Account`](Account.md).[`lifetime_bandwidth`](Account.md#lifetime_bandwidth)

***

### lifetime\_market\_bandwidth

> **lifetime\_market\_bandwidth**: `string` \| `number`

Defined in: [src/chain/account.ts:195](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L195)

#### Inherited from

[`Account`](Account.md).[`lifetime_market_bandwidth`](Account.md#lifetime_market_bandwidth)

***

### lifetime\_vote\_count

> **lifetime\_vote\_count**: `number`

Defined in: [src/chain/account.ts:155](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L155)

#### Inherited from

[`Account`](Account.md).[`lifetime_vote_count`](Account.md#lifetime_vote_count)

***

### market\_history

> **market\_history**: \[`number`, [`AppliedOperation`](AppliedOperation.md)\][]

Defined in: [src/chain/account.ts:227](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L227)

Limit order, cancel, and fill history.

***

### memo\_key

> **memo\_key**: `string`

Defined in: [src/chain/account.ts:139](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L139)

#### Inherited from

[`Account`](Account.md).[`memo_key`](Account.md#memo_key)

***

### mined

> **mined**: `boolean`

Defined in: [src/chain/account.ts:146](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L146)

#### Inherited from

[`Account`](Account.md).[`mined`](Account.md#mined)

***

### name

> **name**: `string`

Defined in: [src/chain/account.ts:135](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L135)

#### Inherited from

[`Account`](Account.md).[`name`](Account.md#name)

***

### next\_vesting\_withdrawal

> **next\_vesting\_withdrawal**: `string`

Defined in: [src/chain/account.ts:185](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L185)

#### Inherited from

[`Account`](Account.md).[`next_vesting_withdrawal`](Account.md#next_vesting_withdrawal)

***

### open\_orders?

> `optional` **open\_orders?**: `unknown`[]

Defined in: [src/chain/account.ts:234](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L234)

***

### other\_history

> **other\_history**: \[`number`, [`AppliedOperation`](AppliedOperation.md)\][]

Defined in: [src/chain/account.ts:230](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L230)

***

### owner

> **owner**: [`Authority`](../classes/Authority.md)

Defined in: [src/chain/account.ts:136](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L136)

#### Inherited from

[`Account`](Account.md).[`owner`](Account.md#owner)

***

### owner\_challenged

> **owner\_challenged**: `boolean`

Defined in: [src/chain/account.ts:147](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L147)

#### Inherited from

[`Account`](Account.md).[`owner_challenged`](Account.md#owner_challenged)

***

### post\_count

> **post\_count**: `number`

Defined in: [src/chain/account.ts:156](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L156)

#### Inherited from

[`Account`](Account.md).[`post_count`](Account.md#post_count)

***

### post\_history

> **post\_history**: \[`number`, [`AppliedOperation`](AppliedOperation.md)\][]

Defined in: [src/chain/account.ts:228](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L228)

***

### posting

> **posting**: [`Authority`](../classes/Authority.md)

Defined in: [src/chain/account.ts:138](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L138)

#### Inherited from

[`Account`](Account.md).[`posting`](Account.md#posting)

***

### posting\_json\_metadata

> **posting\_json\_metadata**: `string`

Defined in: [src/chain/account.ts:141](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L141)

#### Inherited from

[`Account`](Account.md).[`posting_json_metadata`](Account.md#posting_json_metadata)

***

### posting\_rewards

> **posting\_rewards**: `string` \| `number`

Defined in: [src/chain/account.ts:180](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L180)

#### Inherited from

[`Account`](Account.md).[`posting_rewards`](Account.md#posting_rewards)

***

### proxied\_vsf\_votes

> **proxied\_vsf\_votes**: `number`[]

Defined in: [src/chain/account.ts:189](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L189)

#### Inherited from

[`Account`](Account.md).[`proxied_vsf_votes`](Account.md#proxied_vsf_votes)

***

### proxy

> **proxy**: `string`

Defined in: [src/chain/account.ts:142](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L142)

#### Inherited from

[`Account`](Account.md).[`proxy`](Account.md#proxy)

***

### received\_vesting\_shares

> **received\_vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:183](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L183)

#### Inherited from

[`Account`](Account.md).[`received_vesting_shares`](Account.md#received_vesting_shares)

***

### recent\_replies?

> `optional` **recent\_replies?**: `string`[]

Defined in: [src/chain/account.ts:238](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L238)

***

### recommended?

> `optional` **recommended?**: `string`[]

Defined in: [src/chain/account.ts:239](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L239)

***

### recovery\_account

> **recovery\_account**: `string`

Defined in: [src/chain/account.ts:151](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L151)

#### Inherited from

[`Account`](Account.md).[`recovery_account`](Account.md#recovery_account)

***

### reputation

> **reputation**: `string` \| `number`

Defined in: [src/chain/account.ts:219](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L219)

***

### reset\_account

> **reset\_account**: `string`

Defined in: [src/chain/account.ts:152](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L152)

#### Inherited from

[`Account`](Account.md).[`reset_account`](Account.md#reset_account)

***

### reward\_hbd\_balance

> **reward\_hbd\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:175](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L175)

#### Inherited from

[`Account`](Account.md).[`reward_hbd_balance`](Account.md#reward_hbd_balance)

***

### reward\_hive\_balance

> **reward\_hive\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:176](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L176)

#### Inherited from

[`Account`](Account.md).[`reward_hive_balance`](Account.md#reward_hive_balance)

***

### reward\_vesting\_balance

> **reward\_vesting\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:177](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L177)

#### Inherited from

[`Account`](Account.md).[`reward_vesting_balance`](Account.md#reward_vesting_balance)

***

### reward\_vesting\_hive

> **reward\_vesting\_hive**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:178](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L178)

#### Inherited from

[`Account`](Account.md).[`reward_vesting_hive`](Account.md#reward_vesting_hive)

***

### savings\_balance

> **savings\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:165](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L165)

#### Inherited from

[`Account`](Account.md).[`savings_balance`](Account.md#savings_balance)

***

### savings\_hbd\_balance

> **savings\_hbd\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:170](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L170)

#### Inherited from

[`Account`](Account.md).[`savings_hbd_balance`](Account.md#savings_hbd_balance)

***

### savings\_hbd\_last\_interest\_payment

> **savings\_hbd\_last\_interest\_payment**: `string`

Defined in: [src/chain/account.ts:173](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L173)

#### Inherited from

[`Account`](Account.md).[`savings_hbd_last_interest_payment`](Account.md#savings_hbd_last_interest_payment)

***

### savings\_hbd\_seconds

> **savings\_hbd\_seconds**: `string`

Defined in: [src/chain/account.ts:171](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L171)

#### Inherited from

[`Account`](Account.md).[`savings_hbd_seconds`](Account.md#savings_hbd_seconds)

***

### savings\_hbd\_seconds\_last\_update

> **savings\_hbd\_seconds\_last\_update**: `string`

Defined in: [src/chain/account.ts:172](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L172)

#### Inherited from

[`Account`](Account.md).[`savings_hbd_seconds_last_update`](Account.md#savings_hbd_seconds_last_update)

***

### savings\_withdraw\_requests

> **savings\_withdraw\_requests**: `number`

Defined in: [src/chain/account.ts:174](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L174)

#### Inherited from

[`Account`](Account.md).[`savings_withdraw_requests`](Account.md#savings_withdraw_requests)

***

### tags\_usage

> **tags\_usage**: `string`[]

Defined in: [src/chain/account.ts:232](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L232)

***

### to\_withdraw

> **to\_withdraw**: `string` \| `number`

Defined in: [src/chain/account.ts:187](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L187)

#### Inherited from

[`Account`](Account.md).[`to_withdraw`](Account.md#to_withdraw)

***

### transfer\_history

> **transfer\_history**: \[`number`, [`AppliedOperation`](AppliedOperation.md)\][]

Defined in: [src/chain/account.ts:223](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L223)

Transfer and vesting operation history.

***

### vesting\_balance

> **vesting\_balance**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:218](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L218)

Vesting shares converted to vesting HIVE for display.

***

### vesting\_shares

> **vesting\_shares**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:181](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L181)

#### Inherited from

[`Account`](Account.md).[`vesting_shares`](Account.md#vesting_shares)

***

### vesting\_withdraw\_rate

> **vesting\_withdraw\_rate**: `string` \| [`Asset`](../classes/Asset.md)

Defined in: [src/chain/account.ts:184](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L184)

#### Inherited from

[`Account`](Account.md).[`vesting_withdraw_rate`](Account.md#vesting_withdraw_rate)

***

### vote\_history

> **vote\_history**: \[`number`, [`AppliedOperation`](AppliedOperation.md)\][]

Defined in: [src/chain/account.ts:229](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L229)

***

### voting\_manabar

> **voting\_manabar**: `object`

Defined in: [src/chain/account.ts:160](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L160)

#### current\_mana

> **current\_mana**: `string` \| `number`

#### last\_update\_time

> **last\_update\_time**: `number`

#### Inherited from

[`Account`](Account.md).[`voting_manabar`](Account.md#voting_manabar)

***

### voting\_power

> **voting\_power**: `number`

Defined in: [src/chain/account.ts:158](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L158)

#### Inherited from

[`Account`](Account.md).[`voting_power`](Account.md#voting_power)

***

### withdraw\_routes

> **withdraw\_routes**: `number`

Defined in: [src/chain/account.ts:188](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L188)

#### Inherited from

[`Account`](Account.md).[`withdraw_routes`](Account.md#withdraw_routes)

***

### withdrawn

> **withdrawn**: `string` \| `number`

Defined in: [src/chain/account.ts:186](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L186)

#### Inherited from

[`Account`](Account.md).[`withdrawn`](Account.md#withdrawn)

***

### witness\_votes

> **witness\_votes**: `string`[]

Defined in: [src/chain/account.ts:231](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L231)

***

### witnesses\_voted\_for

> **witnesses\_voted\_for**: `number`

Defined in: [src/chain/account.ts:190](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/account.ts#L190)

#### Inherited from

[`Account`](Account.md).[`witnesses_voted_for`](Account.md#witnesses_voted_for)
