import { type mssql } from '@cityssm/mssql-multi-pool';
import type { EmployeeItem } from './types.js';
export interface GetEmployeesFilters {
    employeeIsActive?: boolean;
    departments?: string[];
    notDepartments?: string[];
    employeeNumbers?: string[];
    notEmployeeNumbers?: string[];
    positionIds?: string[];
    notPositionIds?: string[];
}
/**
 * Retrieves employees.
 * @param mssqlConfig - SQL Server configuration
 * @param filters - Filters to apply to the employee query.
 * @returns The employees.
 */
export declare function getEmployees(mssqlConfig: mssql.config, filters?: GetEmployeesFilters): Promise<EmployeeItem[]>;
