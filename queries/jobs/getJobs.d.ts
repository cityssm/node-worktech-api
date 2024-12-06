import { type mssql } from '@cityssm/mssql-multi-pool';
import type { Job } from './types.js';
/**
 * Retrieves a job.
 * @param mssqlConfig - SQL Server configuration.
 * @param jobId - The job id
 * @returns - The job, if available.
 */
export declare function getJobByJobId(mssqlConfig: mssql.config, jobId: string): Promise<Job | undefined>;
