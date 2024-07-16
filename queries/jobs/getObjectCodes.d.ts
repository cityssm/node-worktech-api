import { type config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import type { JobAssignedObjectCode, ObjectCode } from './types.js';
/**
 * Retrieves an object code.
 * @param mssqlConfig - SQL Server configuration.
 * @param objectCode - The object code
 * @returns - The object code, if available.
 */
export declare function getObjectCodeByObjectCode(mssqlConfig: MSSQLConfig, objectCode: string): Promise<ObjectCode | undefined>;
/**
 * Retrieves a list of object codes associated with a given job and fiscal year.
 * @param mssqlConfig - SQL Server configuration.
 * @param jobId - The job id.
 * @param fiscalYear - The fiscal year.
 * @returns - An array of object codes assigned to a given job.
 */
export declare function getObjectCodesAssignedToJobByFiscalYear(mssqlConfig: MSSQLConfig, jobId: string, fiscalYear: number | string): Promise<JobAssignedObjectCode[]>;
/**
 * Retrieves an object code associated with a given job and fiscal year.
 * @param mssqlConfig - SQL Server configuration.
 * @param jobId - The job id.
 * @param objectCode - The object code.
 * @param fiscalYear - The fiscal year.
 * @returns - The object code, if available.
 */
export declare function getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(mssqlConfig: MSSQLConfig, jobId: string, objectCode: string, fiscalYear: number | string): Promise<JobAssignedObjectCode | undefined>;
