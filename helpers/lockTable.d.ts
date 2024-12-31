import type { mssql } from '@cityssm/mssql-multi-pool';
export declare function lockTable(transaction: mssql.Transaction, tableName: string): Promise<void>;
