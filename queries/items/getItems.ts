import { connect } from '@cityssm/mssql-multi-pool'
import type { IResult, config as MSSQLConfig } from 'mssql'
import NodeCache from 'node-cache'

import { cacheTimeToLiveSeconds } from '../../apiConfig.js'

import type { ResourceItem } from './types.js'

const sql = `SELECT [ITMSysID] as itemSystemId,
  [Item_ID] as itemId,
  coalesce([DESC], '') as itemDescription,
  coalesce([ItemClass], '') as itemClass,
  coalesce([Type], '') as itemType,
  coalesce([Brand], '') as itemBrand,
  coalesce([Model], '') as itemModel,
  coalesce([Serial], '') as serialNumber,
  coalesce([Status], '') as itemStatus,
  coalesce([Location], '') as location,
  coalesce([Dept], '') as department,
  coalesce([Division], '') as division,
  coalesce([Company], '') as company,
  coalesce([FlType], '') as fuelType,
  coalesce([ExJob_ID], '') as expenseJobId,
  coalesce([ExActv_ID], '') as expenseActivityId,
  coalesce([ExObjCode], '') as expenseObjectCode,
  coalesce([RevJob_ID], '') as revenueJobId,
  coalesce([RevActv_ID], '') as revenueActivityId,
  coalesce([RevObjCode], '') as revenueObjectCode,
  [Stock] as stock,
  coalesce([Units], '') as unit,
  [UnitCost] as unitCost,
  [QtyHand] as quantityOnHand,
  coalesce([ExtItem_ID], '') as externalItemId,
  coalesce([Comments], '') as comments
  FROM [WMITM] WITH (NOLOCK)`

const cache = new NodeCache({
  stdTTL: cacheTimeToLiveSeconds
})

/**
 * Retrieves an item.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} itemId - The item id.
 * @returns {Promise<ResourceItem | undefined>} - The item, if available.
 */
export async function getItemByItemId(
  mssqlConfig: MSSQLConfig,
  itemId: string
): Promise<ResourceItem | undefined> {
  let item: ResourceItem | undefined = cache.get(itemId)

  if (item !== undefined) {
    return item
  }

  const pool = await connect(mssqlConfig)

  const itemResult: IResult<ResourceItem> = await pool
    .request()
    .input('itemId', itemId)
    .query(`${sql} where Item_ID = @itemId`)

  if (itemResult.recordset.length === 0) {
    return undefined
  }

  item = itemResult.recordset[0]

  cache.set(itemId, item)

  return item
}
