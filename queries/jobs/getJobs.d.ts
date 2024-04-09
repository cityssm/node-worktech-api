import { type config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import type { Job } from './types.js';
/**
 * Retrieves a job.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} jobId - The job id
 * @returns {Promise<Job | undefined>} - The job, if available.
 */
export declare function getJobByJobId(mssqlConfig: MSSQLConfig, jobId: string): Promise<Job | undefined>;
