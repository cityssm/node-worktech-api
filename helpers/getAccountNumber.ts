import type { config as MSSQLConfig } from 'mssql'

import { getJobActivityObjectCodeByKeys } from '../queries/jobs/getJobActivityObjectCodes.js'
import { getObjectCodeAssignedToJobByObjectCodeAndFiscalYear } from '../queries/jobs/getObjectCodes.js'
import { getWorkOrderByWorkOrderNumber } from '../queries/workOrders/getWorkOrders.js'

export interface AccountNumberSource {
  accountNumber: string
  accountNumberSource: 'jobActivityObjectCode' | 'jobObjectCode'
}

export async function getAccountNumberByWorkOrderNumberAndObjectCode(
  mssqlConfig: MSSQLConfig,
  workOrderNumber: string,
  optionalObjectCode?: string
): Promise<AccountNumberSource | undefined> {
  /*
   * Get work order
   */

  const workOrder = await getWorkOrderByWorkOrderNumber(
    mssqlConfig,
    workOrderNumber
  )

  if (workOrder === undefined) {
    throw new Error(`Work order not found: ${workOrderNumber}`)
  }

  /*
   * Determine object code
   */

  const objectCode = optionalObjectCode ?? workOrder.objectCode

  if (objectCode === '') {
    throw new Error('No object code available for lookup.')
  }

  /*
   * Get job - activity - object code
   */

  if (workOrder.activityId !== '') {
    const code = await getJobActivityObjectCodeByKeys(mssqlConfig, {
      jobId: workOrder.jobId,
      activityId: workOrder.activityId,
      objectCode,
      fiscalYear: workOrder.fiscalYear
    })

    if (code !== undefined && code.accountNumber !== '') {
      return {
        accountNumberSource: 'jobActivityObjectCode',
        accountNumber: code.accountNumber
      }
    }
  }

  /*
   * Get job - object code
   */

  const code = await getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(
    mssqlConfig,
    workOrder.jobId,
    objectCode,
    workOrder.fiscalYear
  )

  if (code !== undefined && code.accountNumber !== '') {
    return {
      accountNumberSource: 'jobObjectCode',
      accountNumber: code.accountNumber
    }
  }

  return undefined
}
