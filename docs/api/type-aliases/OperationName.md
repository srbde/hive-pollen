[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / OperationName

# Type Alias: OperationName

> **OperationName** = `"vote"` \| `"comment"` \| `"transfer"` \| `"transfer_to_vesting"` \| `"withdraw_vesting"` \| `"limit_order_create"` \| `"limit_order_cancel"` \| `"feed_publish"` \| `"convert"` \| `"account_create"` \| `"account_update"` \| `"witness_update"` \| `"account_witness_vote"` \| `"account_witness_proxy"` \| `"custom"` \| `"report_over_production"` \| `"delete_comment"` \| `"custom_json"` \| `"comment_options"` \| `"set_withdraw_vesting_route"` \| `"limit_order_create2"` \| `"claim_account"` \| `"create_claimed_account"` \| `"request_account_recovery"` \| `"recover_account"` \| `"change_recovery_account"` \| `"escrow_transfer"` \| `"escrow_dispute"` \| `"escrow_release"` \| `"escrow_approve"` \| `"transfer_to_savings"` \| `"transfer_from_savings"` \| `"cancel_transfer_from_savings"` \| `"custom_binary"` \| `"decline_voting_rights"` \| `"reset_account"` \| `"set_reset_account"` \| `"claim_reward_balance"` \| `"delegate_vesting_shares"` \| `"account_create_with_delegation"` \| `"witness_set_properties"` \| `"account_update2"` \| `"create_proposal"` \| `"update_proposal_votes"` \| `"remove_proposal"` \| `"update_proposal"` \| `"collateralized_convert"` \| `"recurrent_transfer"`

Defined in: [src/chain/operation.ts:58](https://github.com/srbde/hive-pollen/blob/cc8a302f18f789980b78a8d2601884c4007a5de7/src/chain/operation.ts#L58)

Name of a broadcastable Hive operation.

## Remarks

The comments beside each union member preserve the protocol operation id used
by the binary serializer. Pollen operation tuples use this string in position
`0` and the operation payload in position `1`.

## Example

```ts
const name: OperationName = 'transfer'
```

## See

https://gitlab.syncad.com/hive/hive/-/blob/master/libraries/protocol/include/hive/protocol/operations.hpp
