import assert from 'node:assert'
import { after, describe, it } from 'node:test'

import { releaseAll } from '@cityssm/mssql-multi-pool'
import Debug from 'debug'

import { DEBUG_ENABLE_NAMESPACES } from '../debug.config.js'
import { WorkTechAPI } from '../index.js'

import {
  accountNumberObjectCode,
  accountNumberWorkOrderNumber,
  mssqlConfig,
  validActivityId,
  validItemId,
  validJobId,
  validObjectCode,
  validWorkOrderNumber
} from './config.js'

Debug.enable(DEBUG_ENABLE_NAMESPACES)

await describe('WorkTechAPI()', async () => {
  const api = new WorkTechAPI(mssqlConfig)

  after(async () => {
    await releaseAll()
  })

  await it('Retrieves a work order', async () => {
    const workOrder = await api.getWorkOrderByWorkOrderNumber(
      validWorkOrderNumber
    )

    assert.ok(workOrder !== undefined)
  })

  await it('Retrieves an array of resources', async () => {
    const resources = await api.getWorkOrderResourcesByWorkOrderNumber(
      validWorkOrderNumber
    )

    assert.ok(resources.length > 0)
  })

  await it('Retrieves an item', async () => {
    const item = await api.getItemByItemId(validItemId)
    assert.ok(item !== undefined)
  })

  await it('Retrieves a job', async () => {
    const job = await api.getJobByJobId(validJobId)
    assert.ok(job !== undefined)
  })

  await it('Retrieves an activity', async () => {
    const activity = await api.getActivityByActivityId(validActivityId)
    assert.ok(activity !== undefined)
  })

  await it('Retrieve activities for a given job', async () => {
    const activities = await api.getActivitiesAssignedToJobByFiscalYear(
      validJobId,
      new Date().getFullYear() - 1
    )

    assert.ok(activities.length > 0)
  })

  await it('Retrieves an object code', async () => {
    const objectCode = await api.getObjectCodeByObjectCode(validObjectCode)
    assert.ok(objectCode !== undefined)
  })

  await it('Retrieve object codes for a given job', async () => {
    const objectCodes = await api.getObjectCodesAssignedToJobByFiscalYear(
      validJobId,
      new Date().getFullYear() - 1
    )

    assert.ok(objectCodes.length > 0)
  })

  await it('Retrieves a job - activity - object code', async () => {
    const code = await api.getJobActivityObjectCodeByKeys({
      jobId: validJobId,
      activityId: validActivityId,
      objectCode: validObjectCode,
      fiscalYear: new Date().getFullYear() - 1
    })

    assert.ok(code !== undefined)
  })

  await it('Retrieves an account number', async () => {
    const accountNumber =
      await api.getAccountNumberByWorkOrderNumberAndObjectCode(
        accountNumberWorkOrderNumber,
        accountNumberObjectCode
      )

    assert.ok(accountNumber !== undefined)
  })
})
