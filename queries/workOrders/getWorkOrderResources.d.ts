import { type config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import { type DateString } from '@cityssm/utils-datetime';
import type { WorkOrderResource } from './types.js';
/**
 * Retrieves a list of work order resources.
 * @param mssqlConfig - SQL Server configuration.
 * @param workOrderNumber - The work order number.
 * @returns - An array of resources associated with a work order.
 */
export declare function getWorkOrderResourcesByWorkOrderNumber(mssqlConfig: MSSQLConfig, workOrderNumber: string): Promise<WorkOrderResource[]>;
/**
 * Retrieves a list of work order resources.
 * @param mssqlConfig - SQL Server configuration.
 * @param startDateTimeFrom - The minimum start date.
 * @param startDateTimeTo - The maximum start date.
 * @returns - An array of resources between a given start time range.
 */
export declare function getWorkOrderResourcesByStartDateTimeRange(mssqlConfig: MSSQLConfig, startDateTimeFrom: Date | string, startDateTimeTo: Date | string): Promise<WorkOrderResource[]>;
/**
 * Retrieves a list of work order resources.
 * @param mssqlConfig - SQL Server configuration.
 * @param startDateString - The start date.
 * @returns - An array of resources on a given start date.
 */
export declare function getWorkOrderResourcesByStartDate(mssqlConfig: MSSQLConfig, startDateString: DateString): Promise<WorkOrderResource[]>;
