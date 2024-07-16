import {
  type IResult,
  type config as MSSQLConfig,
  connect
} from '@cityssm/mssql-multi-pool'

import type { JobActivityObjectCode } from './types.js'

const sql = `SELECT [Job_ID] as jobId,
  [Actv_ID] as activityId,
  [ObjCode] as objectCode,
  rtrim([Year]) as fiscalYear,
  coalesce([AcctSeg], '') as accountNumber
  FROM [WMABCA] WITH (NOLOCK)`

/**
 * Retrieves a job - activity - object code.
 * @param mssqlConfig - SQL Server configuration.
 * @param keys - The keys to search on.
 * @param keys.jobId - The job id.
 * @param keys.activityId - The activity id.
 * @param keys.objectCode - The object code.
 * @param keys.fiscalYear - The fiscal year.
 * @returns - The job - activity - object code combination if available.
 */
export async function getJobActivityObjectCodeByKeys(
  mssqlConfig: MSSQLConfig,
  keys: {
    jobId: string
    activityId: string
    objectCode: string
    fiscalYear: number | string
  }
): Promise<JobActivityObjectCode | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const pool = await connect(mssqlConfig)

  const result = await pool
    .request()
    .input('jobId', keys.jobId)
    .input('activityId', keys.activityId)
    .input('objectCode', keys.objectCode)
    .input('fiscalYear', keys.fiscalYear).query(`${sql}
      where Job_ID = @jobId
      and Actv_ID = @activityId
      and ObjCode = @objectCode
      and Year = @fiscalYear`) as IResult<JobActivityObjectCode>

  if (result.recordset.length === 0) {
    return undefined
  }

  return result.recordset[0]
}
