import { type mssql } from '@cityssm/mssql-multi-pool';
import type { EmployeePayCode } from './types.js';
/**
 * Retrieves employee pay codes.
 * @param mssqlConfig - SQL Server configuration.
 * @param employeeNumber - The employee number.
 * @param effectiveDate - The effective date.
 * @returns The employee pay codes.
 */
export declare function getEmployeePayCodes(mssqlConfig: mssql.config, employeeNumber: string, effectiveDate?: Date): Promise<EmployeePayCode[]>;
