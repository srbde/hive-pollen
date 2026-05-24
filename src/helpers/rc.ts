/* tslint:disable:no-string-literal */

import { Account } from '../chain/account.js'
import { getVests } from '../chain/misc.js'
import { Manabar, RCAccount, RCParams, RCPool } from '../chain/rc.js'
import { Client } from './../client.js'

/**
 * Helper for Hive Resource Credit and voting mana calculations.
 *
 * @remarks
 * `RCAPI` reads `rc_api` data and converts Hive manabar state into current
 * mana and percentage values. RC mana controls transaction capacity, while
 * voting mana controls curation influence; both regenerate over Hive's
 * five-day manabar window.
 *
 * @example
 * ```ts
 * const rc = await client.rc.getRCMana('srbde')
 * const vp = await client.rc.getVPMana('srbde')
 *
 * console.log(rc.percentage / 100, vp.percentage / 100)
 * ```
 */
export class RCAPI {
    /**
     * Creates an RC helper bound to a client.
     *
     * @param client - Client used to call `rc_api` and condenser account data.
     */
    constructor(readonly client: Client) {}

    /**
     * Sends a raw `rc_api` call through the parent client.
     *
     * @param method - RC API method name.
     * @param params - Named parameter object accepted by the method.
     * @returns The decoded RPC result.
     *
     * @throws RPCError
     * Thrown when the active RPC node does not expose `rc_api` or rejects the
     * request.
     *
     * @example
     * ```ts
     * const result = await client.rc.call('find_rc_accounts', {
     *   accounts: ['srbde']
     * })
     * ```
     */
    public call(method: string, params?: any) {
        return this.client.call('rc_api', method, params)
    }

    /**
     * Fetches RC account records for one or more usernames.
     *
     * @param usernames - Account names to inspect.
     * @returns RC account records including max RC and current RC manabar state.
     *
     * @throws RPCError
     * Thrown when the node cannot serve `find_rc_accounts`.
     *
     * @example
     * ```ts
     * const [rcAccount] = await client.rc.findRCAccounts(['srbde'])
     * console.log(rcAccount.max_rc)
     * ```
     */
    public async findRCAccounts(usernames: string[]): Promise<RCAccount[]> {
        return (await this.call('find_rc_accounts', { accounts: usernames })).rc_accounts
    }

    /**
     * Fetches global RC resource parameters.
     *
     * @returns Chain-wide coefficients used to price CPU, state bytes, history,
     * execution time, and market bandwidth.
     *
     * @throws RPCError
     * Thrown when the node cannot serve `get_resource_params`.
     *
     * @example
     * ```ts
     * const params = await client.rc.getResourceParams()
     * console.log(params.resource_params)
     * ```
     */
    public async getResourceParams(): Promise<RCParams> {
        return (await this.call('get_resource_params', {})).resource_params
    }

    /**
     * Fetches the current RC resource pool.
     *
     * @returns Current pool levels for the chain's RC resource classes.
     *
     * @throws RPCError
     * Thrown when the node cannot serve `get_resource_pool`.
     *
     * @example
     * ```ts
     * const pool = await client.rc.getResourcePool()
     * console.log(pool.resource_pool)
     * ```
     */
    public async getResourcePool(): Promise<RCPool> {
        return (await this.call('get_resource_pool', {})).resource_pool
    }

    /**
     * Fetches and calculates current RC mana for an account.
     *
     * @param username - Account name to inspect.
     * @returns Manabar values with current mana, maximum mana, and percentage in
     * hundredths of a percent.
     *
     * @remarks
     * The calculation projects regeneration from the account's last RC manabar
     * update to the current wall-clock time.
     *
     * @throws RPCError
     * Thrown when RC account lookup fails.
     *
     * @example
     * ```ts
     * const mana = await client.rc.getRCMana('srbde')
     * console.log(`${mana.percentage / 100}% RC`)
     * ```
     */
    public async getRCMana(username: string): Promise<Manabar> {
        const rc_account: RCAccount = (await this.findRCAccounts([username]))[0]
        return this.calculateRCMana(rc_account)
    }

    /**
     * Fetches and calculates current voting mana for an account.
     *
     * @param username - Account name to inspect.
     * @returns Voting manabar values with current mana, maximum mana, and
     * percentage in hundredths of a percent.
     *
     * @remarks
     * Maximum voting mana is derived from vesting shares, then regenerated across
     * Hive's five-day voting manabar window.
     *
     * @throws RPCError
     * Thrown when account lookup fails.
     *
     * @example
     * ```ts
     * const mana = await client.rc.getVPMana('srbde')
     * console.log(`${mana.percentage / 100}% voting mana`)
     * ```
     */
    public async getVPMana(username: string): Promise<Manabar> {
        const account: Account = (
            await this.client.call('condenser_api', 'get_accounts', [[username]])
        )[0]
        return this.calculateVPMana(account)
    }

    /**
     * Calculates current RC mana from an RC account record.
     *
     * @param rc_account - Account record returned by {@link findRCAccounts}.
     * @returns Projected manabar state at the current wall-clock time.
     *
     * @example
     * ```ts
     * const [rcAccount] = await client.rc.findRCAccounts(['srbde'])
     * const mana = client.rc.calculateRCMana(rcAccount)
     * ```
     */
    public calculateRCMana(rc_account: RCAccount): Manabar {
        return this._calculateManabar(
            Number(rc_account.max_rc),
            rc_account.rc_manabar
        )
    }

    /**
     * Calculates current voting mana from a condenser account record.
     *
     * @param account - Account object containing vesting shares and voting
     * manabar state.
     * @returns Projected voting manabar state at the current wall-clock time.
     *
     * @example
     * ```ts
     * const [account] = await client.database.getAccounts(['srbde'])
     * const mana = client.rc.calculateVPMana(account)
     * ```
     */
    public calculateVPMana(account: Account): Manabar {
        const max_mana: number = getVests(account) * Math.pow(10, 6)
        return this._calculateManabar(max_mana, account.voting_manabar)
    }

    /**
     * Internal convenience method to reduce redundant code
     */
    private _calculateManabar(
        max_mana: number,
        { current_mana, last_update_time }: { current_mana: any; last_update_time: any }
    ): Manabar {
        const delta: number = Date.now() / 1000 - last_update_time
        current_mana = Number(current_mana) + (delta * max_mana) / 432000
        let percentage: number = Math.round((current_mana / max_mana) * 10000)

        if (!isFinite(percentage) || percentage < 0) {
            percentage = 0
        } else if (percentage > 10000) {
            percentage = 10000
        }

        return { current_mana, max_mana, percentage }
    }
}
