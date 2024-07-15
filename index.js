import { getAccountNumberByWorkOrderNumberAndObjectCode } from './helpers/getAccountNumber.js';
import { getItemByItemId } from './queries/items/getItems.js';
import { getActivitiesAssignedToJobByFiscalYear, getActivityByActivityId } from './queries/jobs/getActivities.js';
import { getJobActivityObjectCodeByKeys } from './queries/jobs/getJobActivityObjectCodes.js';
import { getJobByJobId } from './queries/jobs/getJobs.js';
import { getObjectCodeAssignedToJobByObjectCodeAndFiscalYear, getObjectCodeByObjectCode, getObjectCodesAssignedToJobByFiscalYear } from './queries/jobs/getObjectCodes.js';
import { addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
import { deleteWorkOrderResource } from './queries/workOrders/deleteWorkOrderResource.js';
import { getWorkOrderResourcesByStartDate, getWorkOrderResourcesByStartDateTimeRange, getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
import { getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js';
import { updateWorkOrderResource } from './queries/workOrders/updateWorkOrderResource.js';
/**
 * WorkTech API
 */
export class WorkTechAPI {
    #mssqlConfig;
    /**
     * @param mssqlConfig - SQL Server configuration.
     */
    constructor(mssqlConfig) {
        this.#mssqlConfig = mssqlConfig;
    }
    /**
     * Retrieves an item.
     * @param itemId - The item id.
     * @returns - The item, if available.
     */
    async getItemByItemId(itemId) {
        return await getItemByItemId(this.#mssqlConfig, itemId);
    }
    /**
     * Retrieves a work order.
     * @param workOrderNumber - The work order number.
     * @returns - The work order, if available.
     */
    async getWorkOrderByWorkOrderNumber(workOrderNumber) {
        return await getWorkOrderByWorkOrderNumber(this.#mssqlConfig, workOrderNumber);
    }
    /**
     * Retrieves a list of work order resources.
     * @param workOrderNumber - The work order number.
     * @returns - An array of resources associated with a work order.
     */
    async getWorkOrderResourcesByWorkOrderNumber(workOrderNumber) {
        return await getWorkOrderResourcesByWorkOrderNumber(this.#mssqlConfig, workOrderNumber);
    }
    /**
     * Retrieves a list of work order resources.
     * @param startDateFrom - The minimum start date.
     * @param startDateTo - The maximum start date.
     * @returns - An array of resources between a given start time range.
     */
    async getWorkOrderResourcesByStartDateTimeRange(startDateFrom, startDateTo) {
        return await getWorkOrderResourcesByStartDateTimeRange(this.#mssqlConfig, startDateFrom, startDateTo);
    }
    /**
     * Retrieves a list of work order resources.
     * @param startDateString - The start date.
     * @returns - An array of resources on a given start date.
     */
    async getWorkOrderResourcesByStartDate(startDateString) {
        return await getWorkOrderResourcesByStartDate(this.#mssqlConfig, startDateString);
    }
    /**
     * Adds a resource to a work order.
     * @param workOrderResource - The work order resource fields.
     * @returns - The system id for the new resource record.
     */
    async addWorkOrderResource(workOrderResource) {
        return await addWorkOrderResource(this.#mssqlConfig, workOrderResource);
    }
    /**
     * Updates a resource on a work order.
     * Note that only a subset of fields can be updated,
     * and each group must have all fields within it's grouping defined to be updated.
     * - workDescription
     * - serviceRequestSystemId, workOrderNumber
     * - startDateTime
     * - quantity, unitPrice, baseAmount
     * @param workOrderResource - The work order resource fields.
     * @returns - True when the update is processed successfully.
     */
    async updateWorkOrderResource(workOrderResource) {
        return await updateWorkOrderResource(this.#mssqlConfig, workOrderResource);
    }
    /**
     * Deletes a resource on a work order.
     * @param serviceRequestItemSystemId - The work order resource id.
     * @returns - True when the delete is processed successfully.
     */
    async deleteWorkOrderResource(serviceRequestItemSystemId) {
        return await deleteWorkOrderResource(this.#mssqlConfig, serviceRequestItemSystemId);
    }
    /**
     * Retrieves a job.
     * @param jobId - The job id
     * @returns - The job, if available.
     */
    async getJobByJobId(jobId) {
        return await getJobByJobId(this.#mssqlConfig, jobId);
    }
    /**
     * Retrieves an activity.
     * @param activityId - The activity id
     * @returns - The activity, if available.
     */
    async getActivityByActivityId(activityId) {
        return await getActivityByActivityId(this.#mssqlConfig, activityId);
    }
    /**
     * Retrieves the activities associated with a given job and fiscal year.
     * @param jobId - The job id
     * @param fiscalYear - The fiscal year
     * @returns - An array of activities.
     */
    async getActivitiesAssignedToJobByFiscalYear(jobId, fiscalYear) {
        return await getActivitiesAssignedToJobByFiscalYear(this.#mssqlConfig, jobId, fiscalYear);
    }
    /**
     * Retrieves an object code.
     * @param objectCode - The object code
     * @returns - The object code, if available.
     */
    async getObjectCodeByObjectCode(objectCode) {
        return await getObjectCodeByObjectCode(this.#mssqlConfig, objectCode);
    }
    /**
     * Retrieves a list of object codes associated with a given job and fiscal year.
     * @param jobId - The job id.
     * @param fiscalYear - The fiscal year.
     * @returns - An array of object codes assigned to a given job.
     */
    async getObjectCodesAssignedToJobByFiscalYear(jobId, fiscalYear) {
        return await getObjectCodesAssignedToJobByFiscalYear(this.#mssqlConfig, jobId, fiscalYear);
    }
    /**
     * Retrieves an object code associated with a given job and fiscal year.
     * @param jobId - The job id.
     * @param objectCode - The object code.
     * @param fiscalYear - The fiscal year.
     * @returns - The object code, if available.
     */
    async getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(jobId, objectCode, fiscalYear) {
        return await getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(this.#mssqlConfig, jobId, objectCode, fiscalYear);
    }
    /**
     * Retrieves a job - activity - object code.
     * @param keys - The keys to search on.
     * @param keys.jobId - The job id.
     * @param keys.activityId - The activity id.
     * @param keys.objectCode - The object code.
     * @param keys.fiscalYear - The fiscal year.
     * @returns - The job - activity - object code combination if available.
     */
    async getJobActivityObjectCodeByKeys(keys) {
        return await getJobActivityObjectCodeByKeys(this.#mssqlConfig, keys);
    }
    /**
     * Retrieves an account number for a given work order.
     * @param workOrderNumber - The work order number.
     * @param optionalObjectCode - An optional object code.
     * @returns - The account number and its source, if available.
     */
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
export { getWorkOrderResourcesByStartDate, getWorkOrderResourcesByStartDateTimeRange, getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
export { updateWorkOrderResource } from './queries/workOrders/updateWorkOrderResource.js';
export { deleteWorkOrderResource } from './queries/workOrders/deleteWorkOrderResource.js';
