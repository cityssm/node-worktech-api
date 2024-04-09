import { type config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import type { WorkOrderResource } from './types.js';
/**
 * Retrieves a list of work order resources.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} workOrderNumber - The work order number.
 * @returns {Promise<WorkOrderResource[]>} - An array of resources associated with a work order.
 */
export declare function getWorkOrderResourcesByWorkOrderNumber(mssqlConfig: MSSQLConfig, workOrderNumber: string): Promise<WorkOrderResource[]>;
