import type { mssql } from '@cityssm/mssql-multi-pool'

import { accountSegmentSeparator } from '../apiConfig.js'
import { getJobActivityObjectCodeByKeys } from '../queries/jobs/getJobActivityObjectCodes.js'
import { getJobByJobId } from '../queries/jobs/getJobs.js'
import {
  getObjectCodeAssignedToJobByObjectCodeAndFiscalYear,
  getObjectCodeByObjectCode
} from '../queries/jobs/getObjectCodes.js'
import { getWorkOrderByWorkOrderNumber } from '../queries/workOrders/getWorkOrders.js'

export interface AccountNumberSource {
  accountNumber: string
  accountNumberSource: // eslint-disable-next-line no-secrets/no-secrets
  'assignedJobActivityObjectCode' | 'assignedJobObjectCode' | 'jobObjectCode'
}

/**
 * Retrieves an account number for a given work order.
 * @param mssqlConfig - SQL Server configuration.
 * @param workOrderNumber - The work order number.
 * @param optionalObjectCode - An optional object code.
 * @returns - The account number and its source, if available.
 */
export async function getAccountNumberByWorkOrderNumberAndObjectCode(
  mssqlConfig: mssql.config,
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
        // eslint-disable-next-line no-secrets/no-secrets
        accountNumberSource: 'assignedJobActivityObjectCode',
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
      accountNumberSource: 'assignedJobObjectCode',
      accountNumber: code.accountNumber
    }
  }

  /*
   * Build from job and object code
   */

  const jobObject = await getJobByJobId(mssqlConfig, workOrder.jobId)

  if (jobObject === undefined) {
    throw new Error(`Job not found: ${workOrder.jobId}`)
  } else if (jobObject.accountSegment === '') {
    throw new Error(`Job has no associated account segment: ${workOrder.jobId}`)
  }

  const objectCodeObject = await getObjectCodeByObjectCode(
    mssqlConfig,
    objectCode
  )

  if (objectCodeObject === undefined) {
    throw new Error(`Object code not found: ${objectCode}`)
  } else if (objectCodeObject.accountSegment === '') {
    throw new Error(
      `Object code has no associated account segment: ${objectCode}`
    )
  }

  return {
    accountNumberSource: 'jobObjectCode',
    accountNumber: `${jobObject.accountSegment}${accountSegmentSeparator}${objectCodeObject.accountSegment}`
  }
}
