/**
 * @file Hive transaction type definitions.
 * @author Johan Nordberg <code@johan-nordberg.com>
 * @license
 * Copyright (c) 2017 Johan Nordberg. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * You acknowledge that this software is not designed, licensed or intended for use
 * in the design, construction, operation or maintenance of any military facility.
 */

import { Operation } from './operation.js'

/**
 * Unsigned Hive transaction ready for serialization and signing.
 *
 * @remarks
 * `ref_block_num` and `ref_block_prefix` provide TAPOS protection by anchoring
 * the transaction to a recent block. `expiration` bounds how long witnesses may
 * accept the transaction.
 *
 * @example
 * ```ts
 * const transaction: Transaction = {
 *   ref_block_num,
 *   ref_block_prefix,
 *   expiration,
 *   operations: [['vote', vote]],
 *   extensions: []
 * }
 * ```
 */
export interface Transaction {
    /**
     * Lower 16 bits of the referenced head block number.
     */
    ref_block_num: number
    /**
     * Prefix extracted from the referenced block id.
     */
    ref_block_prefix: number
    /**
     * UTC expiration timestamp without a trailing timezone suffix.
     */
    expiration: string
    /**
     * Ordered operation list executed atomically by the chain.
     */
    operations: Operation[]
    /**
     * Transaction extension values. Hive currently expects this to be empty for
     * the operations supported by Pollen.
     */
    extensions: any[]
}

/**
 * Hive transaction plus compact ECDSA signatures.
 *
 * @remarks
 * Signatures are hex-encoded wire signatures produced from the chain-id-prefixed
 * transaction digest.
 *
 * @example
 * ```ts
 * const signed = client.broadcast.sign(transaction, activeKey)
 * console.log(signed.signatures)
 * ```
 */
export interface SignedTransaction extends Transaction {
    /**
     * Hex-encoded recoverable signatures.
     */
    signatures: string[]
}

/**
 * Confirmation returned after broadcasting a transaction.
 *
 * @remarks
 * The local transaction id is added by Pollen after signing, while block and
 * transaction indexes are supplied by the RPC node when available.
 *
 * @example
 * ```ts
 * const confirmation = await client.broadcast.transfer(transfer, activeKey)
 * console.log(confirmation.id, confirmation.block_num)
 * ```
 */
export interface TransactionConfirmation {
    /**
     * Transaction id.
     */
    id: string // transaction_id_type
    /**
     * Block number that accepted the transaction.
     */
    block_num: number // int32_t
    /**
     * Transaction index within the accepting block.
     */
    trx_num: number // int32_t
    /**
     * Whether the node considered the transaction expired.
     */
    expired: boolean
}
