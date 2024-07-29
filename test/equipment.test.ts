import assert from 'node:assert'
import { after, describe, it } from 'node:test'

import { releaseAll } from '@cityssm/mssql-multi-pool'

import { getEquipmentByEquipmentId } from '../index.js'

import { invalidEquipmentId, mssqlConfig, validEquipmentId } from './config.js'

await describe('queries/equipment', async () => {
  after(async () => {
    await releaseAll()
  })

  await it('Retrieves a piece of equipment', async () => {
    const equipment = await getEquipmentByEquipmentId(
      mssqlConfig,
      validEquipmentId
    )

    console.log(equipment)

    assert.ok(equipment !== undefined)
    assert.strictEqual(equipment.equipmentId, validEquipmentId)
  })

  await it('Returns "undefined" when no equipment is available.', async () => {
    const equipment = await getEquipmentByEquipmentId(
      mssqlConfig,
      invalidEquipmentId
    )

    assert.strictEqual(equipment, undefined)
  })
})
