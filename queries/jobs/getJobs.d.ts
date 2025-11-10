import { type mssql } from '@cityssm/mssql-multi-pool';
import type { Job } from './types.js';
/**
 * Retrieves a job.
 * @param mssqlConfig - SQL Server configuration.
 * @param jobId - The job id
 * @param bypassCache - Whether to bypass the cache
 * @returns - The job, if available.
 */
export declare function getJobByJobId(mssqlConfig: mssql.config, jobId: string, bypassCache?: boolean): Promise<Job | undefined>;
