import type { config as MSSQLConfig } from 'mssql'

import {
  type AccountNumberSource,
  getAccountNumberByWorkOrderNumberAndObjectCode
} from './helpers/getAccountNumber.js'
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
import { getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js'
import { getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js'
import type {
  WorkOrder,
  WorkOrderResource
} from './queries/workOrders/types.js'

export class WorkTechAPI {
  readonly #mssqlConfig: MSSQLConfig

  constructor(mssqlConfig: MSSQLConfig) {
    this.#mssqlConfig = mssqlConfig
  }

  async getItemByItemId(itemId: string): Promise<ResourceItem | undefined> {
    return await getItemByItemId(this.#mssqlConfig, itemId)
  }

  async getWorkOrderByWorkOrderNumber(
    workOrderNumber: string
  ): Promise<WorkOrder | undefined> {
    return await getWorkOrderByWorkOrderNumber(
      this.#mssqlConfig,
      workOrderNumber
    )
  }

  async getWorkOrderResourcesByWorkOrderNumber(
    workOrderNumber: string
  ): Promise<WorkOrderResource[]> {
    return await getWorkOrderResourcesByWorkOrderNumber(
      this.#mssqlConfig,
      workOrderNumber
    )
  }

  async addWorkOrderResource(
    workOrderResource: AddWorkOrderResource
  ): Promise<BigIntString> {
    return await addWorkOrderResource(this.#mssqlConfig, workOrderResource)
  }

  async getJobByJobId(jobId: string): Promise<Job | undefined> {
    return await getJobByJobId(this.#mssqlConfig, jobId)
  }

  async getActivityByActivityId(
    activityId: string
  ): Promise<Activity | undefined> {
    return await getActivityByActivityId(this.#mssqlConfig, activityId)
  }

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

  async getObjectCodeByObjectCode(
    objectCode: string
  ): Promise<ObjectCode | undefined> {
    return await getObjectCodeByObjectCode(this.#mssqlConfig, objectCode)
  }

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

  async getJobActivityObjectCodeByKeys(keys: {
    jobId: string
    activityId: string
    objectCode: string
    fiscalYear: number | string
  }): Promise<JobActivityObjectCode | undefined> {
    return await getJobActivityObjectCodeByKeys(this.#mssqlConfig, keys)
  }

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
}

export { getAccountNumberByWorkOrderNumberAndObjectCode } from './helpers/getAccountNumber.js'

export { getItemByItemId } from './queries/items/getItems.js'

export {
  getActivityByActivityId,
  getActivitiesAssignedToJobByFiscalYear
} from './queries/jobs/getActivities.js'
export { getJobByJobId } from './queries/jobs/getJobs.js'
export {
  getObjectCodeByObjectCode,
  getObjectCodesAssignedToJobByFiscalYear,
  getObjectCodeAssignedToJobByObjectCodeAndFiscalYear
} from './queries/jobs/getObjectCodes.js'
export { getJobActivityObjectCodeByKeys } from './queries/jobs/getJobActivityObjectCodes.js'

export { addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js'
export { getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js'
export { getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js'
