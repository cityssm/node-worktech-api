import { connect } from '@cityssm/mssql-multi-pool';
const sql = `SELECT [Job_ID] as jobId,
  [Actv_ID] as activityId,
  [ObjCode] as objectCode,
  rtrim([Year]) as fiscalYear,
  [AcctSeg] as accountNumber
  FROM [WMABCA] WITH (NOLOCK)`;
/**
 * Retrieves a job - activity - object code.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} jobId - The job id.
 * @param {string} activityId - The activity id.
 * @param {string} objectCode - The object code.
 * @param {number | string} fiscalYear - The fiscal year.
 * @returns {Promise<JobActivityObjectCode | undefined>} - The job - activity - object code combination if available.
 */
export async function getJobActivityObjectCodeByKeys(mssqlConfig, jobId, activityId, objectCode, fiscalYear) {
    const pool = await connect(mssqlConfig);
    const result = await pool
        .request()
        .input('jobId', jobId)
        .input('activityId', activityId)
        .input('objectCode', objectCode)
        .input('fiscalYear', fiscalYear).query(`${sql}
      where Job_ID = @jobId
      and Actv_ID = @activityId
      and ObjCode = @objectCode
      and Year = @fiscalYear`);
    if (result.recordset.length === 0) {
        return undefined;
    }
    return result.recordset[0];
}
