import { _getItemByItemId } from './queries/items/getItems.js';
import { _addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
import { _getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
import { _getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js';
export class WorkTechAPI {
    #mssqlConfig;
    constructor(mssqlConfig) {
        this.#mssqlConfig = mssqlConfig;
    }
    async getItemByItemId(itemId) {
        return await _getItemByItemId(this.#mssqlConfig, itemId);
    }
    async getWorkOrderByWorkOrderNumber(workOrderNumber) {
        return await _getWorkOrderByWorkOrderNumber(this.#mssqlConfig, workOrderNumber);
    }
    async getWorkOrderResourcesByWorkOrderNumber(workOrderNumber) {
        return await _getWorkOrderResourcesByWorkOrderNumber(this.#mssqlConfig, workOrderNumber);
    }
    async addWorkOrderResource(workOrderResource) {
        return await _addWorkOrderResource(this.#mssqlConfig, workOrderResource);
    }
}
export { _getItemByItemId as getItemByItemId } from './queries/items/getItems.js';
export { _addWorkOrderResource as addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
export { _getWorkOrderByWorkOrderNumber as getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js';
export { _getWorkOrderResourcesByWorkOrderNumber as getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
