import { connect } from '@cityssm/mssql-multi-pool';
import NodeCache from 'node-cache';
import { cacheTimeToLiveSeconds } from '../../apiConfig.js';
const sql = `SELECT [OCSysID] as objectCodeSystemId,
  [CodeID] as objectCode,
  coalesce([DESC], '') as objectCodeDescription,
  coalesce([AcctSeg], '') as accountSegment
  FROM [WMOCD] WITH (NOLOCK)`;
const cache = new NodeCache({
    stdTTL: cacheTimeToLiveSeconds
});
/**
 * Retrieves an object code.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} objectCode - The object code
 * @returns {Promise<ObjectCode | undefined>} - The object code, if available.
 */
export async function getObjectCodeByObjectCode(mssqlConfig, objectCode) {
    let objectCodeObject = cache.get(objectCode);
    if (objectCodeObject !== undefined) {
        return objectCodeObject;
    }
    const pool = await connect(mssqlConfig);
    const result = await pool
        .request()
        .input('objectCode', objectCode)
        .query(`${sql} where CodeID = @objectCode`);
    if (result.recordset.length === 0) {
        return undefined;
    }
    objectCodeObject = result.recordset[0];
    cache.set(objectCode, objectCodeObject);
    return objectCodeObject;
}
const jobAssignedSql = `SELECT o.[OCSysID] as objectCodeSystemId,
  o.[CodeID] as objectCode,
  coalesce(o.[DESC], '') as objectCodeDescription,
  coalesce(o.[AcctSeg], '') as accountSegment,
  j.[Acct] as accountNumber
  FROM [WMOCD] o WITH (NOLOCK)
  left join WMJOCA j on o.OCSysID = j.OCSysID`;
/**
 * Retrieves a list of object codes associated with a given job and fiscal year.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} jobId - The job id.
 * @param {number | string} fiscalYear - The fiscal year.
 * @returns {Promise<JobAssignedObjectCode[]>} - An array of object codes assigned to a given job.
 */
export async function getObjectCodesAssignedToJobByFiscalYear(mssqlConfig, jobId, fiscalYear) {
    const pool = await connect(mssqlConfig);
    const result = await pool
        .request()
        .input('jobId', jobId)
        .input('fiscalYear', fiscalYear)
        .query(`${jobAssignedSql} where j.Job_ID = @jobId and j.Year = @fiscalYear`);
    return result.recordset;
}
/**
 * Retrieves an object code associated with a given job and fiscal year.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} jobId - The job id.
 * @param {string} objectCode - The object code.
 * @param {number} fiscalYear - The fiscal year.
 * @returns {Promise<JobAssignedObjectCode>} - The object code, if available.
 */
export async function getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(mssqlConfig, jobId, objectCode, fiscalYear) {
    const pool = await connect(mssqlConfig);
    const result = await pool
        .request()
        .input('jobId', jobId)
        .input('objectCode', objectCode)
        .input('fiscalYear', fiscalYear)
        .query(`${jobAssignedSql} where o.CodeID = @objectCode
        and j.Job_ID = @jobId and j.Year = @fiscalYear`);
    if (result.recordset.length === 0) {
        return undefined;
    }
    return result.recordset[0];
}
