import { SMTAsset } from "./asset.js";
import { Bignum } from "./misc.js";

/**
 * Global RC pricing parameters for every Hive resource class.
 *
 * @remarks
 * RC pricing separates history bytes, account creation, market bytes, state
 * bytes, and execution time. Each resource has dynamics parameters and a price
 * curve used by the chain to compute RC costs.
 *
 * @example
 * ```ts
 * const params = await client.rc.getResourceParams()
 * console.log(params.resource_execution_time.price_curve_params)
 * ```
 */
export interface RCParams {
  resource_history_bytes: Resource;
  resource_new_accounts: Resource;
  resource_market_bytes: Resource;
  resource_state_bytes: Resource;
  resource_execution_time: Resource;
}
/**
 * Pricing configuration for a single RC resource class.
 */
export interface Resource {
  resource_dynamics_params: DynamicParam;
  price_curve_params: PriceCurveParam;
}
/**
 * Dynamic RC pool tuning values for one resource class.
 *
 * @remarks
 * These fields describe how the resource pool regenerates, decays, and caps
 * over time.
 */
export interface DynamicParam {
  resource_unit: number;
  budget_per_time_unit: number;
  pool_eq: Bignum;
  max_pool_size: Bignum;
  decay_params: {
    decay_per_time_unit: Bignum;
    decay_per_time_unit_denom_shift: number;
  };
  min_decay: number;
}
/**
 * Curve coefficients used to convert resource usage into RC cost.
 */
export interface PriceCurveParam {
  coeff_a: Bignum;
  coeff_b: Bignum;
  shift: number;
}
/**
 * Current available RC pool levels by resource class.
 *
 * @example
 * ```ts
 * const pool = await client.rc.getResourcePool()
 * console.log(pool.resource_state_bytes.pool)
 * ```
 */
export interface RCPool {
  resource_history_bytes: Pool;
  resource_new_accounts: Pool;
  resource_market_bytes: Pool;
  resource_state_bytes: Pool;
  resource_execution_time: Pool;
}
/**
 * Current pool amount for one RC resource class.
 */
export interface Pool {
  pool: Bignum;
}
/**
 * RC account state returned by `find_rc_accounts`.
 *
 * @remarks
 * `rc_manabar` is a decaying/regenerating value. Use
 * {@link RCAPI.calculateRCMana} or {@link RCAPI.getRCMana} to project the
 * current value instead of reading `current_mana` directly.
 *
 * @example
 * ```ts
 * const [account] = await client.rc.findRCAccounts(['srbde'])
 * console.log(account.max_rc)
 * ```
 */
export interface RCAccount {
  account: string;
  rc_manabar: {
    current_mana: Bignum;
    last_update_time: number;
  };
  max_rc_creation_adjustment: SMTAsset | string;
  max_rc: Bignum;
}

/**
 * Projected manabar value returned by Pollen mana helpers.
 *
 * @remarks
 * `percentage` is expressed in hundredths of a percent. Divide by 100 for a
 * human-readable percent value.
 *
 * @example
 * ```ts
 * const mana = await client.rc.getVPMana('srbde')
 * console.log(`${mana.percentage / 100}%`)
 * ```
 */
export interface Manabar {
  current_mana: number;
  max_mana: number;
  percentage: number;
}
