/**
 * @file Transaction status API helpers.
 * @author Bartłomiej (@engrave) Górnicki
 */

import {Client} from './../client.js'

/**
 * Lifecycle state reported by Hive's transaction-status plugin.
 *
 * @remarks
 * `within_reversible_block` means the transaction is included but not final.
 * `within_irreversible_block` is the stable state most applications should wait
 * for before treating a transaction as final.
 *
 * @example
 * ```ts
 * const { status } = await client.transaction.findTransaction(txId)
 * const final = status === 'within_irreversible_block'
 * ```
 */
export type TransactionStatus =
    'unknown'
    | 'within_mempool'
    | 'within_reversible_block'
    | 'within_irreversible_block'
    | 'expired_reversible'
    | 'expired_irreversible'
    | 'too_old'

interface FindTransactionParams {
    transaction_id: string
    expiration?: string
}
/**
 * Helper for checking Hive transaction inclusion status.
 *
 * @remarks
 * The transaction status plugin reports whether a transaction is still unknown,
 * in the mempool, included in a reversible block, included irreversibly, or too
 * old to track. This is useful for user-facing broadcast confirmation flows.
 *
 * @example
 * ```ts
 * const { status } = await client.transaction.findTransaction(txId)
 * console.log(status)
 * ```
 */
export class TransactionStatusAPI {
    /**
     * Creates a transaction-status helper bound to a client.
     *
     * @param client - Client used to call `transaction_status_api`.
     */
    constructor(readonly client: Client) {}

    /**
     * Sends a raw `transaction_status_api` call.
     *
     * @param method - Transaction-status API method name.
     * @param params - Method-specific parameter object.
     * @returns The decoded RPC result.
     *
     * @throws RPCError
     * Thrown when the active node does not expose the transaction-status plugin
     * or rejects the request.
     *
     * @example
     * ```ts
     * const result = await client.transaction.call('find_transaction', {
     *   transaction_id: txId
     * })
     * ```
     */
    public call(method: string, params?: any) {
        return this.client.call('transaction_status_api', method, params)
    }

    /**
     * Finds the current lifecycle status of a transaction id.
     *
     * @param transaction_id - Hex transaction id to inspect.
     * @param expiration - Optional transaction expiration timestamp, used by the
     * plugin to distinguish expired transactions from unknown ones.
     * @returns The transaction status reported by the node.
     *
     * @throws RPCError
     * Thrown when the plugin is unavailable or the transaction id is malformed.
     *
     * @example
     * ```ts
     * const { status } = await client.transaction.findTransaction(
     *   confirmation.id,
     *   transaction.expiration
     * )
     *
     * if (status === 'within_irreversible_block') {
     *   console.log('Final')
     * }
     * ```
     */
    public async findTransaction(transaction_id: string, expiration?: string): Promise<{ status: TransactionStatus }> {
        const params: FindTransactionParams = {
            transaction_id
        }
        if (expiration) {
            params.expiration = expiration
        }
        return this.call('find_transaction', params)
    }
}
