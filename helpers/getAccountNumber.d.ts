import type { config as MSSQLConfig } from 'mssql';
export interface AccountNumberSource {
    accountNumber: string;
    accountNumberSource: 'jobActivityObjectCode' | 'jobObjectCode';
}
export declare function getAccountNumberByWorkOrderNumberAndObjectCode(mssqlConfig: MSSQLConfig, workOrderNumber: string, optionalObjectCode?: string): Promise<AccountNumberSource | undefined>;
