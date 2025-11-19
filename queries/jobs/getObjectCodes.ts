import { NodeCache } from '@cacheable/node-cache'
import { type mssql, connect } from '@cityssm/mssql-multi-pool'

import { cacheTimeToLiveSeconds } from '../../apiConfig.js'

import type { JobAssignedObjectCode, ObjectCode } from './types.js'

const sql = `SELECT [OCSysID] as objectCodeSystemId,
  [CodeID] as objectCode,
  coalesce([DESC], '') as objectCodeDescription,
  coalesce([AcctSeg], '') as accountSegment
  FROM [WMOCD] WITH (NOLOCK)`

const cache = new NodeCache<ObjectCode>({
  stdTTL: cacheTimeToLiveSeconds
})

/**
 * Retrieves an object code.
 * @param mssqlConfig - SQL Server configuration.
 * @param objectCode - The object code
 * @param bypassCache - Whether to bypass the cache
 * @returns The object code, if available.
 */
export async function getObjectCodeByObjectCode(
  mssqlConfig: mssql.config,
  objectCode: string,
  bypassCache = false
): Promise<ObjectCode | undefined> {
  let objectCodeObject = bypassCache ? undefined : cache.get(objectCode)

  if (objectCodeObject !== undefined) {
    return objectCodeObject
  }

  const pool = await connect(mssqlConfig)

  const result = (await pool
    .request()
    .input('objectCode', objectCode)
    .query(`${sql} where CodeID = @objectCode`)) as mssql.IResult<ObjectCode>

  if (result.recordset.length === 0) {
    return undefined
  }

  objectCodeObject = result.recordset[0]

  cache.set(objectCode, objectCodeObject)

  return objectCodeObject
}

const jobAssignedSql = `SELECT o.[OCSysID] as objectCodeSystemId,
  o.[CodeID] as objectCode,
  coalesce(o.[DESC], '') as objectCodeDescription,
  coalesce(o.[AcctSeg], '') as accountSegment,
  j.[Acct] as accountNumber
  FROM [WMOCD] o WITH (NOLOCK)
  left join WMJOCA j on o.OCSysID = j.OCSysID`

/**
 * Retrieves a list of object codes associated with a given job and fiscal year.
 * @param mssqlConfig - SQL Server configuration.
 * @param jobId - The job id.
 * @param fiscalYear - The fiscal year.
 * @returns - An array of object codes assigned to a given job.
 */
export async function getObjectCodesAssignedToJobByFiscalYear(
  mssqlConfig: mssql.config,
  jobId: string,
  fiscalYear: number | string
): Promise<JobAssignedObjectCode[]> {
  const pool = await connect(mssqlConfig)

  const result = (await pool
    .request()
    .input('jobId', jobId)
    .input('fiscalYear', fiscalYear)
    .query(
      `${jobAssignedSql} where j.Job_ID = @jobId and j.Year = @fiscalYear`
    )) as mssql.IResult<JobAssignedObjectCode>

  return result.recordset
}

/**
 * Retrieves an object code associated with a given job and fiscal year.
 * @param mssqlConfig - SQL Server configuration.
 * @param jobId - The job id.
 * @param objectCode - The object code.
 * @param fiscalYear - The fiscal year.
 * @returns - The object code, if available.
 */
export async function getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(
  mssqlConfig: mssql.config,
  jobId: string,
  objectCode: string,
  fiscalYear: number | string
): Promise<JobAssignedObjectCode | undefined> {
  const pool = await connect(mssqlConfig)

  const result = (await pool
    .request()
    .input('jobId', jobId)
    .input('objectCode', objectCode)
    .input('fiscalYear', fiscalYear)
    .query(
      `${jobAssignedSql} where o.CodeID = @objectCode
        and j.Job_ID = @jobId and j.Year = @fiscalYear`
    )) as mssql.IResult<JobAssignedObjectCode>

  if (result.recordset.length === 0) {
    return undefined
  }

  return result.recordset[0]
}
