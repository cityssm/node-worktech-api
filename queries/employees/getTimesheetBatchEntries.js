import NodeCache from '@cacheable/node-cache';
import { connect } from '@cityssm/mssql-multi-pool';
import { cacheTimeToLiveSeconds } from '../../apiConfig.js';
const cache = new NodeCache({
    stdTTL: cacheTimeToLiveSeconds
});
export const getTimesheetBatchEntriesLimit = 2000;
/**
 * Retrieves timesheet batch entries based on provided filters.
 * @param mssqlConfig - SQL Server configuration.
 * @param filters - Entry filters.
 * @param useCache - Whether to use caching (default: false).
 * @returns The matching timesheet batch entries.
 */
export async function getTimesheetBatchEntries(mssqlConfig, filters, useCache = false) {
    const cacheKey = JSON.stringify(filters);
    let timesheetBatchEntries = useCache ? cache.get(cacheKey) : undefined;
    if (timesheetBatchEntries !== undefined) {
        return timesheetBatchEntries;
    }
    const pool = await connect(mssqlConfig);
    const request = pool.request();
    let sql = /* sql */ `
    SELECT
      TOP (${getTimesheetBatchEntriesLimit}) [BatchSysID] AS batchSystemId,
      [Batch_ID] AS batchId,
      [SeqNo] AS batchEntryNumber,
      [DateTime] AS timesheetDate,
      format([DateTime], 'yyyy-MM-dd') AS timesheetDateString,
      [Item_ID] AS employeeNumber,
      rtrim([POS_ID]) AS positionId,
      rtrim([EPCode]) AS payCode,
      [TC_ID] AS timeCode,
      [ExJob_ID] AS jobId,
      [ExActv_ID] AS activityId,
      [WONOS] AS workOrderNumber,
      [ExObjCode] AS objectCode,
      [Qty] AS timesheetHours
    FROM
      [WMTSI]
    WITH
      (NOLOCK)
    WHERE
      transType = 'Time Sheets'
      AND
    TYPE = 'Employee'
  `;
    if (filters.employeeNumber !== undefined) {
        sql += ' AND [Item_ID] = @employeeNumber';
    }
    if (filters.timesheetDate !== undefined) {
        sql += ' AND [DateTime] = @timesheetDate';
    }
    if (filters.timesheetMaxAgeDays !== undefined) {
        sql +=
            ' AND [DateTime] >= DATEADD(day, -1 * @timesheetMaxAgeDays, CAST(GETDATE() AS date))';
    }
    if (filters.jobId !== undefined) {
        sql += ' AND [ExJob_ID] = @jobId';
    }
    if (filters.activityId !== undefined) {
        sql += ' AND [ExActv_ID] = @activityId';
    }
    if (filters.workOrderNumber !== undefined) {
        sql += ' AND [WONOS] = @workOrderNumber';
    }
    if (filters.timesheetHours !== undefined) {
        sql += ' AND [Qty] = @timesheetHours';
    }
    sql += ' order by [BatchSysID] desc, [SeqNo]';
    const result = (await request
        .input('employeeNumber', filters.employeeNumber)
        .input('timesheetDate', filters.timesheetDate)
        .input('timesheetMaxAgeDays', filters.timesheetMaxAgeDays)
        .input('jobId', filters.jobId)
        .input('activityId', filters.activityId)
        .input('workOrderNumber', filters.workOrderNumber)
        .input('timesheetHours', filters.timesheetHours)
        .query(sql));
    timesheetBatchEntries = result.recordset;
    if (useCache) {
        cache.set(cacheKey, timesheetBatchEntries);
    }
    return timesheetBatchEntries;
}
