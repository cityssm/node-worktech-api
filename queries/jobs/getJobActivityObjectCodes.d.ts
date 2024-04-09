import { type config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import type { JobActivityObjectCode } from './types.js';
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
export declare function getJobActivityObjectCodeByKeys(mssqlConfig: MSSQLConfig, keys: {
    jobId: string;
    activityId: string;
    objectCode: string;
    fiscalYear: number | string;
}): Promise<JobActivityObjectCode | undefined>;
