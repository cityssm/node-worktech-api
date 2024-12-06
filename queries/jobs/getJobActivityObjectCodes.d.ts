import { type mssql } from '@cityssm/mssql-multi-pool';
import type { JobActivityObjectCode } from './types.js';
/**
 * Retrieves a job - activity - object code.
 * @param mssqlConfig - SQL Server configuration.
 * @param keys - The keys to search on.
 * @param keys.jobId - The job id.
 * @param keys.activityId - The activity id.
 * @param keys.objectCode - The object code.
 * @param keys.fiscalYear - The fiscal year.
 * @returns - The job - activity - object code combination if available.
 */
export declare function getJobActivityObjectCodeByKeys(mssqlConfig: mssql.config, keys: {
    jobId: string;
    activityId: string;
    objectCode: string;
    fiscalYear: number | string;
}): Promise<JobActivityObjectCode | undefined>;
