import { getAccountNumberByWorkOrderNumberAndObjectCode } from './helpers/getAccountNumber.js';
import { getItemByItemId } from './queries/items/getItems.js';
import { getActivitiesAssignedToJobByFiscalYear, getActivityByActivityId } from './queries/jobs/getActivities.js';
import { getJobActivityObjectCodeByKeys } from './queries/jobs/getJobActivityObjectCodes.js';
import { getJobByJobId } from './queries/jobs/getJobs.js';
import { getObjectCodeAssignedToJobByObjectCodeAndFiscalYear, getObjectCodeByObjectCode, getObjectCodesAssignedToJobByFiscalYear } from './queries/jobs/getObjectCodes.js';
import { addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
import { getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
import { getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js';
export class WorkTechAPI {
    #mssqlConfig;
    constructor(mssqlConfig) {
        this.#mssqlConfig = mssqlConfig;
    }
    async getItemByItemId(itemId) {
        return await getItemByItemId(this.#mssqlConfig, itemId);
    }
    async getWorkOrderByWorkOrderNumber(workOrderNumber) {
        return await getWorkOrderByWorkOrderNumber(this.#mssqlConfig, workOrderNumber);
    }
    async getWorkOrderResourcesByWorkOrderNumber(workOrderNumber) {
        return await getWorkOrderResourcesByWorkOrderNumber(this.#mssqlConfig, workOrderNumber);
    }
    async addWorkOrderResource(workOrderResource) {
        return await addWorkOrderResource(this.#mssqlConfig, workOrderResource);
    }
    async getJobByJobId(jobId) {
        return await getJobByJobId(this.#mssqlConfig, jobId);
    }
    async getActivityByActivityId(activityId) {
        return await getActivityByActivityId(this.#mssqlConfig, activityId);
    }
    async getActivitiesAssignedToJobByFiscalYear(jobId, fiscalYear) {
        return await getActivitiesAssignedToJobByFiscalYear(this.#mssqlConfig, jobId, fiscalYear);
    }
    async getObjectCodeByObjectCode(objectCode) {
        return await getObjectCodeByObjectCode(this.#mssqlConfig, objectCode);
    }
    async getObjectCodesAssignedToJobByFiscalYear(jobId, fiscalYear) {
        return await getObjectCodesAssignedToJobByFiscalYear(this.#mssqlConfig, jobId, fiscalYear);
    }
    async getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(jobId, objectCode, fiscalYear) {
        return await getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(this.#mssqlConfig, jobId, objectCode, fiscalYear);
    }
    async getJobActivityObjectCodeByKeys(keys) {
        return await getJobActivityObjectCodeByKeys(this.#mssqlConfig, keys);
    }
    async getAccountNumberByWorkOrderNumberAndObjectCode(workOrderNumber, optionalObjectCode) {
        return await getAccountNumberByWorkOrderNumberAndObjectCode(this.#mssqlConfig, workOrderNumber, optionalObjectCode);
    }
}
export { getAccountNumberByWorkOrderNumberAndObjectCode } from './helpers/getAccountNumber.js';
export { getItemByItemId } from './queries/items/getItems.js';
export { getActivityByActivityId, getActivitiesAssignedToJobByFiscalYear } from './queries/jobs/getActivities.js';
export { getJobByJobId } from './queries/jobs/getJobs.js';
export { getObjectCodeByObjectCode, getObjectCodesAssignedToJobByFiscalYear, getObjectCodeAssignedToJobByObjectCodeAndFiscalYear } from './queries/jobs/getObjectCodes.js';
export { getJobActivityObjectCodeByKeys } from './queries/jobs/getJobActivityObjectCodes.js';
export { addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
export { getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js';
export { getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
