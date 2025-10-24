import { type mssql, connect } from '@cityssm/mssql-multi-pool'

import type { TimeCode } from './types.js'

/**
 * Retrieves available time codes.
 * @param mssqlConfig - SQL Server configuration.
 * @returns The available time codes.
 */
export async function getTimeCodes(
  mssqlConfig: mssql.config
): Promise<TimeCode[]> {
  const pool = await connect(mssqlConfig)

  const result = (await pool.request().query(/* sql */ `
      SELECT
        TC_ID as timeCode,
        DESCRIPTION as timeCodeDescription,
        EXTCODE as externalCode
      FROM WMTCD WITH (NOLOCK)
      WHERE 
        Inactive = 0
        and AdminOnly = 0
      ORDER BY TC_ID`)) as mssql.IResult<TimeCode>

  return result.recordset
}
