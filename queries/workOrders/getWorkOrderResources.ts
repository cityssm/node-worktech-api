import { connect } from '@cityssm/mssql-multi-pool'
import type { IResult, config as MSSQLConfig } from 'mssql'

import type { WorkOrderResource } from './types.js'

const sql = `SELECT [SRISysID] as serviceRequestItemSystemId, 
  [SRQISysID] as serviceRequestSystemId,
  [WONOS] as workOrderNumber,
  [SchedDateTime] as startDateTime,
  [ITMSysID] as itemSystemId,
  [Item_ID] as itemId,
  [Qty] as quantity,
  [UnitPrice] as unitPrice,
  [Amt] as baseAmount,
  [WorkDesc] as workDescription,
  [EndDateTime] as endDateTime,
  [Step] as step
  FROM [AMSRI]`

/**
 * Retrieves a list of work order resources.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} workOrderNumber - The work order number.
 * @returns {Promise<WorkOrderResource[]>} - An array of resources associated with a work order.
 */
export async function _getWorkOrderResourcesByWorkOrderNumber(
  mssqlConfig: MSSQLConfig,
  workOrderNumber: string
): Promise<WorkOrderResource[]> {
  const pool = await connect(mssqlConfig)

  const resourcesResult: IResult<WorkOrderResource> = await pool
    .request()
    .input('workOrderNumber', workOrderNumber)
    .query(`${sql} where WONOs = @workOrderNumber`)

  return resourcesResult.recordset
}
