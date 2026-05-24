/**
 * @file Node health tracking for smart failover.
 * @license BSD-3-Clause-No-Military-License
 *
 * Tracks per-node, per-API health to enable intelligent failover decisions.
 * Nodes that fail for specific APIs are deprioritized for those APIs while
 * remaining available for others. Stale nodes (behind on head block) are
 * also deprioritized.
 */

interface ApiFailure {
  count: number;
  lastFailure: number;
}
/** Tracks rate-limit state for a node */
interface RateLimitState {
  /** Timestamp (ms) when the rate limit expires — skip this node until then */
  retryAfter: number;
}

interface NodeState {
  /** Per-API failure tracking (api name → failure info) */
  apiFailures: Map<string, ApiFailure>;
  /** Consecutive failures across all APIs */
  consecutiveFailures: number;
  /** Timestamp of last failure */
  lastFailure: number;
  /** Last known head block number from this node */
  headBlock: number;
  /** When headBlock was last updated */
  headBlockUpdatedAt: number;
  /** Rate-limit state — set when a 429 is received */
  rateLimit?: RateLimitState;
}

/**
 * Tuning options for Pollen's RPC node health tracker.
 *
 * @remarks
 * These values shape how aggressively a client deprioritizes nodes after
 * failures, plugin-specific errors, stale head blocks, or HTTP 429 rate limits.
 *
 * @example
 * ```ts
 * const client = new Client(['https://api.hive.blog', 'https://api.openhive.network'], {
 *   healthTrackerOptions: {
 *     maxFailuresBeforeCooldown: 2,
 *     staleBlockThreshold: 15
 *   }
 * })
 * ```
 */
export interface HealthTrackerOptions {
  /**
   * How long (ms) to deprioritize a node after consecutive failures.
   * Default: 30 seconds.
   */
  nodeCooldownMs?: number;
  /**
   * How long (ms) to deprioritize a node for a specific API after failures.
   * Default: 60 seconds.
   */
  apiCooldownMs?: number;
  /**
   * Number of consecutive failures before a node enters cooldown.
   * Default: 3.
   */
  maxFailuresBeforeCooldown?: number;
  /**
   * Number of API-specific failures before deprioritizing for that API.
   * Default: 2.
   */
  maxApiFailuresBeforeCooldown?: number;
  /**
   * How many blocks behind the best known head block a node can be
   * before being considered stale. Default: 30.
   */
  staleBlockThreshold?: number;
  /**
   * How long (ms) head block data remains valid for staleness checks.
   * Default: 2 minutes.
   */
  headBlockTtlMs?: number;
  /**
   * Default duration (ms) to skip a node after receiving a 429 response,
   * used when the server doesn't provide a Retry-After header.
   * Default: 10 seconds.
   */
  defaultRateLimitMs?: number;
}

/**
 * Tracks per-node health for resilient Hive RPC failover.
 *
 * @remarks
 * `NodeHealthTracker` separates global node failures from API/plugin-specific
 * failures. A node missing `rc_api` can be deprioritized for RC calls while
 * remaining available for database reads. It also tracks rate-limit cooldowns
 * and stale head-block data so Pollen can prefer fresher nodes.
 *
 * @example
 * ```ts
 * const tracker = new NodeHealthTracker({ staleBlockThreshold: 20 })
 * tracker.recordSuccess('https://api.hive.blog', 'condenser_api')
 *
 * const ordered = tracker.getOrderedNodes([
 *   'https://api.hive.blog',
 *   'https://api.openhive.network'
 * ])
 * ```
 */
export class NodeHealthTracker {
  private health: Map<string, NodeState> = new Map();
  private bestKnownHeadBlock: number = 0;
  private bestKnownHeadBlockTime: number = 0;

  private readonly nodeCooldownMs: number;
  private readonly apiCooldownMs: number;
  private readonly maxFailuresBeforeCooldown: number;
  private readonly maxApiFailuresBeforeCooldown: number;
  private readonly staleBlockThreshold: number;
  private readonly headBlockTtlMs: number;
  private readonly defaultRateLimitMs: number;

  /**
   * Creates a health tracker with optional cooldown and freshness tuning.
   *
   * @param options - Health tracker thresholds and cooldown durations.
   */
  constructor(options: HealthTrackerOptions = {}) {
    this.nodeCooldownMs = options.nodeCooldownMs ?? 30_000;
    this.apiCooldownMs = options.apiCooldownMs ?? 60_000;
    this.maxFailuresBeforeCooldown = options.maxFailuresBeforeCooldown ?? 3;
    this.maxApiFailuresBeforeCooldown = options.maxApiFailuresBeforeCooldown ?? 2;
    this.staleBlockThreshold = options.staleBlockThreshold ?? 30;
    this.headBlockTtlMs = options.headBlockTtlMs ?? 120_000;
    this.defaultRateLimitMs = options.defaultRateLimitMs ?? 10_000;
  }

  private getOrCreate(node: string): NodeState {
    let state = this.health.get(node);
    if (!state) {
      state = {
        apiFailures: new Map(),
        consecutiveFailures: 0,
        lastFailure: 0,
        headBlock: 0,
        headBlockUpdatedAt: 0,
      };
      this.health.set(node, state);
    }
    return state;
  }

  /**
   * Records a successful call to a node for a specific API.
   *
   * @param node - RPC endpoint URL.
   * @param api - API namespace that succeeded.
   *
   * @remarks
   * Success clears the global consecutive failure counter and any API-specific
   * failures for the namespace that just succeeded.
   *
   * @example
   * ```ts
   * tracker.recordSuccess('https://api.hive.blog', 'condenser_api')
   * ```
   */
  recordSuccess(node: string, api: string): void {
    const state = this.getOrCreate(node);
    state.consecutiveFailures = 0;
    state.apiFailures.delete(api);
  }

  /**
   * Records a network-level failure for a node and API.
   *
   * @param node - RPC endpoint URL.
   * @param api - API namespace that failed.
   *
   * @remarks
   * Network failures increment both the global consecutive failure count and the
   * API-specific failure count because they make the whole endpoint suspect.
   *
   * @example
   * ```ts
   * tracker.recordFailure('https://api.hive.blog', 'bridge')
   * ```
   */
  recordFailure(node: string, api: string): void {
    const state = this.getOrCreate(node);
    state.consecutiveFailures++;
    state.lastFailure = Date.now();

    this.incrementApiFailure(state, api);
  }

  /**
   * Records that a node returned HTTP 429.
   *
   * @param node - RPC endpoint URL.
   * @param retryAfterSeconds - Optional `Retry-After` header value in seconds.
   *
   * @remarks
   * Rate-limited nodes are skipped until their cooldown expires. If the server
   * omits `Retry-After`, Pollen uses `defaultRateLimitMs`.
   *
   * @example
   * ```ts
   * tracker.recordRateLimit('https://api.hive.blog', 10)
   * ```
   */
  recordRateLimit(node: string, retryAfterSeconds?: number): void {
    const state = this.getOrCreate(node);
    const delayMs = retryAfterSeconds != null ? retryAfterSeconds * 1000 : this.defaultRateLimitMs;
    state.rateLimit = { retryAfter: Date.now() + delayMs };
    state.consecutiveFailures++;
    state.lastFailure = Date.now();
  }

  /**
   * Checks whether a node is currently in a rate-limit cooldown.
   *
   * @param node - RPC endpoint URL.
   * @returns True when a prior 429 cooldown has not expired.
   *
   * @example
   * ```ts
   * if (!tracker.isRateLimited(node)) {
   *   // node can be attempted
   * }
   * ```
   */
  isRateLimited(node: string): boolean {
    const state = this.health.get(node);
    if (!state?.rateLimit) return false;
    return Date.now() < state.rateLimit.retryAfter;
  }

  /**
   * Records an API/plugin-specific failure.
   *
   * @param node - RPC endpoint URL.
   * @param api - API namespace that failed.
   *
   * @remarks
   * This does not increment the global node failure counter. It is designed for
   * cases such as `method not found` where one plugin is disabled but other APIs
   * on the same node may still be healthy.
   *
   * @example
   * ```ts
   * tracker.recordApiFailure('https://api.hive.blog', 'transaction_status_api')
   * ```
   */
  recordApiFailure(node: string, api: string): void {
    const state = this.getOrCreate(node);
    this.incrementApiFailure(state, api);
  }

  private incrementApiFailure(state: NodeState, api: string): void {
    const apiState = state.apiFailures.get(api) || { count: 0, lastFailure: 0 };
    apiState.count++;
    apiState.lastFailure = Date.now();
    state.apiFailures.set(api, apiState);
  }

  /**
   * Updates the last observed head block number for a node.
   *
   * @param node - RPC endpoint URL.
   * @param headBlock - Head block number reported by the node.
   *
   * @remarks
   * The client calls this passively when
   * `get_dynamic_global_properties` responses are observed, allowing failover to
   * prefer nodes that are not lagging behind the best known head.
   *
   * @example
   * ```ts
   * tracker.updateHeadBlock('https://api.hive.blog', 90_000_000)
   * ```
   */
  updateHeadBlock(node: string, headBlock: number): void {
    if (!headBlock || headBlock <= 0) return;
    const state = this.getOrCreate(node);
    state.headBlock = headBlock;
    state.headBlockUpdatedAt = Date.now();
    if (headBlock > this.bestKnownHeadBlock) {
      this.bestKnownHeadBlock = headBlock;
      this.bestKnownHeadBlockTime = Date.now();
    }
  }

  /**
   * Checks whether a node should be preferred for a given API.
   *
   * @param node - RPC endpoint URL.
   * @param api - Optional API namespace for plugin-specific health.
   * @returns True when the node is not cooling down, rate-limited, or stale.
   *
   * @example
   * ```ts
   * const healthy = tracker.isNodeHealthy('https://api.hive.blog', 'bridge')
   * ```
   */
  isNodeHealthy(node: string, api?: string): boolean {
    const state = this.health.get(node);
    if (!state) return true; // Unknown nodes are assumed healthy

    const now = Date.now();

    // Check rate-limit cooldown (429 received)
    if (state.rateLimit && now < state.rateLimit.retryAfter) {
      return false;
    }

    // Check overall node health (consecutive failures)
    if (state.consecutiveFailures >= this.maxFailuresBeforeCooldown) {
      if (now - state.lastFailure < this.nodeCooldownMs) {
        return false;
      }
    }

    // Check API-specific health
    if (api) {
      const apiState = state.apiFailures.get(api);
      if (apiState && apiState.count >= this.maxApiFailuresBeforeCooldown) {
        if (now - apiState.lastFailure < this.apiCooldownMs) {
          return false;
        }
      }
    }

    // Check head block staleness
    if (
      state.headBlock > 0 &&
      this.bestKnownHeadBlock > 0 &&
      now - state.headBlockUpdatedAt < this.headBlockTtlMs &&
      now - this.bestKnownHeadBlockTime < this.headBlockTtlMs
    ) {
      if (this.bestKnownHeadBlock - state.headBlock > this.staleBlockThreshold) {
        return false;
      }
    }

    return true;
  }

  /**
   * Orders endpoint URLs by current health for an API call.
   *
   * @param allNodes - Endpoints in caller-preferred order.
   * @param api - Optional API namespace for plugin-specific health.
   * @returns Healthy nodes first, preserving relative order, followed by
   * unhealthy nodes as fallback.
   *
   * @example
   * ```ts
   * const ordered = tracker.getOrderedNodes(nodes, 'condenser_api')
   * ```
   */
  getOrderedNodes(allNodes: string[], api?: string): string[] {
    const healthy: string[] = [];
    const unhealthy: string[] = [];

    for (const node of allNodes) {
      if (this.isNodeHealthy(node, api)) {
        healthy.push(node);
      } else {
        unhealthy.push(node);
      }
    }

    return [...healthy, ...unhealthy];
  }

  /**
   * Clears all tracked health, rate-limit, and freshness data.
   *
   * @example
   * ```ts
   * tracker.reset()
   * ```
   */
  reset(): void {
    this.health.clear();
    this.bestKnownHeadBlock = 0;
    this.bestKnownHeadBlockTime = 0;
  }

  /**
   * Returns a diagnostic snapshot of tracked node health.
   *
   * @returns A map keyed by node URL with failure counts, head block, API
   * failure counts, and current health.
   *
   * @example
   * ```ts
   * for (const [node, health] of tracker.getHealthSnapshot()) {
   *   console.log(node, health.healthy)
   * }
   * ```
   */
  getHealthSnapshot(): Map<
    string,
    {
      consecutiveFailures: number;
      headBlock: number;
      apiFailures: Record<string, { count: number }>;
      healthy: boolean;
    }
  > {
    const snapshot = new Map<string, any>();
    for (const [node, state] of this.health) {
      const apiFailures: Record<string, { count: number }> = {};
      for (const [api, failure] of state.apiFailures) {
        apiFailures[api] = { count: failure.count };
      }
      snapshot.set(node, {
        consecutiveFailures: state.consecutiveFailures,
        headBlock: state.headBlock,
        apiFailures,
        healthy: this.isNodeHealthy(node),
      });
    }
    return snapshot;
  }
}
