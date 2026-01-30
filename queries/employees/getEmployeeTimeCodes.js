import NodeCache from '@cacheable/node-cache';
import { connect } from '@cityssm/mssql-multi-pool';
import { cacheTimeToLiveSeconds } from '../../apiConfig.js';
const cache = new NodeCache({
    stdTTL: cacheTimeToLiveSeconds
});
/**
 * Retrieves time codes for a specific employee.
 * @param mssqlConfig - SQL Server configuration.
 * @param employeeNumber - The employee number.
 * @param timesheetMaxAgeDays - The maximum age of timesheets to consider.
 * @param bypassCache - Whether to bypass the cache.
 * @returns The time codes for the specified employee.
 */
export async function getEmployeeTimeCodes(mssqlConfig, employeeNumber, timesheetMaxAgeDays, bypassCache = false) {
    const cacheKey = `${employeeNumber}-${timesheetMaxAgeDays}`;
    let timeCodes = bypassCache ? undefined : cache.get(cacheKey);
    if (timeCodes !== undefined) {
        return timeCodes;
    }
    const pool = await connect(mssqlConfig);
    const result = (await pool
        .request()
        .input('employeeNumber', employeeNumber)
        .input('timesheetMaxAgeDays', timesheetMaxAgeDays)
        .query(/* sql */ `
      SELECT
        TC_ID AS timeCode,
        DESCRIPTION AS timeCodeDescription,
        EXTCODE AS externalCode
      FROM
        WMTCD
      WITH
        (NOLOCK)
      WHERE
        Inactive = 0
        AND AdminOnly = 0
        AND TC_ID IN (
          SELECT
            TC_ID
          FROM
            WMTSI
          WITH
            (nolock)
          WHERE
            transType = 'Time Sheets'
            AND
          TYPE = 'Employee'
          AND Item_ID = @employeeNumber
          AND DateTime >= dateadd(day, -1 * @timesheetMaxAgeDays, getdate())
        )
      ORDER BY
        TC_ID
    `));
    timeCodes = result.recordset;
    cache.set(cacheKey, timeCodes);
    return timeCodes;
}
