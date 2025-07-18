import { NodeCache } from '@cacheable/node-cache'
import { type mssql, connect } from '@cityssm/mssql-multi-pool'

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

const cache = new NodeCache<Activity>({
  stdTTL: cacheTimeToLiveSeconds
})

/**
 * Retrieves an activity.
 * @param mssqlConfig - SQL Server configuration.
 * @param activityId - The activity id
 * @returns - The activity, if available.
 */
export async function getActivityByActivityId(
  mssqlConfig: mssql.config,
  activityId: string
): Promise<Activity | undefined> {
  let activityObject = cache.get(activityId)

  if (activityObject !== undefined) {
    return activityObject
  }

  const pool = await connect(mssqlConfig)

  const result = (await pool
    .request()
    .input('activityId', activityId)
    .query(`${sql} where Actv_ID = @activityId`)) as mssql.IResult<Activity>

  if (result.recordset.length === 0) {
    return undefined
  }

  activityObject = result.recordset[0]

  cache.set(activityId, activityObject)

  return activityObject
}

/**
 * Retrieves the activity associated with a given job and fiscal year.
 * @param mssqlConfig - SQL Server configuration
 * @param jobId - The job id
 * @param activityId - The activity id.
 * @param fiscalYear - The fiscal year
 * @returns - An array of activities.
 */
export async function getActivityAssignedToJobByActivityIdAndFiscalYear(
  mssqlConfig: mssql.config,
  jobId: string,
  activityId: string,
  fiscalYear: number | string
): Promise<Activity | undefined> {
  const pool = await connect(mssqlConfig)

  const result = (await pool
    .request()
    .input('jobId', jobId)
    .input('activityId', activityId)
    .input('fiscalYear', fiscalYear)
    .query(
      `${sql} where Actv_ID = @activityId
        and Actv_ID in (select Actv_ID from WMJACA with (nolock) where Job_ID = @jobId and Year = @fiscalYear)`
    )) as mssql.IResult<Activity>

  if (result.recordset.length === 0) {
    return undefined
  }

  return result.recordset[0]
}

/**
 * Retrieves the activities associated with a given job and fiscal year.
 * @param mssqlConfig - SQL Server configuration
 * @param jobId - The job id
 * @param fiscalYear - The fiscal year
 * @returns - An array of activities.
 */
export async function getActivitiesAssignedToJobByFiscalYear(
  mssqlConfig: mssql.config,
  jobId: string,
  fiscalYear: number | string
): Promise<Activity[]> {
  const pool = await connect(mssqlConfig)

  const result = (await pool
    .request()
    .input('jobId', jobId)
    .input('fiscalYear', fiscalYear)
    .query(
      `${sql} where Actv_ID in (select Actv_ID from WMJACA with (nolock) where Job_ID = @jobId and Year = @fiscalYear)`
    )) as mssql.IResult<Activity>

  return result.recordset
}
