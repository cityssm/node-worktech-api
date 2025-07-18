import { NodeCache } from '@cacheable/node-cache'
import { type mssql, connect } from '@cityssm/mssql-multi-pool'

import { cacheTimeToLiveSeconds } from '../../apiConfig.js'

import type { EquipmentItem } from './types.js'

const sql = `SELECT [ITMSysID] as equipmentSystemId,
  [Item_ID] as equipmentId,
  coalesce([DESC], '') as equipmentDescription,
  coalesce([ItemClass], '') as equipmentClass,

  coalesce([Brand], '') as equipmentBrand,
  coalesce([Model], '') as equipmentModel,
  [Year] as equipmentModelYear,

  coalesce([Serial], '') as serialNumber,
  coalesce([Plate], '') as plate,

  coalesce([FlType], '') as fuelType,

  coalesce([Status], '') as equipmentStatus,
  coalesce([Comments], '') as comments,

  coalesce([Location], '') as location,
  coalesce([Dept], '') as departmentOwned,
  coalesce([Division], '') as departmentManaged,

  coalesce([ExJob_ID], '') as expenseJobId,
  coalesce([ExActv_ID], '') as expenseActivityId,
  coalesce([ExObjCode], '') as expenseObjectCode,
  coalesce([RevJob_ID], '') as revenueJobId,
  coalesce([RevActv_ID], '') as revenueActivityId,
  coalesce([RevObjCode], '') as revenueObjectCode,
  
  [Odom] as odometer,
  [Hours] as jobCostHours,
  [RunHrs] as hourMeter
  FROM [WMITM] WITH (NOLOCK)
  where [Type] in ('Equipment')`

const cache = new NodeCache<EquipmentItem>({
  stdTTL: cacheTimeToLiveSeconds
})

/**
 * Retrieves a piece of equipment.
 * @param mssqlConfig - SQL Server configuration.
 * @param equipmentId - The equipment id.
 * @returns - The equipment record, if available.
 */
export async function getEquipmentByEquipmentId(
  mssqlConfig: mssql.config,
  equipmentId: string
): Promise<EquipmentItem | undefined> {
  let equipment = cache.get(equipmentId)

  if (equipment !== undefined) {
    return equipment
  }

  const pool = await connect(mssqlConfig)

  const equipmentResult = (await pool
    .request()
    .input('equipmentId', equipmentId)
    .query(`${sql} and Item_ID = @equipmentId`)) as mssql.IResult<EquipmentItem>

  if (equipmentResult.recordset.length === 0) {
    return undefined
  }

  equipment = equipmentResult.recordset[0]

  cache.set(equipmentId, equipment)

  return equipment
}

/**
 * Clears the equipment cache.
 */
export function clearEquipmentCache(): void {
  cache.flushAll()
}
