import { type mssql } from '@cityssm/mssql-multi-pool';
import type { BigIntString } from '../types.js';
import type { WorkOrderResource } from './types.js';
export interface UpdateWorkOrderResource extends Partial<WorkOrderResource> {
    serviceRequestItemSystemId: BigIntString;
}
/**
 * Updates a resource on a work order.
 * Note that only a subset of fields can be updated,
 * and each group must have all fields within it's grouping defined to be updated.
 * - workDescription
 * - serviceRequestSystemId, workOrderNumber
 * - startDateTime
 * - endDateTime
 * - quantity, unitPrice, baseAmount
 * @param mssqlConfig - SQL Service configuration.
 * @param workOrderResource - The work order resource fields.
 * @returns - True when the update is processed successfully.
 */
export declare function updateWorkOrderResource(mssqlConfig: mssql.config, workOrderResource: UpdateWorkOrderResource): Promise<boolean>;
