/**
 * @file Account by key API helpers.
 * @author Bartłomiej (@engrave) Górnicki
 */

import {PublicKey} from '../crypto.js'
import { Client } from './../client.js'

export interface AccountsByKey {
    /**
     * Account names grouped by the queried public key order.
     *
     * @remarks
     * Each inner array contains the accounts that reference the corresponding
     * public key in owner or active authorities.
     */
    accounts: string[][]
}

/**
 * Helper for resolving Hive accounts by authority public key.
 *
 * @remarks
 * The `account_by_key_api` plugin is useful for wallet recovery, ownership
 * audits, and account discovery from a known owner or active public key.
 *
 * @example
 * ```ts
 * const references = await client.keys.getKeyReferences([publicKey])
 * console.log(references.accounts[0])
 * ```
 */
export class AccountByKeyAPI {
    /**
     * Creates an account-by-key helper bound to a client.
     *
     * @param client - Client used to call `account_by_key_api`.
     */
    constructor(readonly client: Client) {}

    /**
     * Sends a raw `account_by_key_api` call.
     *
     * @param method - API method name.
     * @param params - Method-specific parameter object.
     * @returns The decoded RPC result.
     *
     * @throws RPCError
     * Thrown when the node does not expose the plugin or rejects the request.
     *
     * @example
     * ```ts
     * const result = await client.keys.call('get_key_references', {
     *   keys: [publicKey.toString()]
     * })
     * ```
     */
    public call(method: string, params?: any) {
        return this.client.call('account_by_key_api', method, params)
    }

    /**
     * Fetches accounts that reference the supplied public keys.
     *
     * @param keys - Public keys or public-key strings to search.
     * @returns Account-name groups aligned to the input key order.
     *
     * @remarks
     * Hive returns accounts whose owner or active authorities include each key.
     * The helper stringifies {@link PublicKey} instances before sending the RPC
     * payload.
     *
     * @throws RPCError
     * Thrown when account-by-key lookup is unavailable or the node rejects a key.
     *
     * @example
     * ```ts
     * const references = await client.keys.getKeyReferences([
     *   'STM8m5UgaFAAYQRuaNejYdS8FVLVp9Ss3K1qAVk5de6F8s3HnVbvA'
     * ])
     *
     * console.log(references.accounts[0])
     * ```
     */
    public async getKeyReferences(keys: (PublicKey | string)[]): Promise<AccountsByKey> {
        return this.call('get_key_references', { keys: keys.map(key => key.toString()) })
    }
}
