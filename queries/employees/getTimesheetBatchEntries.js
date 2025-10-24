import { connect } from '@cityssm/mssql-multi-pool';
export const getTimesheetBatchEntriesLimit = 2000;
/**
 * Retrieves timesheet batch entries based on provided filters.
 * @param mssqlConfig - SQL Server configuration.
 * @param filters - Entry filters.
 * @returns The matching timesheet batch entries.
 */
export async function getTimesheetBatchEntries(mssqlConfig, filters) {
    const pool = await connect(mssqlConfig);
    const request = pool.request();
    let sql = /* sql */ `
    SELECT TOP (${getTimesheetBatchEntriesLimit})
      [BatchSysID] as batchSystemId,
      [Batch_ID] as batchId,
      [SeqNo] as batchEntryNumber,

      [DateTime] as timesheetDate,
      format([DateTime], 'yyyy-MM-dd') as timesheetDateString,

      [Item_ID] as employeeNumber,
      rtrim([POS_ID]) as positionId,
      rtrim([EPCode]) as payCode,
      [TC_ID] as timeCode,

      [ExJob_ID] as jobId,
      [ExActv_ID] as activityId,
      [WONOS] as workOrderNumber,
      [ExObjCode] as objectCode,

      [Qty] as timesheetHours

    FROM [WMTSI] WITH (NOLOCK)

    where transType = 'Time Sheets'
      and type = 'Employee'
  `;
    if (filters.employeeNumber !== undefined) {
        sql += ' AND [Item_ID] = @employeeNumber';
    }
    if (filters.timesheetDate !== undefined) {
        sql += ' AND [DateTime] = @timesheetDate';
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
    sql += ' order by [BatchSysID] desc, [SeqNo]';
    const result = (await request
        .input('employeeNumber', filters.employeeNumber)
        .input('timesheetDate', filters.timesheetDate)
        .input('jobId', filters.jobId)
        .input('activityId', filters.activityId)
        .input('workOrderNumber', filters.workOrderNumber)
        .query(sql));
    return result.recordset;
}
