import { connect } from '@cityssm/mssql-multi-pool';
const sql = `SELECT [Job_ID] as jobId,
  [Actv_ID] as activityId,
  [ObjCode] as objectCode,
  rtrim([Year]) as fiscalYear,
  coalesce([AcctSeg], '') as accountNumber
  FROM [WMABCA] WITH (NOLOCK)`;
/**
 * Retrieves a job - activity - object code.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {object} keys - The keys to search on.
 * @param {string} keys.jobId - The job id.
 * @param {string} keys.activityId - The activity id.
 * @param {string} keys.objectCode - The object code.
 * @param {string} keys.fiscalYear - The fiscal year.
 * @returns {Promise<JobActivityObjectCode | undefined>} - The job - activity - object code combination if available.
 */
export async function getJobActivityObjectCodeByKeys(mssqlConfig, keys) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const pool = await connect(mssqlConfig);
    const result = await pool
        .request()
        .input('jobId', keys.jobId)
        .input('activityId', keys.activityId)
        .input('objectCode', keys.objectCode)
        .input('fiscalYear', keys.fiscalYear).query(`${sql}
      where Job_ID = @jobId
      and Actv_ID = @activityId
      and ObjCode = @objectCode
      and Year = @fiscalYear`);
    if (result.recordset.length === 0) {
        return undefined;
    }
    return result.recordset[0];
}
