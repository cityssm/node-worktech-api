import { getAccountNumberByWorkOrderNumberAndObjectCode } from './helpers/getAccountNumber.js';
import { getItemByItemId } from './queries/items/getItems.js';
import { getActivitiesAssignedToJobByFiscalYear, getActivityByActivityId } from './queries/jobs/getActivities.js';
import { getJobActivityObjectCodeByKeys } from './queries/jobs/getJobActivityObjectCodes.js';
import { getJobByJobId } from './queries/jobs/getJobs.js';
import { getObjectCodeAssignedToJobByObjectCodeAndFiscalYear, getObjectCodeByObjectCode, getObjectCodesAssignedToJobByFiscalYear } from './queries/jobs/getObjectCodes.js';
import { addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
import { getWorkOrderResourcesByStartDate, getWorkOrderResourcesByStartDateTimeRange, getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
import { getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js';
/**
 * WorkTech API
 */
export class WorkTechAPI {
    #mssqlConfig;
    /**
     * @param {config} mssqlConfig - SQL Server configuration.
     */
    constructor(mssqlConfig) {
        this.#mssqlConfig = mssqlConfig;
    }
    /**
     * Retrieves an item.
     * @param {string} itemId - The item id.
     * @returns {Promise<ResourceItem | undefined>} - The item, if available.
     */
    async getItemByItemId(itemId) {
        return await getItemByItemId(this.#mssqlConfig, itemId);
    }
    /**
     * Retrieves a work order.
     * @param {string} workOrderNumber - The work order number.
     * @returns {Promise<WorkOrder | undefined>} - The work order, if available.
     */
    async getWorkOrderByWorkOrderNumber(workOrderNumber) {
        return await getWorkOrderByWorkOrderNumber(this.#mssqlConfig, workOrderNumber);
    }
    /**
     * Retrieves a list of work order resources.
     * @param {string} workOrderNumber - The work order number.
     * @returns {Promise<WorkOrderResource[]>} - An array of resources associated with a work order.
     */
    async getWorkOrderResourcesByWorkOrderNumber(workOrderNumber) {
        return await getWorkOrderResourcesByWorkOrderNumber(this.#mssqlConfig, workOrderNumber);
    }
    /**
     * Retrieves a list of work order resources.
     * @param {Date | string} startDateFrom - The minimum start date.
     * @param {Date | string} startDateTo - The maximum start date.
     * @returns {Promise<WorkOrderResource[]>} - An array of resources between a given start time range.
     */
    async getWorkOrderResourcesByStartDateTimeRange(startDateFrom, startDateTo) {
        return await getWorkOrderResourcesByStartDateTimeRange(this.#mssqlConfig, startDateFrom, startDateTo);
    }
    /**
     * Retrieves a list of work order resources.
     * @param {DateString} startDateString - The start date.
     * @returns {Promise<WorkOrderResource[]>} - An array of resources on a given start date.
     */
    async getWorkOrderResourcesByStartDate(startDateString) {
        return await getWorkOrderResourcesByStartDate(this.#mssqlConfig, startDateString);
    }
    /**
     * Adds a resource to a work order.
     * @param {AddWorkOrderResource} workOrderResource - The work order resource fields.
     * @returns {BigIntString} - The system id for the new resource record.
     */
    async addWorkOrderResource(workOrderResource) {
        return await addWorkOrderResource(this.#mssqlConfig, workOrderResource);
    }
    /**
     * Retrieves a job.
     * @param {string} jobId - The job id
     * @returns {Promise<Job | undefined>} - The job, if available.
     */
    async getJobByJobId(jobId) {
        return await getJobByJobId(this.#mssqlConfig, jobId);
    }
    /**
     * Retrieves an activity.
     * @param {string} activityId - The activity id
     * @returns {Promise<Activity | undefined>} - The activity, if available.
     */
    async getActivityByActivityId(activityId) {
        return await getActivityByActivityId(this.#mssqlConfig, activityId);
    }
    /**
     * Retrieves the activities associated with a given job and fiscal year.
     * @param {string} jobId - The job id
     * @param {number | string} fiscalYear - The fiscal year
     * @returns {Promise<Activity[]>} - An array of activities.
     */
    async getActivitiesAssignedToJobByFiscalYear(jobId, fiscalYear) {
        return await getActivitiesAssignedToJobByFiscalYear(this.#mssqlConfig, jobId, fiscalYear);
    }
    /**
     * Retrieves an object code.
     * @param {string} objectCode - The object code
     * @returns {Promise<ObjectCode | undefined>} - The object code, if available.
     */
    async getObjectCodeByObjectCode(objectCode) {
        return await getObjectCodeByObjectCode(this.#mssqlConfig, objectCode);
    }
    /**
     * Retrieves a list of object codes associated with a given job and fiscal year.
     * @param {string} jobId - The job id.
     * @param {number | string} fiscalYear - The fiscal year.
     * @returns {Promise<JobAssignedObjectCode[]>} - An array of object codes assigned to a given job.
     */
    async getObjectCodesAssignedToJobByFiscalYear(jobId, fiscalYear) {
        return await getObjectCodesAssignedToJobByFiscalYear(this.#mssqlConfig, jobId, fiscalYear);
    }
    /**
     * Retrieves an object code associated with a given job and fiscal year.
     * @param {string} jobId - The job id.
     * @param {string} objectCode - The object code.
     * @param {number} fiscalYear - The fiscal year.
     * @returns {Promise<JobAssignedObjectCode>} - The object code, if available.
     */
    async getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(jobId, objectCode, fiscalYear) {
        return await getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(this.#mssqlConfig, jobId, objectCode, fiscalYear);
    }
    /**
     * Retrieves a job - activity - object code.
     * @param {object} keys - The keys to search on.
     * @param {string} keys.jobId - The job id.
     * @param {string} keys.activityId - The activity id.
     * @param {string} keys.objectCode - The object code.
     * @param {string} keys.fiscalYear - The fiscal year.
     * @returns {Promise<JobActivityObjectCode | undefined>} - The job - activity - object code combination if available.
     */
    async getJobActivityObjectCodeByKeys(keys) {
        return await getJobActivityObjectCodeByKeys(this.#mssqlConfig, keys);
    }
    /**
     * Retrieves an account number for a given work order.
     * @param {string} workOrderNumber - The work order number.
     * @param {string} optionalObjectCode - An optional object code.
     * @returns {Promise<AccountNumberSource | undefined>} - The account number and its source, if available.
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
