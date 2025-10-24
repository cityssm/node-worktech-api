// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable no-console */

import assert from 'node:assert'
import { after, describe, it } from 'node:test'

import { releaseAll } from '@cityssm/mssql-multi-pool'
import Debug from 'debug'

import { DEBUG_ENABLE_NAMESPACES } from '../debug.config.js'
import { getEmployeePayCodes } from '../queries/employees/getEmployeePayCodes.js'
import { getTimeCodes } from '../queries/employees/getTimeCodes.js'
import { getTimesheetBatchEntries } from '../queries/employees/getTimesheetBatchEntries.js'

import { mssqlConfig, validActivityId, validEmployeeNumber, validJobId } from './config.js'

Debug.enable(DEBUG_ENABLE_NAMESPACES)

await describe('queries/employees', async () => {
  after(async () => {
    await releaseAll()
  })

  await describe('getEmployeePayCodes()', async () => {
    await it('Retrieves employee pay codes', async () => {
      const employeePayCodes = await getEmployeePayCodes(
        mssqlConfig,
        validEmployeeNumber
      )

      console.log(employeePayCodes)

      if (employeePayCodes.length === 0) {
        throw new Error('No employee pay codes retrieved')
      }

      for (const employeePayCode of employeePayCodes) {
        assert.strictEqual(employeePayCode.employeeNumber, validEmployeeNumber)
      }
    })
  })

  await describe('getTimeCodes()', async () => {
    await it('Retrieves employee time codes', async () => {
      const timeCodes = await getTimeCodes(mssqlConfig)

      console.log(timeCodes)

      if (timeCodes.length === 0) {
        throw new Error('No time codes retrieved')
      }
    })
  })

  await describe('getTimesheetBatchEntries()', async () => {
    await it('Retrieves timesheet batch entries by employee number', async () => {
      const timesheetBatchEntries = await getTimesheetBatchEntries(
        mssqlConfig,
        {
          employeeNumber: validEmployeeNumber
        }
      )

      assert.ok(timesheetBatchEntries.length > 0)

      for (const timesheetBatchEntry of timesheetBatchEntries) {
        assert.strictEqual(
          timesheetBatchEntry.employeeNumber,
          validEmployeeNumber
        )
      }
    })

    await it('Retrieves timesheet batch entries by employee number and date', async () => {
      const timesheetDateString = '2025-03-14'

      const timesheetBatchEntries = await getTimesheetBatchEntries(
        mssqlConfig,
        {
          employeeNumber: validEmployeeNumber,
          timesheetDate: timesheetDateString
        }
      )

      assert.ok(timesheetBatchEntries.length > 0)

      for (const timesheetBatchEntry of timesheetBatchEntries) {
        assert.strictEqual(
          timesheetBatchEntry.employeeNumber,
          validEmployeeNumber
        )
        assert.strictEqual(
          timesheetBatchEntry.timesheetDateString,
          timesheetDateString
        )
      }
    })

    await it('Retrieves timesheet batch entries by job ID', async () => {

      const timesheetBatchEntries = await getTimesheetBatchEntries(
        mssqlConfig,
        {
          jobId: validJobId
        }
      )

      assert.ok(timesheetBatchEntries.length > 0)

      for (const timesheetBatchEntry of timesheetBatchEntries) {
        assert.strictEqual(
          timesheetBatchEntry.jobId,
          validJobId
        )
      }
    })

    await it('Retrieves timesheet batch entries by activity ID', async () => {

      const timesheetBatchEntries = await getTimesheetBatchEntries(
        mssqlConfig,
        {
          activityId: validActivityId
        }
      )

      assert.ok(timesheetBatchEntries.length > 0)

      for (const timesheetBatchEntry of timesheetBatchEntries) {
        assert.strictEqual(
          timesheetBatchEntry.activityId,
          validActivityId
        )
      }
    })
  })
})
