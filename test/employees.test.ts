// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable no-console */

import assert from 'node:assert'
import { after, describe, it } from 'node:test'

import { releaseAll } from '@cityssm/mssql-multi-pool'
import Debug from 'debug'

import { DEBUG_ENABLE_NAMESPACES } from '../debug.config.js'
import { getEmployees } from '../index.js'
import { getEmployeePayCodes } from '../queries/employees/getEmployeePayCodes.js'
import { getEmployeeTimeCodes } from '../queries/employees/getEmployeeTimeCodes.js'
import { getTimeCodes } from '../queries/employees/getTimeCodes.js'
import { getTimesheetBatchEntries } from '../queries/employees/getTimesheetBatchEntries.js'

import {
  mssqlConfig,
  validActivityId,
  validDepartment,
  validEmployeeNumber,
  validJobId
} from './config.js'

Debug.enable(DEBUG_ENABLE_NAMESPACES)

await describe('queries/employees', async () => {
  after(async () => {
    await releaseAll()
  })

  await describe('getEmployees()', async () => {
    await it('Retrieves all employees', async () => {
      const employees = await getEmployees(mssqlConfig)

      console.log(employees)

      if (employees.length === 0) {
        throw new Error('No employees retrieved')
      }

      for (const employee of employees) {
        assert.ok(employee.employeeNumber)
        assert.ok(employee.employeeName)
      }
    })

    await it('Retrieves active employees only', async () => {
      const employees = await getEmployees(mssqlConfig, {
        employeeIsActive: true
      })

      console.log(employees)

      if (employees.length === 0) {
        throw new Error('No employees retrieved')
      }

      for (const employee of employees) {
        assert.strictEqual(employee.employeeStatus, 'Active')
      }
    })

    await it('Retrieves employees by department', async () => {
      const employees = await getEmployees(mssqlConfig, {
        departments: [validDepartment]
      })

      console.log(employees)

      if (employees.length === 0) {
        throw new Error('No employees retrieved')
      }

      for (const employee of employees) {
        assert.strictEqual(employee.department, validDepartment)
      }
    })
  })

  await describe.skip('getEmployeePayCodes()', async () => {
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

  await describe.skip('getTimeCodes()', async () => {
    await it('Retrieves employee time codes', async () => {
      const timeCodes = await getTimeCodes(mssqlConfig)

      console.log(timeCodes)

      if (timeCodes.length === 0) {
        throw new Error('No time codes retrieved')
      }
    })
  })

  await describe.skip('getEmployeeTimeCodes()', async () => {

    await it('Retrieves employee time codes', async () => {

      const startMillis = Date.now()

      const timeCodes = await getEmployeeTimeCodes(
        mssqlConfig,
        validEmployeeNumber,
        180
      )

      const midMillis = Date.now()

      console.log(timeCodes)

      if (timeCodes.length === 0) {
        throw new Error('No time codes retrieved')
      }

      await getEmployeeTimeCodes(
        mssqlConfig,
        validEmployeeNumber,
        180
      )

      const endMillis = Date.now()

      const firstDurationMillis = midMillis - startMillis
      const secondDurationMillis = endMillis - midMillis

      if (secondDurationMillis >= firstDurationMillis) {
        throw new Error(
          `Cache not used: first call ${firstDurationMillis} ms, second call ${secondDurationMillis} ms`
        )
      }
    })
  })

  await describe.skip('getTimesheetBatchEntries()', async () => {
    await it('Retrieves timesheet batch entries by employee number and hours', async () => {
      const timesheetHours = 8

      const timesheetBatchEntries = await getTimesheetBatchEntries(
        mssqlConfig,
        {
          employeeNumber: validEmployeeNumber,
          timesheetHours
        }
      )

      assert.ok(timesheetBatchEntries.length > 0)

      for (const timesheetBatchEntry of timesheetBatchEntries) {
        assert.strictEqual(
          timesheetBatchEntry.employeeNumber,
          validEmployeeNumber
        )

        assert.strictEqual(timesheetBatchEntry.timesheetHours, timesheetHours)
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

    await it('Retrieves timesheet batch entries by max age days', async () => {
      const timesheetMaxAgeDays = 90

      const timesheetBatchEntries = await getTimesheetBatchEntries(
        mssqlConfig,
        {
          timesheetMaxAgeDays
        }
      )

      assert.ok(timesheetBatchEntries.length > 0)

      const currentDate = new Date()

      for (const timesheetBatchEntry of timesheetBatchEntries) {
        const timesheetDate = timesheetBatchEntry.timesheetDate as Date

        const ageInDays = Math.floor(
          (currentDate.getTime() - timesheetDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )

        assert.ok(ageInDays <= timesheetMaxAgeDays)
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
        assert.strictEqual(timesheetBatchEntry.jobId, validJobId)
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
        assert.strictEqual(timesheetBatchEntry.activityId, validActivityId)
      }
    })
  })
})
