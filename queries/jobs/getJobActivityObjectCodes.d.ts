import type { config as MSSQLConfig } from 'mssql';
import type { JobActivityObjectCode } from './types.js';
/**
 * Retrieves a job - activity - object code.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} jobId - The job id.
 * @param {string} activityId - The activity id.
 * @param {string} objectCode - The object code.
 * @param {number | string} fiscalYear - The fiscal year.
 * @returns {Promise<JobActivityObjectCode | undefined>} - The job - activity - object code combination if available.
 */
export declare function getJobActivityObjectCodeByKeys(mssqlConfig: MSSQLConfig, jobId: string, activityId: string, objectCode: string, fiscalYear: number | string): Promise<JobActivityObjectCode | undefined>;
