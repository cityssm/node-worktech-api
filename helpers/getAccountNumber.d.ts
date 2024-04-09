import type { config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
export interface AccountNumberSource {
    accountNumber: string;
    accountNumberSource: 'assignedJobActivityObjectCode' | 'assignedJobObjectCode' | 'jobObjectCode';
}
/**
 * Retrieves an account number for a given work order.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} workOrderNumber - The work order number.
 * @param {string} optionalObjectCode - An optional object code.
 * @returns {Promise<AccountNumberSource | undefined>} - The account number and its source, if available.
 */
export declare function getAccountNumberByWorkOrderNumberAndObjectCode(mssqlConfig: MSSQLConfig, workOrderNumber: string, optionalObjectCode?: string): Promise<AccountNumberSource | undefined>;
