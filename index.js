import { minutesToMillis } from '@cityssm/to-millis';
import { getAccountNumberByWorkOrderNumberAndObjectCode } from './helpers/getAccountNumber.js';
import { getEmployeePayCodes } from './queries/employees/getEmployeePayCodes.js';
import { getEmployees } from './queries/employees/getEmployees.js';
import { getEmployeeTimeCodes } from './queries/employees/getEmployeeTimeCodes.js';
import { getTimeCodes } from './queries/employees/getTimeCodes.js';
import { getTimesheetBatchEntries } from './queries/employees/getTimesheetBatchEntries.js';
import { addEquipment } from './queries/equipment/addEquipment.js';
import { getEquipment } from './queries/equipment/getEquipment.js';
import { getEquipmentByEquipmentId } from './queries/equipment/getEquipmentByEquipmentId.js';
import { updateEquipmentFields } from './queries/equipment/updateEquipment.js';
import { addResourceItem } from './queries/items/addResourceItem.js';
import { createStockTransactionBatch } from './queries/items/createStockTransactionBatch.js';
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
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const timeoutMillis = minutesToMillis(5);
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
        this.#mssqlConfig.options ??= {};
        this.#mssqlConfig.options.connectTimeout = Math.max(this.#mssqlConfig.options.connectTimeout ?? 0, timeoutMillis);
        this.#mssqlConfig.options.requestTimeout = Math.max(this.#mssqlConfig.options.requestTimeout ?? 0, timeoutMillis);
    }
    /**
     * Creates a new equipment record.
     * @param equipment - The equipment to add.
     * @returns The system id for the new equipment record.
     */
    async addEquipment(equipment) {
        return await addEquipment(this.#mssqlConfig, equipment);
    }
    async addResourceItem(resourceItem) {
        return await addResourceItem(this.#mssqlConfig, resourceItem);
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
     * Creates a new stock transaction batch.
     * @param batch - The batch details
     * @returns - The batch id.
     */
    async createStockTransactionBatch(batch) {
        return await createStockTransactionBatch(this.#mssqlConfig, batch);
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
     * Retrieves an account number for a given work order.
     * @param workOrderNumber - The work order number.
     * @param optionalObjectCode - An optional object code.
     * @returns - The account number and its source, if available.
     */
    async getAccountNumberByWorkOrderNumberAndObjectCode(workOrderNumber, optionalObjectCode) {
        return await getAccountNumberByWorkOrderNumberAndObjectCode(this.#mssqlConfig, workOrderNumber, optionalObjectCode);
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
     * Retrieves an activity.
     * @param activityId - The activity id
     * @returns - The activity, if available.
     */
    async getActivityByActivityId(activityId) {
        return await getActivityByActivityId(this.#mssqlConfig, activityId);
    }
    /**
     * Retrieves an employee.
     * @param employeeNumber - The employee number
     * @returns The employee, if available.
     */
    async getEmployeeByEmployeeNumber(employeeNumber) {
        const employees = await getEmployees(this.#mssqlConfig, {
            employeeNumbers: [employeeNumber]
        });
        if (employees.length === 0) {
            return undefined;
        }
        return employees[0];
    }
    /**
     * Retrieves employee pay codes.
     * @param employeeNumber - The employee number.
     * @param effectiveDate - The effective date.
     * @returns The employee pay codes.
     */
    async getEmployeePayCodes(employeeNumber, effectiveDate) {
        return await getEmployeePayCodes(this.#mssqlConfig, employeeNumber, effectiveDate);
    }
    /**
     * Retrieves employees.
     * @param employeeFilters - The employee filters.
     * @returns The employees.
     */
    async getEmployees(employeeFilters) {
        return await getEmployees(this.#mssqlConfig, employeeFilters);
    }
    /**
     * Retrieves time codes for a specific employee.
     * @param employeeNumber - The employee number.
     * @param timesheetMaxAgeDays - The maximum timesheet age.
     * @returns The time codes for the specified employee.
     */
    async getEmployeeTimeCodes(employeeNumber, timesheetMaxAgeDays) {
        const timeCodes = await getEmployeeTimeCodes(this.#mssqlConfig, employeeNumber, timesheetMaxAgeDays);
        return timeCodes;
    }
    /**
     * Retrieves equipment based on filters.
     * @param filters - The equipment filters.
     * @returns The equipment list.
     */
    async getEquipment(filters) {
        return await getEquipment(this.#mssqlConfig, filters);
    }
    /**
     * Retrieves a piece of equipment.
     * @param equipmentId - The equipment id.
     * @returns The equipment record, if available.
     */
    async getEquipmentByEquipmentId(equipmentId) {
        return await getEquipmentByEquipmentId(this.#mssqlConfig, equipmentId);
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
     * Retrieves a job.
     * @param jobId - The job id
     * @returns - The job, if available.
     */
    async getJobByJobId(jobId) {
        return await getJobByJobId(this.#mssqlConfig, jobId);
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
     * Retrieves available time codes.
     * @returns The available time codes.
     */
    async getTimeCodes() {
        const timeCodes = await getTimeCodes(this.#mssqlConfig);
        return timeCodes;
    }
    async getTimesheetBatchEntries(filters, useCache) {
        return await getTimesheetBatchEntries(this.#mssqlConfig, filters, useCache);
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
     * @param startDateString - The start date.
     * @returns - An array of resources on a given start date.
     */
    async getWorkOrderResourcesByStartDate(startDateString) {
        return await getWorkOrderResourcesByStartDate(this.#mssqlConfig, startDateString);
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
     * @param workOrderNumber - The work order number.
     * @returns - An array of resources associated with a work order.
     */
    async getWorkOrderResourcesByWorkOrderNumber(workOrderNumber) {
        return await getWorkOrderResourcesByWorkOrderNumber(this.#mssqlConfig, workOrderNumber);
    }
    async updateEquipmentFields(equipmentSystemId, fields) {
        return await updateEquipmentFields(this.#mssqlConfig, equipmentSystemId, fields);
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
}
export { getAccountNumberByWorkOrderNumberAndObjectCode } from './helpers/getAccountNumber.js';
export { getEmployeePayCodes } from './queries/employees/getEmployeePayCodes.js';
export { getEmployees } from './queries/employees/getEmployees.js';
export { getEmployeeTimeCodes } from './queries/employees/getEmployeeTimeCodes.js';
export { getTimeCodes } from './queries/employees/getTimeCodes.js';
export { getTimesheetBatchEntries } from './queries/employees/getTimesheetBatchEntries.js';
export { addEquipment } from './queries/equipment/addEquipment.js';
export { getEquipment } from './queries/equipment/getEquipment.js';
export { getEquipmentByEquipmentId } from './queries/equipment/getEquipmentByEquipmentId.js';
export { updateEquipmentFields } from './queries/equipment/updateEquipment.js';
export { addResourceItem } from './queries/items/addResourceItem.js';
export { createStockTransactionBatch } from './queries/items/createStockTransactionBatch.js';
export { getItemByItemId } from './queries/items/getItems.js';
export { getActivitiesAssignedToJobByFiscalYear, getActivityByActivityId } from './queries/jobs/getActivities.js';
export { getJobActivityObjectCodeByKeys } from './queries/jobs/getJobActivityObjectCodes.js';
export { getJobByJobId } from './queries/jobs/getJobs.js';
export { getObjectCodeAssignedToJobByObjectCodeAndFiscalYear, getObjectCodeByObjectCode, getObjectCodesAssignedToJobByFiscalYear } from './queries/jobs/getObjectCodes.js';
export { addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js';
/*
 * Export Types
 */
export { deleteWorkOrderResource } from './queries/workOrders/deleteWorkOrderResource.js';
export { getWorkOrderResourcesByStartDate, getWorkOrderResourcesByStartDateTimeRange, getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js';
export { getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js';
export { updateWorkOrderResource } from './queries/workOrders/updateWorkOrderResource.js';
