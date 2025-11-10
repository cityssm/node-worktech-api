import NodeCache from '@cacheable/node-cache'
import { type mssql, connect } from '@cityssm/mssql-multi-pool'

import { cacheTimeToLiveSeconds } from '../../apiConfig.js'

import type { TimeCode } from './types.js'

const cache = new NodeCache<TimeCode[]>({
  stdTTL: cacheTimeToLiveSeconds
})

/**
 * Retrieves time codes for a specific employee.
 * @param mssqlConfig - SQL Server configuration.
 * @param employeeNumber - The employee number.
 * @param timesheetMaxAgeDays - The maximum age of timesheets to consider.
 * @param bypassCache - Whether to bypass the cache.
 * @returns The time codes for the specified employee.
 */
export async function getEmployeeTimeCodes(
  mssqlConfig: mssql.config,
  employeeNumber: string,
  timesheetMaxAgeDays: number,
  bypassCache = false
): Promise<TimeCode[]> {
  const cacheKey = `${employeeNumber}-${timesheetMaxAgeDays}`

  let timeCodes = bypassCache ? undefined : cache.get(cacheKey)

  if (timeCodes !== undefined) {
    return timeCodes
  }

  const pool = await connect(mssqlConfig)

  const result = (await pool
    .request()
    .input('employeeNumber', employeeNumber)
    .input('timesheetMaxAgeDays', timesheetMaxAgeDays).query(/* sql */ `
      SELECT
        TC_ID as timeCode,
        DESCRIPTION as timeCodeDescription,
        EXTCODE as externalCode
      FROM WMTCD WITH (NOLOCK)
      WHERE 
        Inactive = 0
        and AdminOnly = 0
        and TC_ID in (
          select TC_ID
          from WMTSI with (nolock)
          where transType = 'Time Sheets'
            and type = 'Employee'
            and Item_ID = @employeeNumber
            and DateTime >= dateadd(day, -1 * @timesheetMaxAgeDays, getdate())
        )
      ORDER BY TC_ID`)) as mssql.IResult<TimeCode>

  timeCodes = result.recordset

  cache.set(cacheKey, timeCodes)

  return timeCodes
}
