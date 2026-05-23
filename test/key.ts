import { describe, it, beforeAll, beforeEach, afterAll, afterEach, expect, vi } from "vitest";
import assert from 'assert'


import { Client } from '../src/index.js'
import { agent } from './common.js'

describe('account_by_key_api', function() {
  
  

  const client = Client.testnet({ agent })

  it('get_key_references', async () => {
    const result = await client.keys.getKeyReferences(['TST65PUAPA4yC4RgPtGgsPupxT6yJtMhmT5JHFdsT3uoCbR8WJ25s'])
    assert.deepEqual(result, {accounts: [['hiveio']]})
  })

})
