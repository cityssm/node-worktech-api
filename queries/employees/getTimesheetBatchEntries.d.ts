import { type mssql } from '@cityssm/mssql-multi-pool';
import type { DateString } from '@cityssm/utils-datetime';
import type { TimesheetBatchEntry } from './types.js';
export declare const getTimesheetBatchEntriesLimit = 2000;
export interface GetTimesheetBatchEntriesFilters {
    employeeNumber?: string;
    timesheetDate?: DateString;
    timesheetMaxAgeDays?: number;
    activityId?: string;
    jobId?: string;
    workOrderNumber?: string;
    timesheetHours?: number;
}
/**
 * Retrieves timesheet batch entries based on provided filters.
 * @param mssqlConfig - SQL Server configuration.
 * @param filters - Entry filters.
 * @returns The matching timesheet batch entries.
 */
export declare function getTimesheetBatchEntries(mssqlConfig: mssql.config, filters: GetTimesheetBatchEntriesFilters): Promise<TimesheetBatchEntry[]>;
