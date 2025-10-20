import { type mssql } from '@cityssm/mssql-multi-pool';
import type { Activity } from './types.js';
/**
 * Retrieves an activity.
 * @param mssqlConfig - SQL Server configuration.
 * @param activityId - The activity id
 * @returns The activity, if available.
 */
export declare function getActivityByActivityId(mssqlConfig: mssql.config, activityId: string): Promise<Activity | undefined>;
/**
 * Retrieves the activity associated with a given job and fiscal year.
 * @param mssqlConfig - SQL Server configuration
 * @param jobId - The job id
 * @param activityId - The activity id.
 * @param fiscalYear - The fiscal year
 * @returns - An array of activities.
 */
export declare function getActivityAssignedToJobByActivityIdAndFiscalYear(mssqlConfig: mssql.config, jobId: string, activityId: string, fiscalYear: number | string): Promise<Activity | undefined>;
/**
 * Retrieves the activities associated with a given job and fiscal year.
 * @param mssqlConfig - SQL Server configuration
 * @param jobId - The job id
 * @param fiscalYear - The fiscal year
 * @returns - An array of activities.
 */
export declare function getActivitiesAssignedToJobByFiscalYear(mssqlConfig: mssql.config, jobId: string, fiscalYear: number | string): Promise<Activity[]>;
