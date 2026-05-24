[**@srbde/pollen**](../index.md)

***

[@srbde/pollen](../index.md) / Client

# Class: Client

Defined in: [src/client.ts:248](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L248)

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

Defined in: [src/client.ts:348](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L348)

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

Defined in: [src/client.ts:258](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L258)

Address to Hive RPC server.
String or String[] *read-only*

***

### addressPrefix

> `readonly` **addressPrefix**: `string`

Defined in: [src/client.ts:309](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L309)

Address prefix for current network.

***

### blockchain

> `readonly` **blockchain**: [`Blockchain`](Blockchain.md)

Defined in: [src/client.ts:278](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L278)

Blockchain helper.

***

### broadcast

> `readonly` **broadcast**: [`BroadcastAPI`](BroadcastAPI.md)

Defined in: [src/client.ts:273](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L273)

Broadcast API helper.

***

### chainId

> `readonly` **chainId**: `Buffer`

Defined in: [src/client.ts:304](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L304)

Chain ID for current network.

***

### currentAddress

> **currentAddress**: `string`

Defined in: [src/client.ts:318](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L318)

***

### database

> `readonly` **database**: [`DatabaseAPI`](DatabaseAPI.md)

Defined in: [src/client.ts:263](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L263)

Database API helper.

***

### healthTracker

> `readonly` **healthTracker**: [`NodeHealthTracker`](NodeHealthTracker.md)

Defined in: [src/client.ts:299](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L299)

Node health tracker for smart failover.
Tracks per-node, per-API health and head block freshness.

***

### hivemind

> `readonly` **hivemind**: [`HivemindAPI`](HivemindAPI.md)

Defined in: [src/client.ts:283](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L283)

Hivemind helper.

***

### keys

> `readonly` **keys**: [`AccountByKeyAPI`](AccountByKeyAPI.md)

Defined in: [src/client.ts:288](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L288)

Accounts by key API helper.

***

### options

> `readonly` **options**: [`ClientOptions`](../interfaces/ClientOptions.md)

Defined in: [src/client.ts:252](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L252)

Client options, *read-only*.

***

### rc

> `readonly` **rc**: [`RCAPI`](RCAPI.md)

Defined in: [src/client.ts:268](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L268)

RC API helper.

***

### transaction

> `readonly` **transaction**: [`TransactionStatusAPI`](TransactionStatusAPI.md)

Defined in: [src/client.ts:293](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L293)

Transaction status API helper.

## Methods

### call()

> **call**(`api`, `method`, `params?`): `Promise`\<`any`\>

Defined in: [src/client.ts:443](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L443)

Sends a JSON-RPC request through the configured failover transport.

#### Parameters

##### api

`string`

API namespace to call, such as `condenser_api`.

##### method

`string`

Method within the API namespace, such as
`get_dynamic_global_properties`.

##### params?

`any` = `[]`

Positional RPC parameters. Defaults to an empty array.

#### Returns

`Promise`\<`any`\>

The decoded `result` member returned by the RPC node.

#### Remarks

The transport serializes Buffers as Hive-compatible hex strings, applies
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

### testnet()

> `static` **testnet**(`options?`): `Client`

Defined in: [src/client.ts:396](https://github.com/TheCrazyGM/dhive/blob/ebc8785ae8359da960ba5757e072e62d38bf0c05/src/client.ts#L396)

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
