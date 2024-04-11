import assert from 'node:assert'
import { randomUUID } from 'node:crypto'
import { after, describe, it } from 'node:test'

import { releaseAll } from '@cityssm/mssql-multi-pool'

import {
  addWorkOrderResource,
  getWorkOrderByWorkOrderNumber,
  getWorkOrderResourcesByWorkOrderNumber
} from '../index.js'

import {
  invalidWorkOrderNumber,
  mssqlConfig,
  validItemId,
  validWorkOrderNumber
} from './config.js'

await describe('queries/workOrders', async () => {
  after(async () => {
    await releaseAll()
  })

  await describe('getWorkOrders()', async () => {
    await it('Retrieves a work order', async () => {
      const workOrder = await getWorkOrderByWorkOrderNumber(
        mssqlConfig,
        validWorkOrderNumber
      )

      console.log(workOrder)

      assert.ok(workOrder !== undefined)
      assert.strictEqual(workOrder.workOrderNumber, validWorkOrderNumber)
    })

    await it('Returns "undefined" when no work order is available.', async () => {
      const workOrder = await getWorkOrderByWorkOrderNumber(
        mssqlConfig,
        invalidWorkOrderNumber
      )

      assert.strictEqual(workOrder, undefined)
    })
  })

  await describe('getWorkOrderResources()', async () => {
    await it('Retrieves an array of resources', async () => {
      const resources = await getWorkOrderResourcesByWorkOrderNumber(
        mssqlConfig,
        validWorkOrderNumber
      )

      console.log(resources)

      assert.ok(resources.length > 0)
    })
  })

  await describe('addWorkOrderResource()', async () => {
    await it('Adds a resource to a work order', async () => {
      const resourcesBefore = await getWorkOrderResourcesByWorkOrderNumber(
        mssqlConfig,
        validWorkOrderNumber
      )

      const systemId = await addWorkOrderResource(mssqlConfig, {
        workOrderNumber: validWorkOrderNumber,
        step: Math.round(Date.now() / 10_000).toString(),
        itemId: validItemId,
        workDescription: `${randomUUID().slice(-10)} - Item from Faster`,
        quantity: 25,
        unitPrice: 12.5,
        lockMargin: 1,
        lockUnitPrice: 1
      })

      assert.ok(systemId !== undefined)

      const resourcesAfter = await getWorkOrderResourcesByWorkOrderNumber(
        mssqlConfig,
        validWorkOrderNumber
      )

      assert.strictEqual(resourcesBefore.length + 1, resourcesAfter.length)

      assert.ok(
        resourcesAfter.some((resource) => {
          return resource.serviceRequestItemSystemId === systemId
        })
      )
    })
  })
})
