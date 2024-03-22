import { connect } from '@cityssm/mssql-multi-pool'
import type { IResult, config as MSSQLConfig } from 'mssql'
import NodeCache from 'node-cache'

import { cacheTimeToLiveSeconds } from '../../apiConfig.js'

import type { Activity } from './types.js'

const sql = `SELECT [ActvSysID] as activitySystemId,
  [Actv_ID] as activityId,
  coalesce([ActvType], '') as activityType,
  coalesce([DESC], '') as activityDescription,
  coalesce([ShortDesc], '') as activityShortDescription,
  coalesce([ActvClass], '') as activityClass,
  coalesce([AcctSeg], '') as accountSegment
  FROM [WMACD] WITH (NOLOCK)`

const cache = new NodeCache({
  stdTTL: cacheTimeToLiveSeconds
})

/**
 * Retrieves an activity.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} activityId - The activity id
 * @returns {Promise<Activity | undefined>} - The activity, if available.
 */
export async function getActivityByActivityId(
  mssqlConfig: MSSQLConfig,
  activityId: string
): Promise<Activity | undefined> {
  let activityObject: Activity | undefined = cache.get(activityId)

  if (activityObject !== undefined) {
    return activityObject
  }

  const pool = await connect(mssqlConfig)

  const result: IResult<Activity> = await pool
    .request()
    .input('activityId', activityId)
    .query(`${sql} where Actv_ID = @activityId`)

  if (result.recordset.length === 0) {
    return undefined
  }

  activityObject = result.recordset[0]

  cache.set(activityId, activityObject)

  return activityObject
}

/**
 * Retrieves the activity associated with a given job and fiscal year.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration
 * @param {string} jobId - The job id
 * @param {string} activityId - The activity id.
 * @param {number} fiscalYear - The fiscal year
 * @returns {Promise<Activity>} - An array of activities.
 */
export async function getActivityAssignedToJobByActivityIdAndFiscalYear(
  mssqlConfig: MSSQLConfig,
  jobId: string,
  activityId: string,
  fiscalYear: number | string
): Promise<Activity | undefined> {
  const pool = await connect(mssqlConfig)

  const result: IResult<Activity> = await pool
    .request()
    .input('jobId', jobId)
    .input('activityId', activityId)
    .input('fiscalYear', fiscalYear)
    .query(
      `${sql} where Actv_ID = @activityId
        and Actv_ID in (select Actv_ID from WMJACA with (nolock) where Job_ID = @jobId and Year = @fiscalYear)`
    )

  if (result.recordset.length === 0) {
    return undefined
  }

  return result.recordset[0]
}

/**
 * Retrieves the activities associated with a given job and fiscal year.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration
 * @param {string} jobId - The job id
 * @param {number | string} fiscalYear - The fiscal year
 * @returns {Promise<Activity[]>} - An array of activities.
 */
export async function getActivitiesAssignedToJobByFiscalYear(
  mssqlConfig: MSSQLConfig,
  jobId: string,
  fiscalYear: number | string
): Promise<Activity[]> {
  const pool = await connect(mssqlConfig)

  const result: IResult<Activity> = await pool
    .request()
    .input('jobId', jobId)
    .input('fiscalYear', fiscalYear)
    .query(
      `${sql} where Actv_ID in (select Actv_ID from WMJACA with (nolock) where Job_ID = @jobId and Year = @fiscalYear)`
    )

  return result.recordset
}
