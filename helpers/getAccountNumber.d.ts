import type { config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
export interface AccountNumberSource {
    accountNumber: string;
    accountNumberSource: // eslint-disable-next-line no-secrets/no-secrets
    'assignedJobActivityObjectCode' | 'assignedJobObjectCode' | 'jobObjectCode';
}
/**
 * Retrieves an account number for a given work order.
 * @param mssqlConfig - SQL Server configuration.
 * @param workOrderNumber - The work order number.
 * @param optionalObjectCode - An optional object code.
 * @returns - The account number and its source, if available.
 */
export declare function getAccountNumberByWorkOrderNumberAndObjectCode(mssqlConfig: MSSQLConfig, workOrderNumber: string, optionalObjectCode?: string): Promise<AccountNumberSource | undefined>;
