import { type config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import { type DateString } from '@cityssm/utils-datetime';
import type { WorkOrderResource } from './types.js';
/**
 * Retrieves a list of work order resources.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} workOrderNumber - The work order number.
 * @returns {Promise<WorkOrderResource[]>} - An array of resources associated with a work order.
 */
export declare function getWorkOrderResourcesByWorkOrderNumber(mssqlConfig: MSSQLConfig, workOrderNumber: string): Promise<WorkOrderResource[]>;
/**
 * Retrieves a list of work order resources.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {Date | string} startDateTimeFrom - The minimum start date.
 * @param {Date | string} startDateTimeTo - The maximum start date.
 * @returns {Promise<WorkOrderResource[]>} - An array of resources between a given start time range.
 */
export declare function getWorkOrderResourcesByStartDateTimeRange(mssqlConfig: MSSQLConfig, startDateTimeFrom: Date | string, startDateTimeTo: Date | string): Promise<WorkOrderResource[]>;
/**
 * Retrieves a list of work order resources.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {DateString} startDateString - The start date.
 * @returns {Promise<WorkOrderResource[]>} - An array of resources on a given start date.
 */
export declare function getWorkOrderResourcesByStartDate(mssqlConfig: MSSQLConfig, startDateString: DateString): Promise<WorkOrderResource[]>;
