import assert from 'node:assert'
import { after, describe, it } from 'node:test'

import { releaseAll } from '@cityssm/mssql-multi-pool'

import { addResourceItem, getItemByItemId } from '../index.js'

import { invalidItemId, mssqlConfig, validItemId } from './config.js'

await describe('queries/items', async () => {
  after(async () => {
    await releaseAll()
  })

  await it('Retrieves an item', async () => {
    const item = await getItemByItemId(mssqlConfig, validItemId)

    console.log(item)

    assert.ok(item !== undefined)
    assert.strictEqual(item.itemId, validItemId)
  })

  await it('Returns "undefined" when no item is available.', async () => {
    const item = await getItemByItemId(mssqlConfig, invalidItemId)

    assert.strictEqual(item, undefined)
  })

  await it('Creates a new resource item', async() => {

    const newItemId = `TEST_${Math.round(Date.now()/1000)}`

    let item = await getItemByItemId(mssqlConfig, newItemId)

    assert.strictEqual(item, undefined)

    const itemSystemId = await addResourceItem(mssqlConfig, {
      itemId: newItemId,
      itemType: 'TESTING',
      itemClass: 'TESTING',
      unit: 'EA'
    })

    item = await getItemByItemId(mssqlConfig, newItemId)

    assert(item)
    assert.strictEqual(item.itemSystemId, itemSystemId)
    assert.strictEqual(item.itemId, newItemId)
  })
})
