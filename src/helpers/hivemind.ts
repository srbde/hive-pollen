/**
 * Hivemind database query wrapper
 */

import { Account } from '../chain/account.js'
import { Discussion } from '../chain/comment.js'
import { CommunityDetail, Notifications } from '../chain/hivemind.js'
import { Client } from './../client.js'

/**
 * Query options for ranked Hivemind post feeds.
 *
 * @remarks
 * Bridge ranking supports global feeds, community feeds, pagination, and an
 * observer account for personalized muted/reputation context.
 *
 * @example
 * ```ts
 * const query: PostsQuery = {
 *   sort: 'trending',
 *   tag: 'hive-139531',
 *   limit: 10,
 *   observer: 'srbde'
 * }
 * ```
 */
export interface PostsQuery {
    /**
     * Number of posts to fetch
     */
    limit?: number
    /**
     * Sorting posts
     */
    sort: 'trending' | 'hot' | 'created' | 'promoted' | 'payout' | 'payout_comments' | 'muted'
    /**
     * Filtering with tags
     */
    tag?: string[] | string
    /**
     * Observer account
     */
    observer?: string
    /**
     * Paginating last post author
     */
    start_author?: string
    /**
     * Paginating last post permlink
     */
    start_permlink?: string
}

/**
 * Omitting sort extended from BridgeParam
 */
/**
 * Query options for posts associated with a specific account.
 *
 * @example
 * ```ts
 * const query: AccountPostsQuery = {
 *   account: 'srbde',
 *   sort: 'posts',
 *   limit: 10
 * }
 * ```
 */
export interface AccountPostsQuery extends Omit<PostsQuery, 'sort'> {
    account: string
    sort: 'posts'
}

/**
 * Query options for fetching a single community.
 */
export interface CommunityQuery {
    name: string
    observer: string
}

/**
 * Query options for community role lookups.
 *
 * @remarks
 * Reserved for bridge role endpoints that identify moderators, admins, and
 * other community team assignments.
 */
export interface CommunityRolesQuery {
    community: string
}

/**
 * Query options for an account notification feed.
 *
 * @example
 * ```ts
 * const query: AccountNotifsQuery = {
 *   account: 'srbde',
 *   limit: 25
 * }
 * ```
 */
export interface AccountNotifsQuery {
    account: Account['name']
    limit: number
    type?: 'new_community' | 'pin_post'
}

/**
 * Query options for listing communities known to Hivemind.
 *
 * @example
 * ```ts
 * const query: ListCommunitiesQuery = {
 *   limit: 20,
 *   observer: 'srbde'
 * }
 * ```
 */
export interface ListCommunitiesQuery {
    /**
     * Paginating last
     */
    last?: string
    /**
     * Number of communities to fetch
     */
    limit: number
    /**
     * To be developed, not ready yet
     */
    query?: string | any
    /**
     * Observer account
     */
    observer?: Account['name']
}

/**
 * Helper for Hive Hivemind and bridge API reads.
 *
 * @remarks
 * Hivemind powers social data that is not stored directly in block operations:
 * ranked posts, community metadata, subscriptions, and notification feeds. This
 * helper routes calls through the `bridge` API namespace used by modern Hive
 * front ends.
 *
 * @example
 * ```ts
 * const posts = await client.hivemind.getRankedPosts({
 *   sort: 'trending',
 *   tag: 'hive-139531',
 *   limit: 10
 * })
 *
 * console.log(posts.map((post) => post.title))
 * ```
 */
export class HivemindAPI {
    /**
     * Creates a Hivemind helper bound to a client.
     *
     * @param client - Client used to call the bridge API namespace.
     */
    constructor(readonly client: Client) { }

    /**
     * Sends a raw bridge API call.
     *
     * @param method - Bridge method name.
     * @param params - Method-specific named parameters.
     * @returns The decoded bridge result.
     *
     * @throws RPCError
     * Thrown when the active node does not expose bridge or rejects the request.
     *
     * @example
     * ```ts
     * const posts = await client.hivemind.call('get_ranked_posts', {
     *   sort: 'hot',
     *   tag: 'hive-139531',
     *   limit: 5
     * })
     * ```
     */
    public call(method: string, params?: any) {
        return this.client.call('bridge', method, params)
    }

    /**
     * Fetches ranked posts from Hivemind.
     *
     * @param options - Sort, tag/community, pagination, observer, and limit
     * settings.
     * @returns Discussion records ordered by the selected ranking mode.
     *
     * @throws RPCError
     * Thrown when bridge rejects the ranking query.
     *
     * @example
     * ```ts
     * const posts = await client.hivemind.getRankedPosts({
     *   sort: 'created',
     *   tag: 'hive-139531',
     *   limit: 20,
     *   observer: 'srbde'
     * })
     * ```
     */
    public getRankedPosts(options: PostsQuery): Promise<Discussion[]> {
        return this.call('get_ranked_posts', options)
    }

    /**
     * Fetches posts authored or surfaced by a specific account.
     *
     * @param options - Account, pagination, observer, and limit settings.
     * @returns Discussion records from the account's post feed.
     *
     * @throws RPCError
     * Thrown when bridge rejects the account-post query.
     *
     * @example
     * ```ts
     * const posts = await client.hivemind.getAccountPosts({
     *   account: 'srbde',
     *   sort: 'posts',
     *   limit: 10
     * })
     * ```
     */
    public getAccountPosts(options: AccountPostsQuery): Promise<Discussion[]> {
        return this.call('get_account_posts', options)
    }

    /**
     * Fetches community metadata from Hivemind.
     *
     * @param options - Community name and observer account.
     * @returns Community detail records including roles, subscribers, and
     * display metadata.
     *
     * @throws RPCError
     * Thrown when the community cannot be read.
     *
     * @example
     * ```ts
     * const [community] = await client.hivemind.getCommunity({
     *   name: 'hive-139531',
     *   observer: 'srbde'
     * })
     *
     * console.log(community.title)
     * ```
     */
    public getCommunity(options: CommunityQuery): Promise<CommunityDetail[]> {
        return this.call('get_community', options)
    }

    /**
     * Lists communities followed by an account.
     *
     * @param account - Account name or bridge-compatible account parameter.
     * @returns Subscription records containing community and role information.
     *
     * @throws RPCError
     * Thrown when bridge rejects the subscription lookup.
     *
     * @example
     * ```ts
     * const subscriptions = await client.hivemind.listAllSubscriptions('srbde')
     * console.log(subscriptions)
     * ```
     */
    public listAllSubscriptions(account: Account['name'] | object): Promise<Discussion[]> {
        return this.call('list_all_subscriptions', account)
    }

    /**
     * Fetches an account's Hivemind notification feed.
     *
     * @param options - Account, limit, and optional notification type filter.
     * @returns Notification records for the account.
     *
     * @throws RPCError
     * Thrown when bridge rejects the notification query.
     *
     * @example
     * ```ts
     * const notifications = await client.hivemind.getAccountNotifications({
     *   account: 'srbde',
     *   limit: 25
     * })
     * ```
     */
    public getAccountNotifications(options?: AccountNotifsQuery): Promise<Notifications[]> {
        return this.call('account_notifications', options)
    }

    /**
     * Lists communities known to Hivemind.
     *
     * @param options - Pagination, limit, query, and observer settings.
     * @returns Community detail records.
     *
     * @throws RPCError
     * Thrown when bridge rejects the community list query.
     *
     * @example
     * ```ts
     * const communities = await client.hivemind.listCommunities({
     *   limit: 20,
     *   observer: 'srbde'
     * })
     * ```
     */
    public listCommunities(options: ListCommunitiesQuery): Promise<CommunityDetail[]> {
        return this.call('list_communities', options)
    }
}
