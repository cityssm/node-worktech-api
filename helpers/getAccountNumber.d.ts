import type { config as MSSQLConfig } from 'mssql';
export interface AccountNumberSource {
    accountNumber: string;
    accountNumberSource: 'assignedJobActivityObjectCode' | 'assignedJobObjectCode' | 'jobObjectCode';
}
export declare function getAccountNumberByWorkOrderNumberAndObjectCode(mssqlConfig: MSSQLConfig, workOrderNumber: string, optionalObjectCode?: string): Promise<AccountNumberSource | undefined>;
