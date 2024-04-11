import type { config } from '@cityssm/mssql-multi-pool';
import { type DateString } from '@cityssm/utils-datetime';
import { type AccountNumberSource } from './helpers/getAccountNumber.js';
import type { ResourceItem } from './queries/items/types.js';
import type { Activity, Job, JobActivityObjectCode, JobAssignedObjectCode, ObjectCode } from './queries/jobs/types.js';
import type { BigIntString } from './queries/types.js';
import { type AddWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
import type { WorkOrder, WorkOrderResource } from './queries/workOrders/types.js';
/**
 * WorkTech API
 */
export declare class WorkTechAPI {
    #private;
    /**
     * @param {config} mssqlConfig - SQL Server configuration.
     */
    constructor(mssqlConfig: config);
    /**
     * Retrieves an item.
     * @param {string} itemId - The item id.
     * @returns {Promise<ResourceItem | undefined>} - The item, if available.
     */
    getItemByItemId(itemId: string): Promise<ResourceItem | undefined>;
    /**
     * Retrieves a work order.
     * @param {string} workOrderNumber - The work order number.
     * @returns {Promise<WorkOrder | undefined>} - The work order, if available.
     */
    getWorkOrderByWorkOrderNumber(workOrderNumber: string): Promise<WorkOrder | undefined>;
    /**
     * Retrieves a list of work order resources.
     * @param {string} workOrderNumber - The work order number.
     * @returns {Promise<WorkOrderResource[]>} - An array of resources associated with a work order.
     */
    getWorkOrderResourcesByWorkOrderNumber(workOrderNumber: string): Promise<WorkOrderResource[]>;
    /**
     * Retrieves a list of work order resources.
     * @param {Date | string} startDateFrom - The minimum start date.
     * @param {Date | string} startDateTo - The maximum start date.
     * @returns {Promise<WorkOrderResource[]>} - An array of resources between a given start time range.
     */
    getWorkOrderResourcesByStartDateTimeRange(startDateFrom: Date | string, startDateTo: Date | string): Promise<WorkOrderResource[]>;
    /**
     * Retrieves a list of work order resources.
     * @param {DateString} startDateString - The start date.
     * @returns {Promise<WorkOrderResource[]>} - An array of resources on a given start date.
     */
    getWorkOrderResourcesByStartDate(startDateString: DateString): Promise<WorkOrderResource[]>;
    /**
     * Adds a resource to a work order.
     * @param {AddWorkOrderResource} workOrderResource - The work order resource fields.
     * @returns {BigIntString} - The system id for the new resource record.
     */
    addWorkOrderResource(workOrderResource: AddWorkOrderResource): Promise<BigIntString>;
    /**
     * Retrieves a job.
     * @param {string} jobId - The job id
     * @returns {Promise<Job | undefined>} - The job, if available.
     */
    getJobByJobId(jobId: string): Promise<Job | undefined>;
    /**
     * Retrieves an activity.
     * @param {string} activityId - The activity id
     * @returns {Promise<Activity | undefined>} - The activity, if available.
     */
    getActivityByActivityId(activityId: string): Promise<Activity | undefined>;
    /**
     * Retrieves the activities associated with a given job and fiscal year.
     * @param {string} jobId - The job id
     * @param {number | string} fiscalYear - The fiscal year
     * @returns {Promise<Activity[]>} - An array of activities.
     */
    getActivitiesAssignedToJobByFiscalYear(jobId: string, fiscalYear: number | string): Promise<Activity[]>;
    /**
     * Retrieves an object code.
     * @param {string} objectCode - The object code
     * @returns {Promise<ObjectCode | undefined>} - The object code, if available.
     */
    getObjectCodeByObjectCode(objectCode: string): Promise<ObjectCode | undefined>;
    /**
     * Retrieves a list of object codes associated with a given job and fiscal year.
     * @param {string} jobId - The job id.
     * @param {number | string} fiscalYear - The fiscal year.
     * @returns {Promise<JobAssignedObjectCode[]>} - An array of object codes assigned to a given job.
     */
    getObjectCodesAssignedToJobByFiscalYear(jobId: string, fiscalYear: number | string): Promise<JobAssignedObjectCode[]>;
    /**
     * Retrieves an object code associated with a given job and fiscal year.
     * @param {string} jobId - The job id.
     * @param {string} objectCode - The object code.
     * @param {number} fiscalYear - The fiscal year.
     * @returns {Promise<JobAssignedObjectCode>} - The object code, if available.
     */
    getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(jobId: string, objectCode: string, fiscalYear: number | string): Promise<JobAssignedObjectCode | undefined>;
    /**
     * Retrieves a job - activity - object code.
     * @param {object} keys - The keys to search on.
     * @param {string} keys.jobId - The job id.
     * @param {string} keys.activityId - The activity id.
     * @param {string} keys.objectCode - The object code.
     * @param {string} keys.fiscalYear - The fiscal year.
     * @returns {Promise<JobActivityObjectCode | undefined>} - The job - activity - object code combination if available.
     */
    getJobActivityObjectCodeByKeys(keys: {
        jobId: string;
        activityId: string;
        objectCode: string;
        fiscalYear: number | string;
    }): Promise<JobActivityObjectCode | undefined>;
    /**
     * Retrieves an account number for a given work order.
     * @param {string} workOrderNumber - The work order number.
     * @param {string} optionalObjectCode - An optional object code.
     * @returns {Promise<AccountNumberSource | undefined>} - The account number and its source, if available.
     */
    getAccountNumberByWorkOrderNumberAndObjectCode(workOrderNumber: string, optionalObjectCode?: string): Promise<AccountNumberSource | undefined>;
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
