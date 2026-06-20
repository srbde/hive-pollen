[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / VirtualOperationName

# Type Alias: VirtualOperationName

> **VirtualOperationName** = `"fill_convert_request"` \| `"author_reward"` \| `"curation_reward"` \| `"comment_reward"` \| `"liquidity_reward"` \| `"interest"` \| `"fill_vesting_withdraw"` \| `"fill_order"` \| `"shutdown_witness"` \| `"fill_transfer_from_savings"` \| `"hardfork"` \| `"comment_payout_update"` \| `"return_vesting_delegation"` \| `"comment_benefactor_reward"` \| `"producer_reward"` \| `"clear_null_account_balance"` \| `"proposal_pay"` \| `"sps_fund"` \| `"hardfork_hive"` \| `"hardfork_hive_restore"` \| `"delayed_voting"` \| `"consolidate_treasury_balance"` \| `"effective_comment_vote"` \| `"ineffective_delete_comment"` \| `"sps_convert"` \| `"expired_account_notification"` \| `"changed_recovery_account"` \| `"transfer_to_vesting_completed"` \| `"pow_reward"` \| `"vesting_shares_split"` \| `"account_created"` \| `"fill_collateralized_convert_request"` \| `"system_warning"` \| `"fill_recurrent_transfer"` \| `"failed_recurrent_transfer"` \| `"limit_order_cancelled"` \| `"producer_missed"` \| `"proposal_fee"` \| `"collateralized_convert_immediate_conversion"` \| `"escrow_approved"` \| `"escrow_rejected"` \| `"proxy_cleared"` \| `"declined_voting_rights"`

Defined in: [src/chain/operation.ts:121](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/chain/operation.ts#L121)

Name of a virtual operation emitted by chain processing.

## Remarks

Virtual operations cannot be broadcast directly. They appear in account and
block operation history when the chain materializes rewards, fills orders,
processes power-downs, or records system events.

## Example

```ts
const virtualName: VirtualOperationName = 'author_reward'
```
