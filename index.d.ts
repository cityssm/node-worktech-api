import type { config as MSSQLConfig } from 'mssql';
import type { ResourceItem } from './queries/items/types.js';
import type { BigIntString } from './queries/types.js';
import { type AddWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
import type { WorkOrder, WorkOrderResource } from './queries/workOrders/types.js';
export declare class WorkTechAPI {
    #private;
    constructor(mssqlConfig: MSSQLConfig);
    getItemByItemId(itemId: string): Promise<ResourceItem | undefined>;
    getWorkOrderByWorkOrderNumber(workOrderNumber: string): Promise<WorkOrder | undefined>;
    getWorkOrderResourcesByWorkOrderNumber(workOrderNumber: string): Promise<WorkOrderResource[]>;
    addWorkOrderResource(workOrderResource: AddWorkOrderResource): Promise<BigIntString>;
}
export { _getItemByItemId as getItemByItemId } from './queries/items/getItems.js';
export { _addWorkOrderResource as addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
export { _getWorkOrderByWorkOrderNumber as getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js';
export { _getWorkOrderResourcesByWorkOrderNumber as getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
