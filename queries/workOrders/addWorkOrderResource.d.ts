import { type mssql } from '@cityssm/mssql-multi-pool';
import type { BigIntString } from '../types.js';
import type { WorkOrderResource } from './types.js';
export interface AddWorkOrderResource extends Partial<WorkOrderResource> {
    workOrderNumber: string;
    itemId: string;
}
/**
 * Adds a resource to a work order.
 * @param mssqlConfig - SQL Server configuration.
 * @param workOrderResource - The work order resource fields.
 * @returns - The system id for the new resource record.
 */
export declare function addWorkOrderResource(mssqlConfig: mssql.config, workOrderResource: AddWorkOrderResource): Promise<BigIntString>;
