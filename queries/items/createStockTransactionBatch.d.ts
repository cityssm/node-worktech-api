import { type mssql } from '@cityssm/mssql-multi-pool';
import { type DateString } from '@cityssm/utils-datetime';
export interface CreateStockTransactionBatch {
    batchDescription?: string;
    batchDate?: DateString;
    userId?: string;
    entries: CreateStockTransactionBatchEntry[];
}
export interface CreateStockTransactionBatchEntry {
    entryDate?: DateString;
    workOrderNumber: string;
    jobId?: string;
    activityId?: string;
    objectCode?: string;
    itemNumber: string;
    locationCode?: string;
    quantity: number;
}
/**
 * Creates a new stock transaction batch.
 * @param mssqlConfig - SQL Server configuration.
 * @param batch - The batch details
 * @returns - The batch id.
 */
export declare function createStockTransactionBatch(mssqlConfig: mssql.config, batch: CreateStockTransactionBatch): Promise<number>;
