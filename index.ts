import type { config as MSSQLConfig } from 'mssql'

import { _getItemByItemId } from './queries/items/getItems.js'
import type { ResourceItem } from './queries/items/types.js'
import type { BigIntString } from './queries/types.js'
import {
  type AddWorkOrderResource,
  _addWorkOrderResource
} from './queries/workOrders/addWorkOrderResource.js'
import { _getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js'
import { _getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js'
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
    return await _getItemByItemId(this.#mssqlConfig, itemId)
  }

  async getWorkOrderByWorkOrderNumber(
    workOrderNumber: string
  ): Promise<WorkOrder | undefined> {
    return await _getWorkOrderByWorkOrderNumber(
      this.#mssqlConfig,
      workOrderNumber
    )
  }

  async getWorkOrderResourcesByWorkOrderNumber(
    workOrderNumber: string
  ): Promise<WorkOrderResource[]> {
    return await _getWorkOrderResourcesByWorkOrderNumber(
      this.#mssqlConfig,
      workOrderNumber
    )
  }

  async addWorkOrderResource(
    workOrderResource: AddWorkOrderResource
  ): Promise<BigIntString> {
    return await _addWorkOrderResource(this.#mssqlConfig, workOrderResource)
  }
}

export { _getItemByItemId as getItemByItemId } from './queries/items/getItems.js'
export { _addWorkOrderResource as addWorkOrderResource } from './queries/workOrders/addWorkOrderResource.js'
export { _getWorkOrderByWorkOrderNumber as getWorkOrderByWorkOrderNumber } from './queries/workOrders/getWorkOrders.js'
export { _getWorkOrderResourcesByWorkOrderNumber as getWorkOrderResourcesByWorkOrderNumber } from './queries/workOrders/getWorkOrderResources.js'
