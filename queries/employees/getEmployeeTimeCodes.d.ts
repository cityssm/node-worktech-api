import { type mssql } from '@cityssm/mssql-multi-pool';
import type { TimeCode } from './types.js';
/**
 * Retrieves time codes for a specific employee.
 * @param mssqlConfig - SQL Server configuration.
 * @param employeeNumber - The employee number.
 * @param timesheetMaxAgeDays - The maximum age of timesheets to consider.
 * @returns The time codes for the specified employee.
 */
export declare function getEmployeeTimeCodes(mssqlConfig: mssql.config, employeeNumber: string, timesheetMaxAgeDays: number): Promise<TimeCode[]>;
