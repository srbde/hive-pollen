/**
 * Operation filter bitmask constants for condenser_api.get_account_history.
 *
 * Pass the [low, high] pair returned by opFilter() as the 4th and 5th params:
 *   client.call('condenser_api', 'get_account_history', [account, -1, 1000, low, high])
 *
 * All bit positions confirmed empirically against live Hive accounts (2026-06-19).
 * Entries marked ? are inferred from protocol ordering but not yet live-confirmed.
 *
 * BigInt is used throughout to avoid IEEE 754 precision loss. Bits >= 53 cannot
 * be safely represented as Number — pollen's call() serializes BigInt params
 * correctly via serializeRpcBody().
 */
export const OP = {
  // ── Regular operations (bits 0–49) ────────────────────────────────────────
  vote: 1n << 0n, // ✅
  comment: 1n << 1n, // ✅
  transfer: 1n << 2n, // ✅
  transfer_to_vesting: 1n << 3n, // ✅
  withdraw_vesting: 1n << 4n, // ?
  limit_order_create: 1n << 5n, // ✅
  limit_order_cancel: 1n << 6n, // ✅
  feed_publish: 1n << 7n, // ✅
  convert: 1n << 8n, // ✅
  account_create: 1n << 9n, // ✅
  account_update: 1n << 10n, // ✅
  witness_update: 1n << 11n, // ?
  account_witness_vote: 1n << 12n, // ?
  account_witness_proxy: 1n << 13n, // ✅
  custom: 1n << 14n, // ?
  pow: 1n << 15n, // ?
  report_over_production: 1n << 16n, // ?
  delete_comment: 1n << 17n, // ✅
  custom_json: 1n << 18n, // ✅
  comment_options: 1n << 19n, // ✅
  set_withdraw_vesting_route: 1n << 20n, // ✅
  limit_order_create2: 1n << 21n, // ?
  claim_account: 1n << 22n, // ✅
  create_claimed_account: 1n << 23n, // ✅
  request_account_recovery: 1n << 24n, // ?
  recover_account: 1n << 25n, // ?
  change_recovery_account: 1n << 26n, // ?
  escrow_transfer: 1n << 27n, // ?
  escrow_dispute: 1n << 28n, // ?
  escrow_release: 1n << 29n, // ?
  escrow_approve: 1n << 30n, // ?
  transfer_to_savings: 1n << 32n, // ✅ (gap at 31 = pow2?)
  transfer_from_savings: 1n << 33n, // ✅
  cancel_transfer_from_savings: 1n << 34n, // ?
  custom_binary: 1n << 35n, // ?
  decline_voting_rights: 1n << 36n, // ?
  reset_account: 1n << 37n, // ?
  set_reset_account: 1n << 38n, // ?
  claim_reward_balance: 1n << 39n, // ✅
  delegate_vesting_shares: 1n << 40n, // ✅
  account_create_with_delegation: 1n << 41n, // ✅
  witness_set_properties: 1n << 42n, // ✅
  account_update2: 1n << 43n, // ✅
  create_proposal: 1n << 44n, // ✅
  update_proposal_votes: 1n << 45n, // ✅
  remove_proposal: 1n << 46n, // ?
  update_proposal: 1n << 47n, // ?
  collateralized_convert: 1n << 48n, // ✅
  recurrent_transfer: 1n << 49n, // ✅

  // ── Virtual operations (bits 50+) ─────────────────────────────────────────
  fill_convert_request: 1n << 50n, // ✅
  author_reward: 1n << 51n, // ✅
  curation_reward: 1n << 52n, // ✅
  comment_reward: 1n << 53n, // ✅
  liquidity_reward: 1n << 54n, // ?
  interest: 1n << 55n, // ✅
  fill_vesting_withdraw: 1n << 56n, // ✅
  fill_order: 1n << 57n, // ✅
  shutdown_witness: 1n << 58n, // ?
  fill_transfer_from_savings: 1n << 59n, // ✅
  hardfork: 1n << 60n, // ?
  comment_payout_update: 1n << 61n, // ✅
  return_vesting_delegation: 1n << 62n, // ✅
  comment_benefactor_reward: 1n << 63n, // ✅

  // ── High-word virtual ops — contribute to operation_filter_high ───────────
  producer_reward: 1n << 64n, // ?
  clear_null_account_balance: 1n << 65n, // ?
  proposal_pay: 1n << 66n, // ✅
  sps_fund: 1n << 67n, // ?
  hardfork_hive: 1n << 68n, // ?
  hardfork_hive_restore: 1n << 69n, // ?
  delayed_voting: 1n << 70n, // ✅
  consolidate_treasury_balance: 1n << 71n, // ?
  effective_comment_vote: 1n << 72n, // ✅
  ineffective_delete_comment: 1n << 73n, // ?
  sps_convert: 1n << 74n, // ?
  expired_account_notification: 1n << 75n, // ?
  changed_recovery_account: 1n << 76n, // ✅
  transfer_to_vesting_completed: 1n << 77n, // ✅
  pow_reward: 1n << 78n, // ?
  vesting_shares_split: 1n << 79n, // ?
  account_created: 1n << 80n, // ✅
  fill_collateralized_convert_request: 1n << 81n, // ✅
  system_warning: 1n << 82n, // ?
  fill_recurrent_transfer: 1n << 83n, // ✅
  failed_recurrent_transfer: 1n << 84n, // ✅
  limit_order_cancelled: 1n << 85n, // ✅
  producer_missed: 1n << 86n, // ✅
  proposal_fee: 1n << 87n, // ✅
  collateralized_convert_immediate_conversion: 1n << 88n, // ✅
  escrow_approved: 1n << 89n, // ?
  escrow_rejected: 1n << 90n, // ?
  proxy_cleared: 1n << 91n, // ✅
  declined_voting_rights: 1n << 92n, // ?
} as const;

export type OpFilterKey = keyof typeof OP;

/**
 * Combines one or more OP bitmasks into the [low, high] BigInt pair expected
 * by condenser_api.get_account_history params 4 and 5.
 *
 * @example
 * ```ts
 * import { OP, opFilter } from '@srbde/pollen'
 *
 * const [low, high] = opFilter(OP.fill_order)
 * const history = await client.call(
 *   'condenser_api', 'get_account_history',
 *   ['myaccount', -1, 1000, low, high]
 * )
 * ```
 */
export function opFilter(...ops: bigint[]): [bigint, bigint] {
  const mask = ops.reduce((a, b) => a | b, 0n);
  return [
    mask & 0xffffffffffffffffn, // bits 0–63  → operation_filter_low
    mask >> 64n, // bits 64+   → operation_filter_high
  ];
}
