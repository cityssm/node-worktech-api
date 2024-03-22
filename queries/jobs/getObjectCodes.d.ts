import type { config as MSSQLConfig } from 'mssql';
import type { JobAssignedObjectCode, ObjectCode } from './types.js';
/**
 * Retrieves an object code.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} objectCode - The object code
 * @returns {Promise<ObjectCode | undefined>} - The object code, if available.
 */
export declare function getObjectCodeByObjectCode(mssqlConfig: MSSQLConfig, objectCode: string): Promise<ObjectCode | undefined>;
/**
 * Retrieves a list of object codes associated with a given job and fiscal year.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} jobId - The job id.
 * @param {number | string} fiscalYear - The fiscal year.
 * @returns {Promise<JobAssignedObjectCode[]>} - An array of object codes assigned to a given job.
 */
export declare function getObjectCodesAssignedToJobByFiscalYear(mssqlConfig: MSSQLConfig, jobId: string, fiscalYear: number | string): Promise<JobAssignedObjectCode[]>;
/**
 * Retrieves an object code associated with a given job and fiscal year.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} jobId - The job id.
 * @param {string} objectCode - The object code.
 * @param {number} fiscalYear - The fiscal year.
 * @returns {Promise<JobAssignedObjectCode>} - The object code, if available.
 */
export declare function getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(mssqlConfig: MSSQLConfig, jobId: string, objectCode: string, fiscalYear: number | string): Promise<JobAssignedObjectCode | undefined>;
