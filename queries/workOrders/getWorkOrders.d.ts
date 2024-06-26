import { type config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import type { WorkOrder } from './types.js';
/**
 * Retrieves a work order.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} workOrderNumber - The work order number.
 * @returns {Promise<WorkOrder | undefined>} - The work order, if available.
 */
export declare function getWorkOrderByWorkOrderNumber(mssqlConfig: MSSQLConfig, workOrderNumber: string): Promise<WorkOrder | undefined>;
