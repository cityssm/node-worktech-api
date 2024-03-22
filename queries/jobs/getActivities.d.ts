import type { config as MSSQLConfig } from 'mssql';
import type { Activity } from './types.js';
/**
 * Retrieves an activity.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} activityId - The activity id
 * @returns {Promise<Activity | undefined>} - The activity, if available.
 */
export declare function getActivityByActivityId(mssqlConfig: MSSQLConfig, activityId: string): Promise<Activity | undefined>;
/**
 * Retrieves the activity associated with a given job and fiscal year.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration
 * @param {string} jobId - The job id
 * @param {string} activityId - The activity id.
 * @param {number} fiscalYear - The fiscal year
 * @returns {Promise<Activity>} - An array of activities.
 */
export declare function getActivityAssignedToJobByActivityIdAndFiscalYear(mssqlConfig: MSSQLConfig, jobId: string, activityId: string, fiscalYear: number | string): Promise<Activity | undefined>;
/**
 * Retrieves the activities associated with a given job and fiscal year.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration
 * @param {string} jobId - The job id
 * @param {number | string} fiscalYear - The fiscal year
 * @returns {Promise<Activity[]>} - An array of activities.
 */
export declare function getActivitiesAssignedToJobByFiscalYear(mssqlConfig: MSSQLConfig, jobId: string, fiscalYear: number | string): Promise<Activity[]>;
