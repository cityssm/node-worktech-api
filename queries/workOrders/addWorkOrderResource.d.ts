import type { config as MSSQLConfig } from 'mssql';
import type { BigIntString } from '../types.js';
import type { WorkOrderResource } from './types.js';
export interface AddWorkOrderResource extends Partial<WorkOrderResource> {
    workOrderNumber: string;
    itemId: string;
}
/**
 * Adds a resource to a work order.
 * @param {MSSQLConfig} mssqlConfig - SQL Service configuration.
 * @param {AddWorkOrderResource} workOrderResource - The work order resource fields.
 * @returns {BigIntString} - The system id for the new resource record.
 */
export declare function _addWorkOrderResource(mssqlConfig: MSSQLConfig, workOrderResource: AddWorkOrderResource): Promise<BigIntString>;
