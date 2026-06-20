[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Client

# Class: Client

Defined in: [src/client.ts:249](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L249)

High-level Hive RPC client used by every Pollen helper.

## Remarks

`Client` centralizes JSON-RPC transport, node failover, API health tracking,
network identity, and helper construction. It can run in Node.js or a browser
bundle and exposes purpose-built helpers such as [DatabaseAPI](DatabaseAPI.md),
broadcasting, and [Blockchain](Blockchain.md) so application code rarely needs
to assemble raw RPC payloads.

## Example

```ts
import { Client } from '@srbde/pollen'

const client = new Client('https://api.hive.blog')
const props = await client.database.getDynamicGlobalProperties()

console.log(`Hive head block: ${props.head_block_number}`)
```

## See

 - [ClientOptions](../interfaces/ClientOptions.md)
 - [RPCError](RPCError.md)

## Constructors

### Constructor

> **new Client**(`address`, `options?`): `Client`

Defined in: [src/client.ts:354](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L354)

Creates a client for one or more Hive RPC endpoints.

#### Parameters

##### address

`string` \| `string`[]

RPC endpoint URL or ordered failover list. For example,
`https://api.hive.blog` or `['https://api.hive.blog', 'https://api.openhive.network']`.

##### options?

[`ClientOptions`](../interfaces/ClientOptions.md) = `{}`

Network identity and resilience settings.

#### Returns

`Client`

#### Remarks

The first endpoint becomes the active node. When calls fail, Pollen uses
the configured backoff and health tracker to move across the endpoint
list without requiring callers to recreate helper objects.

#### Throws

AssertionError
Thrown when `options.chainId` is not exactly 32 bytes after hex decoding.

#### Example

```ts
import { Client } from '@srbde/pollen'

const client = new Client(
  ['https://api.hive.blog', 'https://api.deathwing.me'],
  { timeout: 30_000, failoverThreshold: 2 }
)

const accounts = await client.database.getAccounts(['srbde'])
console.log(accounts[0].balance)
```

## Properties

### address

> **address**: `string` \| `string`[]

Defined in: [src/client.ts:259](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L259)

Address to Hive RPC server.
String or String[] *read-only*

***

### addressPrefix

> `readonly` **addressPrefix**: `string`

Defined in: [src/client.ts:315](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L315)

Address prefix for current network.

***

### blockchain

> `readonly` **blockchain**: [`Blockchain`](Blockchain.md)

Defined in: [src/client.ts:279](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L279)

Blockchain helper.

***

### broadcast

> `readonly` **broadcast**: [`BroadcastAPI`](BroadcastAPI.md)

Defined in: [src/client.ts:274](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L274)

Broadcast API helper.

***

### chainId

> `readonly` **chainId**: `Uint8Array`

Defined in: [src/client.ts:310](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L310)

Chain ID for current network.

***

### currentAddress

> **currentAddress**: `string`

Defined in: [src/client.ts:324](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L324)

***

### database

> `readonly` **database**: [`DatabaseAPI`](DatabaseAPI.md)

Defined in: [src/client.ts:264](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L264)

Database API helper.

***

### healthTracker

> `readonly` **healthTracker**: [`NodeHealthTracker`](NodeHealthTracker.md)

Defined in: [src/client.ts:305](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L305)

Node health tracker for smart failover.
Tracks per-node, per-API health and head block freshness.

***

### hivemind

> `readonly` **hivemind**: [`HivemindAPI`](HivemindAPI.md)

Defined in: [src/client.ts:289](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L289)

Hivemind helper.

***

### keys

> `readonly` **keys**: [`AccountByKeyAPI`](AccountByKeyAPI.md)

Defined in: [src/client.ts:294](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L294)

Accounts by key API helper.

***

### market

> `readonly` **market**: [`MarketHistoryAPI`](MarketHistoryAPI.md)

Defined in: [src/client.ts:284](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L284)

Market History API helper.

***

### options

> `readonly` **options**: [`ClientOptions`](../interfaces/ClientOptions.md)

Defined in: [src/client.ts:253](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L253)

Client options, *read-only*.

***

### rc

> `readonly` **rc**: [`RCAPI`](RCAPI.md)

Defined in: [src/client.ts:269](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L269)

RC API helper.

***

### transaction

> `readonly` **transaction**: [`TransactionStatusAPI`](TransactionStatusAPI.md)

Defined in: [src/client.ts:299](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L299)

Transaction status API helper.

## Methods

### call()

> **call**\<`T`\>(`api`, `method`, `params?`): `Promise`\<`T`\>

Defined in: [src/client.ts:481](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L481)

Sends a JSON-RPC request through the configured failover transport.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### api

`string`

API namespace to call, such as `condenser_api`.

##### method

`string`

Method within the API namespace, such as
`get_dynamic_global_properties`.

##### params?

`unknown` = `[]`

Positional RPC parameters. Defaults to an empty array.

#### Returns

`Promise`\<`T`\>

The decoded `result` member returned by the RPC node.

#### Remarks

The transport serializes `Uint8Array` values as Hive-compatible hex strings, applies
jittered retry backoff, tracks API-specific node failures, and passively
records head-block freshness from `get_dynamic_global_properties`
responses. Broadcast calls skip the short per-fetch timeout because they
must not be retried as aggressively as read-only calls.

#### Throws

RPCError
Thrown when the node returns a JSON-RPC error. The `info` property carries
the original error data when the node provides it.

#### Throws

AssertionError
Thrown when the response id does not match the request id.

#### Example

```ts
import { Client } from '@srbde/pollen'

const client = new Client('https://api.hive.blog')
const config = await client.call('condenser_api', 'get_config')

console.log(config.HIVE_BLOCK_INTERVAL)
```

#### See

 - [retryingFetch](../@srbde/namespaces/utils/functions/retryingFetch.md)
 - [NodeHealthTracker](NodeHealthTracker.md)

***

### fromNectarflower()

> `static` **fromNectarflower**(`options?`, `bootstrapNodes?`): `Promise`\<`Client`\>

Defined in: [src/client.ts:430](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L430)

Creates a Client instance initialized with healthy nodes fetched dynamically
from nectarflower's on-chain metadata.

#### Parameters

##### options?

[`ClientOptions`](../interfaces/ClientOptions.md)

Additional options for the client.

##### bootstrapNodes?

`string` \| `string`[]

Optional list of bootstrap nodes to fetch metadata from.
Defaults to mainnet public nodes.

#### Returns

`Promise`\<`Client`\>

#### Example

```ts
import { Client } from '@srbde/pollen'

const client = await Client.fromNectarflower()
const props = await client.database.getDynamicGlobalProperties()
console.log(props.head_block_number)
```

***

### testnet()

> `static` **testnet**(`options?`): `Client`

Defined in: [src/client.ts:401](https://github.com/srbde/hive-pollen/blob/b65f93b1588bdeee045417e8462b70a51105c045/src/client.ts#L401)

Creates a client preconfigured for the public Hive testnet.

#### Parameters

##### options?

[`ClientOptions`](../interfaces/ClientOptions.md)

Optional client settings copied into the testnet
configuration.

#### Returns

`Client`

A Client targeting `https://api.fake.openhive.network`
with the testnet chain id.

#### Remarks

This helper preserves transport options such as custom HTTP agents while
replacing chain identity values so test transactions cannot be confused
with mainnet signatures.

#### Example

```ts
import { Client } from '@srbde/pollen'

const testnet = Client.testnet({ timeout: 20_000 })
const props = await testnet.database.getDynamicGlobalProperties()
console.log(props.head_block_number)
```
