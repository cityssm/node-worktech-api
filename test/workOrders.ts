import assert from 'node:assert'

import { releaseAll } from '@cityssm/mssql-multi-pool'

import { _addWorkOrderResource } from '../queries/workOrders/addWorkOrderResource.js'
import { _getWorkOrderResourcesByWorkOrderNumber } from '../queries/workOrders/getWorkOrderResources.js'
import { _getWorkOrderByWorkOrderNumber } from '../queries/workOrders/getWorkOrders.js'

import {
  invalidWorkOrderNumber,
  mssqlConfig,
  validItemId,
  validWorkOrderNumber
} from './config.js'

describe('queries/workOrders', () => {
  after(() => {
    releaseAll()
  })

  describe('getWorkOrders()', () => {
    it('Retrieves a work order', async () => {
      const workOrder = await _getWorkOrderByWorkOrderNumber(
        mssqlConfig,
        validWorkOrderNumber
      )

      console.log(workOrder)

      assert.ok(workOrder !== undefined)
      assert.strictEqual(workOrder.workOrderNumber, validWorkOrderNumber)
    })

    it('Returns "undefined" when no work order is available.', async () => {
      const workOrder = await _getWorkOrderByWorkOrderNumber(
        mssqlConfig,
        invalidWorkOrderNumber
      )

      assert.strictEqual(workOrder, undefined)
    })
  })

  describe('getWorkOrderResources()', () => {
    it('Retrieves an array of resources', async () => {
      const resources = await _getWorkOrderResourcesByWorkOrderNumber(
        mssqlConfig,
        validWorkOrderNumber
      )

      console.log(resources)

      assert.ok(resources.length > 0)
    })
  })

  describe('addWorkOrderResource()', () => {
    it('Adds a resource to a work order', async () => {
      const systemId = await _addWorkOrderResource(mssqlConfig, {
        workOrderNumber: validWorkOrderNumber,
        itemId: validItemId,
        quantity: 25,
        unitPrice: 12.5
      })

      assert.ok(systemId !== undefined)
    })
  })
})
