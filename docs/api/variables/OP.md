[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / OP

# Variable: OP

> `const` **OP**: `object`

Defined in: [src/chain/op-filter.ts:14](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/op-filter.ts#L14)

Operation filter bitmask constants for condenser_api.get_account_history.

Pass the [low, high] pair returned by opFilter() as the 4th and 5th params:
  client.call('condenser_api', 'get_account_history', [account, -1, 1000, low, high])

All bit positions confirmed empirically against live Hive accounts (2026-06-19).
Entries marked ? are inferred from protocol ordering but not yet live-confirmed.

BigInt is used throughout to avoid IEEE 754 precision loss. Bits >= 53 cannot
be safely represented as Number — pollen's call() serializes BigInt params
correctly via serializeRpcBody().

## Type Declaration

### account\_create

> `readonly` **account\_create**: `bigint`

### account\_create\_with\_delegation

> `readonly` **account\_create\_with\_delegation**: `bigint`

### account\_created

> `readonly` **account\_created**: `bigint`

### account\_update

> `readonly` **account\_update**: `bigint`

### account\_update2

> `readonly` **account\_update2**: `bigint`

### account\_witness\_proxy

> `readonly` **account\_witness\_proxy**: `bigint`

### account\_witness\_vote

> `readonly` **account\_witness\_vote**: `bigint`

### author\_reward

> `readonly` **author\_reward**: `bigint`

### cancel\_transfer\_from\_savings

> `readonly` **cancel\_transfer\_from\_savings**: `bigint`

### change\_recovery\_account

> `readonly` **change\_recovery\_account**: `bigint`

### changed\_recovery\_account

> `readonly` **changed\_recovery\_account**: `bigint`

### claim\_account

> `readonly` **claim\_account**: `bigint`

### claim\_reward\_balance

> `readonly` **claim\_reward\_balance**: `bigint`

### clear\_null\_account\_balance

> `readonly` **clear\_null\_account\_balance**: `bigint`

### collateralized\_convert

> `readonly` **collateralized\_convert**: `bigint`

### collateralized\_convert\_immediate\_conversion

> `readonly` **collateralized\_convert\_immediate\_conversion**: `bigint`

### comment

> `readonly` **comment**: `bigint`

### comment\_benefactor\_reward

> `readonly` **comment\_benefactor\_reward**: `bigint`

### comment\_options

> `readonly` **comment\_options**: `bigint`

### comment\_payout\_update

> `readonly` **comment\_payout\_update**: `bigint`

### comment\_reward

> `readonly` **comment\_reward**: `bigint`

### consolidate\_treasury\_balance

> `readonly` **consolidate\_treasury\_balance**: `bigint`

### convert

> `readonly` **convert**: `bigint`

### create\_claimed\_account

> `readonly` **create\_claimed\_account**: `bigint`

### create\_proposal

> `readonly` **create\_proposal**: `bigint`

### curation\_reward

> `readonly` **curation\_reward**: `bigint`

### custom

> `readonly` **custom**: `bigint`

### custom\_binary

> `readonly` **custom\_binary**: `bigint`

### custom\_json

> `readonly` **custom\_json**: `bigint`

### decline\_voting\_rights

> `readonly` **decline\_voting\_rights**: `bigint`

### declined\_voting\_rights

> `readonly` **declined\_voting\_rights**: `bigint`

### delayed\_voting

> `readonly` **delayed\_voting**: `bigint`

### delegate\_vesting\_shares

> `readonly` **delegate\_vesting\_shares**: `bigint`

### delete\_comment

> `readonly` **delete\_comment**: `bigint`

### effective\_comment\_vote

> `readonly` **effective\_comment\_vote**: `bigint`

### escrow\_approve

> `readonly` **escrow\_approve**: `bigint`

### escrow\_approved

> `readonly` **escrow\_approved**: `bigint`

### escrow\_dispute

> `readonly` **escrow\_dispute**: `bigint`

### escrow\_rejected

> `readonly` **escrow\_rejected**: `bigint`

### escrow\_release

> `readonly` **escrow\_release**: `bigint`

### escrow\_transfer

> `readonly` **escrow\_transfer**: `bigint`

### expired\_account\_notification

> `readonly` **expired\_account\_notification**: `bigint`

### failed\_recurrent\_transfer

> `readonly` **failed\_recurrent\_transfer**: `bigint`

### feed\_publish

> `readonly` **feed\_publish**: `bigint`

### fill\_collateralized\_convert\_request

> `readonly` **fill\_collateralized\_convert\_request**: `bigint`

### fill\_convert\_request

> `readonly` **fill\_convert\_request**: `bigint`

### fill\_order

> `readonly` **fill\_order**: `bigint`

### fill\_recurrent\_transfer

> `readonly` **fill\_recurrent\_transfer**: `bigint`

### fill\_transfer\_from\_savings

> `readonly` **fill\_transfer\_from\_savings**: `bigint`

### fill\_vesting\_withdraw

> `readonly` **fill\_vesting\_withdraw**: `bigint`

### hardfork

> `readonly` **hardfork**: `bigint`

### hardfork\_hive

> `readonly` **hardfork\_hive**: `bigint`

### hardfork\_hive\_restore

> `readonly` **hardfork\_hive\_restore**: `bigint`

### ineffective\_delete\_comment

> `readonly` **ineffective\_delete\_comment**: `bigint`

### interest

> `readonly` **interest**: `bigint`

### limit\_order\_cancel

> `readonly` **limit\_order\_cancel**: `bigint`

### limit\_order\_cancelled

> `readonly` **limit\_order\_cancelled**: `bigint`

### limit\_order\_create

> `readonly` **limit\_order\_create**: `bigint`

### limit\_order\_create2

> `readonly` **limit\_order\_create2**: `bigint`

### liquidity\_reward

> `readonly` **liquidity\_reward**: `bigint`

### pow

> `readonly` **pow**: `bigint`

### pow\_reward

> `readonly` **pow\_reward**: `bigint`

### producer\_missed

> `readonly` **producer\_missed**: `bigint`

### producer\_reward

> `readonly` **producer\_reward**: `bigint`

### proposal\_fee

> `readonly` **proposal\_fee**: `bigint`

### proposal\_pay

> `readonly` **proposal\_pay**: `bigint`

### proxy\_cleared

> `readonly` **proxy\_cleared**: `bigint`

### recover\_account

> `readonly` **recover\_account**: `bigint`

### recurrent\_transfer

> `readonly` **recurrent\_transfer**: `bigint`

### remove\_proposal

> `readonly` **remove\_proposal**: `bigint`

### report\_over\_production

> `readonly` **report\_over\_production**: `bigint`

### request\_account\_recovery

> `readonly` **request\_account\_recovery**: `bigint`

### reset\_account

> `readonly` **reset\_account**: `bigint`

### return\_vesting\_delegation

> `readonly` **return\_vesting\_delegation**: `bigint`

### set\_reset\_account

> `readonly` **set\_reset\_account**: `bigint`

### set\_withdraw\_vesting\_route

> `readonly` **set\_withdraw\_vesting\_route**: `bigint`

### shutdown\_witness

> `readonly` **shutdown\_witness**: `bigint`

### sps\_convert

> `readonly` **sps\_convert**: `bigint`

### sps\_fund

> `readonly` **sps\_fund**: `bigint`

### system\_warning

> `readonly` **system\_warning**: `bigint`

### transfer

> `readonly` **transfer**: `bigint`

### transfer\_from\_savings

> `readonly` **transfer\_from\_savings**: `bigint`

### transfer\_to\_savings

> `readonly` **transfer\_to\_savings**: `bigint`

### transfer\_to\_vesting

> `readonly` **transfer\_to\_vesting**: `bigint`

### transfer\_to\_vesting\_completed

> `readonly` **transfer\_to\_vesting\_completed**: `bigint`

### update\_proposal

> `readonly` **update\_proposal**: `bigint`

### update\_proposal\_votes

> `readonly` **update\_proposal\_votes**: `bigint`

### vesting\_shares\_split

> `readonly` **vesting\_shares\_split**: `bigint`

### vote

> `readonly` **vote**: `bigint`

### withdraw\_vesting

> `readonly` **withdraw\_vesting**: `bigint`

### witness\_set\_properties

> `readonly` **witness\_set\_properties**: `bigint`

### witness\_update

> `readonly` **witness\_update**: `bigint`
