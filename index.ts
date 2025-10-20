import type { mssql } from '@cityssm/mssql-multi-pool'
import { minutesToMillis } from '@cityssm/to-millis'
import type { DateString } from '@cityssm/utils-datetime'

import {
  type AccountNumberSource,
  getAccountNumberByWorkOrderNumberAndObjectCode
} from './helpers/getAccountNumber.js'
import { getEmployeePayCodes } from './queries/employees/getEmployeePayCodes.js'
import { getTimeCodes } from './queries/employees/getTimeCodes.js'
import type { EmployeePayCode, TimeCode } from './queries/employees/types.js'
import {
  type AddEquipment,
  addEquipment
} from './queries/equipment/addEquipment.js'
import { getEquipmentByEquipmentId } from './queries/equipment/getEquipment.js'
import type { EquipmentItem } from './queries/equipment/types.js'
import { updateEquipmentFields } from './queries/equipment/updateEquipment.js'
import {
  type AddResourceItem,
  addResourceItem
} from './queries/items/addResourceItem.js'
import {
  type CreateStockTransactionBatch,
  createStockTransactionBatch
} from './queries/items/createStockTransactionBatch.js'
import { getItemByItemId } from './queries/items/getItems.js'
import type { ResourceItem } from './queries/items/types.js'
import {
  getActivitiesAssignedToJobByFiscalYear,
  getActivityByActivityId
} from './queries/jobs/getActivities.js'
import { getJobActivityObjectCodeByKeys } from './queries/jobs/getJobActivityObjectCodes.js'
import { getJobByJobId } from './queries/jobs/getJobs.js'
import {
  getObjectCodeAssignedToJobByObjectCodeAndFiscalYear,
  getObjectCodeByObjectCode,
  getObjectCodesAssignedToJobByFiscalYear
} from './queries/jobs/getObjectCodes.js'
import type {
  Activity,
  Job,
  JobActivityObjectCode,
  JobAssignedObjectCode,
  ObjectCode
} from './queries/jobs/types.js'
import type { BigIntString } from './queries/types.js'
import {
  type AddWorkOrderResource,
  addWorkOrderResource
} from './queries/workOrders/addWorkOrderResource.js'
import { deleteWorkOrderResource } from './queries/workOrders/deleteWorkOrderResource.js'
import {
  getWorkOrderResourcesByStartDate,
  getWorkOrderResourcesByStartDateTimeRange,
  getWorkOrderResourcesByWorkOrderNumber
} from './queries/workOrders/getWorkOrderResources.js'
import { getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js'
import type {
  WorkOrder,
  WorkOrderResource
} from './queries/workOrders/types.js'
import {
  type UpdateWorkOrderResource,
  updateWorkOrderResource
} from './queries/workOrders/updateWorkOrderResource.js'

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const timeoutMillis = minutesToMillis(5)

/**
 * WorkTech API
 */
export class WorkTechAPI {
  readonly #mssqlConfig: mssql.config

  /**
   * @param mssqlConfig - SQL Server configuration.
   */
  constructor(mssqlConfig: mssql.config) {
    this.#mssqlConfig = mssqlConfig

    this.#mssqlConfig.connectionTimeout = Math.max(
      this.#mssqlConfig.connectionTimeout ?? 0,
      timeoutMillis
    )

    this.#mssqlConfig.requestTimeout = Math.max(
      this.#mssqlConfig.requestTimeout ?? 0,
      timeoutMillis
    )
  }

  /**
   * Retrieves a piece of equipment.
   * @param equipmentId - The equipment id.
   * @returns The equipment record, if available.
   */
  async getEquipmentByEquipmentId(
    equipmentId: string
  ): Promise<EquipmentItem | undefined> {
    return await getEquipmentByEquipmentId(this.#mssqlConfig, equipmentId)
  }

  /**
   * Creates a new equipment record.
   * @param equipment - The equipment to add.
   * @returns The system id for the new equipment record.
   */
  async addEquipment(equipment: AddEquipment): Promise<BigIntString> {
    return await addEquipment(this.#mssqlConfig, equipment)
  }

  async updateEquipmentFields(
    equipmentSystemId: BigIntString,
    fields: Partial<EquipmentItem>
  ): Promise<boolean> {
    return await updateEquipmentFields(
      this.#mssqlConfig,
      equipmentSystemId,
      fields
    )
  }

  /**
   * Retrieves an item.
   * @param itemId - The item id.
   * @returns - The item, if available.
   */
  async getItemByItemId(itemId: string): Promise<ResourceItem | undefined> {
    return await getItemByItemId(this.#mssqlConfig, itemId)
  }

  async addResourceItem(resourceItem: AddResourceItem): Promise<BigIntString> {
    return await addResourceItem(this.#mssqlConfig, resourceItem)
  }

  /**
   * Creates a new stock transaction batch.
   * @param batch - The batch details
   * @returns - The batch id.
   */
  async createStockTransactionBatch(
    batch: CreateStockTransactionBatch
  ): Promise<number> {
    return await createStockTransactionBatch(this.#mssqlConfig, batch)
  }

  /**
   * Retrieves a work order.
   * @param workOrderNumber - The work order number.
   * @returns - The work order, if available.
   */
  async getWorkOrderByWorkOrderNumber(
    workOrderNumber: string
  ): Promise<WorkOrder | undefined> {
    return await getWorkOrderByWorkOrderNumber(
      this.#mssqlConfig,
      workOrderNumber
    )
  }

  /**
   * Retrieves a list of work order resources.
   * @param workOrderNumber - The work order number.
   * @returns - An array of resources associated with a work order.
   */
  async getWorkOrderResourcesByWorkOrderNumber(
    workOrderNumber: string
  ): Promise<WorkOrderResource[]> {
    return await getWorkOrderResourcesByWorkOrderNumber(
      this.#mssqlConfig,
      workOrderNumber
    )
  }

  /**
   * Retrieves a list of work order resources.
   * @param startDateFrom - The minimum start date.
   * @param startDateTo - The maximum start date.
   * @returns - An array of resources between a given start time range.
   */
  async getWorkOrderResourcesByStartDateTimeRange(
    startDateFrom: Date | string,
    startDateTo: Date | string
  ): Promise<WorkOrderResource[]> {
    return await getWorkOrderResourcesByStartDateTimeRange(
      this.#mssqlConfig,
      startDateFrom,
      startDateTo
    )
  }

  /**
   * Retrieves a list of work order resources.
   * @param startDateString - The start date.
   * @returns - An array of resources on a given start date.
   */
  async getWorkOrderResourcesByStartDate(
    startDateString: DateString
  ): Promise<WorkOrderResource[]> {
    return await getWorkOrderResourcesByStartDate(
      this.#mssqlConfig,
      startDateString
    )
  }

  /**
   * Adds a resource to a work order.
   * @param workOrderResource - The work order resource fields.
   * @returns - The system id for the new resource record.
   */
  async addWorkOrderResource(
    workOrderResource: AddWorkOrderResource
  ): Promise<BigIntString> {
    return await addWorkOrderResource(this.#mssqlConfig, workOrderResource)
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
  async updateWorkOrderResource(
    workOrderResource: UpdateWorkOrderResource
  ): Promise<boolean> {
    return await updateWorkOrderResource(this.#mssqlConfig, workOrderResource)
  }

  /**
   * Deletes a resource on a work order.
   * @param serviceRequestItemSystemId - The work order resource id.
   * @returns - True when the delete is processed successfully.
   */
  async deleteWorkOrderResource(
    serviceRequestItemSystemId: BigIntString
  ): Promise<boolean> {
    return await deleteWorkOrderResource(
      this.#mssqlConfig,
      serviceRequestItemSystemId
    )
  }

  /**
   * Retrieves a job.
   * @param jobId - The job id
   * @returns - The job, if available.
   */
  async getJobByJobId(jobId: string): Promise<Job | undefined> {
    return await getJobByJobId(this.#mssqlConfig, jobId)
  }

  /**
   * Retrieves an activity.
   * @param activityId - The activity id
   * @returns - The activity, if available.
   */
  async getActivityByActivityId(
    activityId: string
  ): Promise<Activity | undefined> {
    return await getActivityByActivityId(this.#mssqlConfig, activityId)
  }

  /**
   * Retrieves the activities associated with a given job and fiscal year.
   * @param jobId - The job id
   * @param fiscalYear - The fiscal year
   * @returns - An array of activities.
   */
  async getActivitiesAssignedToJobByFiscalYear(
    jobId: string,
    fiscalYear: number | string
  ): Promise<Activity[]> {
    return await getActivitiesAssignedToJobByFiscalYear(
      this.#mssqlConfig,
      jobId,
      fiscalYear
    )
  }

  /**
   * Retrieves an object code.
   * @param objectCode - The object code
   * @returns - The object code, if available.
   */
  async getObjectCodeByObjectCode(
    objectCode: string
  ): Promise<ObjectCode | undefined> {
    return await getObjectCodeByObjectCode(this.#mssqlConfig, objectCode)
  }

  /**
   * Retrieves a list of object codes associated with a given job and fiscal year.
   * @param jobId - The job id.
   * @param fiscalYear - The fiscal year.
   * @returns - An array of object codes assigned to a given job.
   */
  async getObjectCodesAssignedToJobByFiscalYear(
    jobId: string,
    fiscalYear: number | string
  ): Promise<JobAssignedObjectCode[]> {
    return await getObjectCodesAssignedToJobByFiscalYear(
      this.#mssqlConfig,
      jobId,
      fiscalYear
    )
  }

  /**
   * Retrieves an object code associated with a given job and fiscal year.
   * @param jobId - The job id.
   * @param objectCode - The object code.
   * @param fiscalYear - The fiscal year.
   * @returns - The object code, if available.
   */
  async getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(
    jobId: string,
    objectCode: string,
    fiscalYear: number | string
  ): Promise<JobAssignedObjectCode | undefined> {
    return await getObjectCodeAssignedToJobByObjectCodeAndFiscalYear(
      this.#mssqlConfig,
      jobId,
      objectCode,
      fiscalYear
    )
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
  async getJobActivityObjectCodeByKeys(keys: {
    jobId: string
    activityId: string
    objectCode: string
    fiscalYear: number | string
  }): Promise<JobActivityObjectCode | undefined> {
    return await getJobActivityObjectCodeByKeys(this.#mssqlConfig, keys)
  }

  /**
   * Retrieves an account number for a given work order.
   * @param workOrderNumber - The work order number.
   * @param optionalObjectCode - An optional object code.
   * @returns - The account number and its source, if available.
   */
  async getAccountNumberByWorkOrderNumberAndObjectCode(
    workOrderNumber: string,
    optionalObjectCode?: string
  ): Promise<AccountNumberSource | undefined> {
    return await getAccountNumberByWorkOrderNumberAndObjectCode(
      this.#mssqlConfig,
      workOrderNumber,
      optionalObjectCode
    )
  }

  /**
   * Retrieves employee pay codes.
   * @param employeeNumber - The employee number.
   * @param effectiveDate - The effective date.
   * @returns The employee pay codes.
   */
  async getEmployeePayCodes(
    employeeNumber: string,
    effectiveDate?: Date
  ): Promise<EmployeePayCode[]> {
    return await getEmployeePayCodes(
      this.#mssqlConfig,
      employeeNumber,
      effectiveDate
    )
  }

  /**
   * Retrieves available time codes.
   * @returns The available time codes.
   */
  async getTimeCodes(): Promise<TimeCode[]> {
    const timeCodes = await getTimeCodes(this.#mssqlConfig)

    return timeCodes
  }
}

export { getAccountNumberByWorkOrderNumberAndObjectCode } from './helpers/getAccountNumber.js'

export { getEmployeePayCodes } from './queries/employees/getEmployeePayCodes.js'
export { getTimeCodes } from './queries/employees/getTimeCodes.js'

export { addEquipment } from './queries/equipment/addEquipment.js'
export { getEquipmentByEquipmentId } from './queries/equipment/getEquipment.js'
export {
  type UpdateEquipmentFields,
  updateEquipmentFields
} from './queries/equipment/updateEquipment.js'

export {
  type AddResourceItem,
  addResourceItem
} from './queries/items/addResourceItem.js'
export { getItemByItemId } from './queries/items/getItems.js'

export {
  type CreateStockTransactionBatch,
  type CreateStockTransactionBatchEntry,
  createStockTransactionBatch
} from './queries/items/createStockTransactionBatch.js'

export {
  getActivitiesAssignedToJobByFiscalYear,
  getActivityByActivityId
} from './queries/jobs/getActivities.js'
export { getJobActivityObjectCodeByKeys } from './queries/jobs/getJobActivityObjectCodes.js'
export { getJobByJobId } from './queries/jobs/getJobs.js'
export {
  getObjectCodeAssignedToJobByObjectCodeAndFiscalYear,
  getObjectCodeByObjectCode,
  getObjectCodesAssignedToJobByFiscalYear
} from './queries/jobs/getObjectCodes.js'

export { getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js'

export { addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js'
export { deleteWorkOrderResource } from './queries/workOrders/deleteWorkOrderResource.js'
export {
  getWorkOrderResourcesByStartDate,
  getWorkOrderResourcesByStartDateTimeRange,
  getWorkOrderResourcesByWorkOrderNumber
} from './queries/workOrders/getWorkOrderResources.js'
export { updateWorkOrderResource } from './queries/workOrders/updateWorkOrderResource.js'

/*
 * Export Types
 */

export type { EmployeePayCode, TimeCode } from './queries/employees/types.js'
export type { EquipmentItem } from './queries/equipment/types.js'
export type { ResourceItem } from './queries/items/types.js'
export type {
  Activity,
  Job,
  JobActivityObjectCode,
  ObjectCode
} from './queries/jobs/types.js'
export type {
  WorkOrder,
  WorkOrderResource
} from './queries/workOrders/types.js'
