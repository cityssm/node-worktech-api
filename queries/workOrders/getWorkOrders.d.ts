import { type mssqlTypes } from '@cityssm/mssql-multi-pool';
import type { WorkOrder } from './types.js';
/**
 * Retrieves a work order.
 * @param mssqlConfig - SQL Server configuration.
 * @param workOrderNumber - The work order number.
 * @returns - The work order, if available.
 */
export declare function getWorkOrderByWorkOrderNumber(mssqlConfig: mssqlTypes.config, workOrderNumber: string): Promise<WorkOrder | undefined>;
