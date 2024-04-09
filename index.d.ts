import type { config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import { type AccountNumberSource } from './helpers/getAccountNumber.js';
import type { ResourceItem } from './queries/items/types.js';
import type { Activity, Job, JobActivityObjectCode, JobAssignedObjectCode, ObjectCode } from './queries/jobs/types.js';
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
    getJobByJobId(jobId: string): Promise<Job | undefined>;
    getActivityByActivityId(activityId: string): Promise<Activity | undefined>;
    getActivitiesAssignedToJobByFiscalYear(jobId: string, fiscalYear: number | string): Promise<Activity[]>;
    getObjectCodeByObjectCode(objectCode: string): Promise<ObjectCode | undefined>;
    getObjectCodesAssignedToJobByFiscalYear(jobId: string, fiscalYear: number | string): Promise<JobAssignedObjectCode[]>;
    getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(jobId: string, objectCode: string, fiscalYear: number | string): Promise<JobAssignedObjectCode | undefined>;
    getJobActivityObjectCodeByKeys(keys: {
        jobId: string;
        activityId: string;
        objectCode: string;
        fiscalYear: number | string;
    }): Promise<JobActivityObjectCode | undefined>;
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
export { getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
