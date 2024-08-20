import assert from 'node:assert'
import { after, describe, it } from 'node:test'

import { releaseAll } from '@cityssm/mssql-multi-pool'

import { addEquipment, getEquipmentByEquipmentId } from '../index.js'
import type { AddEquipment } from '../queries/equipment/addEquipment.js'

import {
  equipmentToAdd,
  invalidEquipmentId,
  mssqlConfig,
  validEquipmentId
} from './config.js'

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

  await it('Adds a new piece of equipment', async () => {
    const systemId = await addEquipment(
      mssqlConfig,
      Object.assign(
        {
          equipmentId: 'TEST-' + Math.floor(Math.random() * 9_999_999_999),
          equipmentDescription: 'DESCRIPTION',
          fuelType: 'Unleaded'
        },
        equipmentToAdd
      ) satisfies AddEquipment
    )

    console.log(`New equipment system id: ${systemId}`)

    assert.ok(systemId)
  })
})
