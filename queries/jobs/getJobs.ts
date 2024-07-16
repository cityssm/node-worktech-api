import {
  type IResult,
  type config as MSSQLConfig,
  connect
} from '@cityssm/mssql-multi-pool'
import NodeCache from 'node-cache'

import { cacheTimeToLiveSeconds } from '../../apiConfig.js'

import type { Job } from './types.js'

const sql = `SELECT [JobSysID] as jobSystemId,
  [Job_ID] as jobId,
  coalesce([Location], '') as location,
  rtrim(coalesce([DESC], '')) as jobDescription,
  coalesce([ShortDesc], '') as jobShortDescription,
  coalesce([Status], '') as status,

  coalesce([Prog_ID], '') as program,
  coalesce([JobGroup_ID], '') as jobGroup,
  
  rtrim(coalesce([Start_Year], '')) as startYear,
  rtrim(coalesce([Last_Year], '')) as lastYear,
  
  coalesce([AcctSeg], '') as accountSegment,

  coalesce([Actv_ID], '') as defaultActivityId,
  rtrim(coalesce([DefVeh_ID], '')) as defaultVehicleId,
  coalesce([DefProj_ID], '') as defaultProjectId,
  coalesce([Asset_ID], '') as defaultAssetId
  FROM [WMJOM] WITH (NOLOCK)`

const cache = new NodeCache({
  stdTTL: cacheTimeToLiveSeconds
})

/**
 * Retrieves a job.
 * @param mssqlConfig - SQL Server configuration.
 * @param jobId - The job id
 * @returns - The job, if available.
 */
export async function getJobByJobId(
  mssqlConfig: MSSQLConfig,
  jobId: string
): Promise<Job | undefined> {
  let jobObject: Job | undefined = cache.get(jobId)

  if (jobObject !== undefined) {
    return jobObject
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const pool = await connect(mssqlConfig)

  const jobResult = await pool
    .request()
    .input('jobId', jobId)
    .query(`${sql} where Job_ID = @jobId`) as IResult<Job>

  if (jobResult.recordset.length === 0) {
    return undefined
  }

  jobObject = jobResult.recordset[0]

  cache.set(jobId, jobObject)

  return jobObject
}
