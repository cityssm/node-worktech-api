import assert from 'node:assert'
import { randomUUID } from 'node:crypto'
import { after, describe, it } from 'node:test'

import { releaseAll } from '@cityssm/mssql-multi-pool'
import { millisToSeconds } from '@cityssm/to-millis'
import Debug from 'debug'

import { DEBUG_ENABLE_NAMESPACES } from '../debug.config.js'
import { WorkTechAPI } from '../index.js'
import type { AddEquipment } from '../queries/equipment/addEquipment.js'

import {
  equipmentToAdd,
  invalidEquipmentId,
  mssqlConfig,
  validEquipmentDepartment,
  validEquipmentId
} from './config.js'

Debug.enable(DEBUG_ENABLE_NAMESPACES)

await describe('queries/equipment', async () => {
  const worktechApi = new WorkTechAPI(mssqlConfig)

  after(async () => {
    await releaseAll()
  })

  await it('Retrieves a piece of equipment', async () => {
    const equipment =
      await worktechApi.getEquipmentByEquipmentId(validEquipmentId)

    console.log(equipment)

    assert.ok(equipment !== undefined)
    assert.strictEqual(equipment.equipmentId, validEquipmentId)
  })

  await it('Returns "undefined" when no equipment is available.', async () => {
    const equipment =
      await worktechApi.getEquipmentByEquipmentId(invalidEquipmentId)

    assert.strictEqual(equipment, undefined)
  })

  await it('Adds a new piece of equipment, then updates it.', async () => {
    const equipmentId = `TEST-${Math.round(millisToSeconds(Date.now())).toString()}`
    const equipmentDescription = randomUUID()

    console.log(`Adding new equipment: ${equipmentId}`)

    const equipmentRecord = Object.assign(
      {
        equipmentId,
        equipmentDescription,
        departmentOwned: validEquipmentDepartment
      },
      equipmentToAdd
    ) as AddEquipment

    const equipmentSystemId = await worktechApi.addEquipment(equipmentRecord)

    console.log(`New equipment system id: ${equipmentSystemId}`)

    const equipment = await worktechApi.getEquipmentByEquipmentId(equipmentId)

    assert(equipment !== undefined)
    assert.strictEqual(equipment.equipmentId, equipmentId)
    assert.strictEqual(equipment.equipmentDescription, equipmentDescription)

    const newEquipmentDescription = randomUUID()

    await worktechApi.updateEquipmentFields(equipmentSystemId, {
      equipmentDescription: newEquipmentDescription
    })

    const updatedEquipment =
      await worktechApi.getEquipmentByEquipmentId(equipmentId)

    assert(updatedEquipment !== undefined)
    assert.strictEqual(
      updatedEquipment.equipmentDescription,
      newEquipmentDescription
    )
  })
})
