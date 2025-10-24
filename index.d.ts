import type { mssql } from '@cityssm/mssql-multi-pool';
import type { DateString } from '@cityssm/utils-datetime';
import { type AccountNumberSource } from './helpers/getAccountNumber.js';
import { type GetTimesheetBatchEntriesFilters } from './queries/employees/getTimesheetBatchEntries.js';
import type { EmployeePayCode, TimeCode, TimesheetBatchEntry } from './queries/employees/types.js';
import { type AddEquipment } from './queries/equipment/addEquipment.js';
import type { EquipmentItem } from './queries/equipment/types.js';
import { type AddResourceItem } from './queries/items/addResourceItem.js';
import { type CreateStockTransactionBatch } from './queries/items/createStockTransactionBatch.js';
import type { ResourceItem } from './queries/items/types.js';
import type { Activity, Job, JobActivityObjectCode, JobAssignedObjectCode, ObjectCode } from './queries/jobs/types.js';
import type { BigIntString } from './queries/types.js';
import { type AddWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
import type { WorkOrder, WorkOrderResource } from './queries/workOrders/types.js';
import { type UpdateWorkOrderResource } from './queries/workOrders/updateWorkOrderResource.js';
/**
 * WorkTech API
 */
export declare class WorkTechAPI {
    #private;
    /**
     * @param mssqlConfig - SQL Server configuration.
     */
    constructor(mssqlConfig: mssql.config);
    /**
     * Retrieves a piece of equipment.
     * @param equipmentId - The equipment id.
     * @returns The equipment record, if available.
     */
    getEquipmentByEquipmentId(equipmentId: string): Promise<EquipmentItem | undefined>;
    /**
     * Creates a new equipment record.
     * @param equipment - The equipment to add.
     * @returns The system id for the new equipment record.
     */
    addEquipment(equipment: AddEquipment): Promise<BigIntString>;
    updateEquipmentFields(equipmentSystemId: BigIntString, fields: Partial<EquipmentItem>): Promise<boolean>;
    /**
     * Retrieves an item.
     * @param itemId - The item id.
     * @returns - The item, if available.
     */
    getItemByItemId(itemId: string): Promise<ResourceItem | undefined>;
    addResourceItem(resourceItem: AddResourceItem): Promise<BigIntString>;
    /**
     * Creates a new stock transaction batch.
     * @param batch - The batch details
     * @returns - The batch id.
     */
    createStockTransactionBatch(batch: CreateStockTransactionBatch): Promise<number>;
    /**
     * Retrieves a work order.
     * @param workOrderNumber - The work order number.
     * @returns - The work order, if available.
     */
    getWorkOrderByWorkOrderNumber(workOrderNumber: string): Promise<WorkOrder | undefined>;
    /**
     * Retrieves a list of work order resources.
     * @param workOrderNumber - The work order number.
     * @returns - An array of resources associated with a work order.
     */
    getWorkOrderResourcesByWorkOrderNumber(workOrderNumber: string): Promise<WorkOrderResource[]>;
    /**
     * Retrieves a list of work order resources.
     * @param startDateFrom - The minimum start date.
     * @param startDateTo - The maximum start date.
     * @returns - An array of resources between a given start time range.
     */
    getWorkOrderResourcesByStartDateTimeRange(startDateFrom: Date | string, startDateTo: Date | string): Promise<WorkOrderResource[]>;
    /**
     * Retrieves a list of work order resources.
     * @param startDateString - The start date.
     * @returns - An array of resources on a given start date.
     */
    getWorkOrderResourcesByStartDate(startDateString: DateString): Promise<WorkOrderResource[]>;
    /**
     * Adds a resource to a work order.
     * @param workOrderResource - The work order resource fields.
     * @returns - The system id for the new resource record.
     */
    addWorkOrderResource(workOrderResource: AddWorkOrderResource): Promise<BigIntString>;
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
    updateWorkOrderResource(workOrderResource: UpdateWorkOrderResource): Promise<boolean>;
    /**
     * Deletes a resource on a work order.
     * @param serviceRequestItemSystemId - The work order resource id.
     * @returns - True when the delete is processed successfully.
     */
    deleteWorkOrderResource(serviceRequestItemSystemId: BigIntString): Promise<boolean>;
    /**
     * Retrieves a job.
     * @param jobId - The job id
     * @returns - The job, if available.
     */
    getJobByJobId(jobId: string): Promise<Job | undefined>;
    /**
     * Retrieves an activity.
     * @param activityId - The activity id
     * @returns - The activity, if available.
     */
    getActivityByActivityId(activityId: string): Promise<Activity | undefined>;
    /**
     * Retrieves the activities associated with a given job and fiscal year.
     * @param jobId - The job id
     * @param fiscalYear - The fiscal year
     * @returns - An array of activities.
     */
    getActivitiesAssignedToJobByFiscalYear(jobId: string, fiscalYear: number | string): Promise<Activity[]>;
    /**
     * Retrieves an object code.
     * @param objectCode - The object code
     * @returns - The object code, if available.
     */
    getObjectCodeByObjectCode(objectCode: string): Promise<ObjectCode | undefined>;
    /**
     * Retrieves a list of object codes associated with a given job and fiscal year.
     * @param jobId - The job id.
     * @param fiscalYear - The fiscal year.
     * @returns - An array of object codes assigned to a given job.
     */
    getObjectCodesAssignedToJobByFiscalYear(jobId: string, fiscalYear: number | string): Promise<JobAssignedObjectCode[]>;
    /**
     * Retrieves an object code associated with a given job and fiscal year.
     * @param jobId - The job id.
     * @param objectCode - The object code.
     * @param fiscalYear - The fiscal year.
     * @returns - The object code, if available.
     */
    getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(jobId: string, objectCode: string, fiscalYear: number | string): Promise<JobAssignedObjectCode | undefined>;
    /**
     * Retrieves a job - activity - object code.
     * @param keys - The keys to search on.
     * @param keys.jobId - The job id.
     * @param keys.activityId - The activity id.
     * @param keys.objectCode - The object code.
     * @param keys.fiscalYear - The fiscal year.
     * @returns - The job - activity - object code combination if available.
     */
    getJobActivityObjectCodeByKeys(keys: {
        activityId: string;
        jobId: string;
        objectCode: string;
        fiscalYear: number | string;
    }): Promise<JobActivityObjectCode | undefined>;
    /**
     * Retrieves an account number for a given work order.
     * @param workOrderNumber - The work order number.
     * @param optionalObjectCode - An optional object code.
     * @returns - The account number and its source, if available.
     */
    getAccountNumberByWorkOrderNumberAndObjectCode(workOrderNumber: string, optionalObjectCode?: string): Promise<AccountNumberSource | undefined>;
    /**
     * Retrieves employee pay codes.
     * @param employeeNumber - The employee number.
     * @param effectiveDate - The effective date.
     * @returns The employee pay codes.
     */
    getEmployeePayCodes(employeeNumber: string, effectiveDate?: Date): Promise<EmployeePayCode[]>;
    /**
     * Retrieves available time codes.
     * @returns The available time codes.
     */
    getTimeCodes(): Promise<TimeCode[]>;
    getTimesheetBatchEntries(filters: GetTimesheetBatchEntriesFilters): Promise<TimesheetBatchEntry[]>;
}
export { getAccountNumberByWorkOrderNumberAndObjectCode } from './helpers/getAccountNumber.js';
export { getEmployeePayCodes } from './queries/employees/getEmployeePayCodes.js';
export { getTimeCodes } from './queries/employees/getTimeCodes.js';
export { type GetTimesheetBatchEntriesFilters, getTimesheetBatchEntries } from './queries/employees/getTimesheetBatchEntries.js';
export { addEquipment } from './queries/equipment/addEquipment.js';
export { getEquipmentByEquipmentId } from './queries/equipment/getEquipment.js';
export { type UpdateEquipmentFields, updateEquipmentFields } from './queries/equipment/updateEquipment.js';
export { type AddResourceItem, addResourceItem } from './queries/items/addResourceItem.js';
export { getItemByItemId } from './queries/items/getItems.js';
export { type CreateStockTransactionBatch, type CreateStockTransactionBatchEntry, createStockTransactionBatch } from './queries/items/createStockTransactionBatch.js';
export { getActivitiesAssignedToJobByFiscalYear, getActivityByActivityId } from './queries/jobs/getActivities.js';
export { getJobActivityObjectCodeByKeys } from './queries/jobs/getJobActivityObjectCodes.js';
export { getJobByJobId } from './queries/jobs/getJobs.js';
export { getObjectCodeAssignedToJobByObjectCodeAndFiscalYear, getObjectCodeByObjectCode, getObjectCodesAssignedToJobByFiscalYear } from './queries/jobs/getObjectCodes.js';
export { getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js';
export { addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
export { deleteWorkOrderResource } from './queries/workOrders/deleteWorkOrderResource.js';
export { getWorkOrderResourcesByStartDate, getWorkOrderResourcesByStartDateTimeRange, getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
export { updateWorkOrderResource } from './queries/workOrders/updateWorkOrderResource.js';
export type { EmployeePayCode, TimeCode, TimesheetBatchEntry } from './queries/employees/types.js';
export type { EquipmentItem } from './queries/equipment/types.js';
export type { ResourceItem } from './queries/items/types.js';
export type { Activity, Job, JobActivityObjectCode, ObjectCode } from './queries/jobs/types.js';
export type { WorkOrder, WorkOrderResource } from './queries/workOrders/types.js';
