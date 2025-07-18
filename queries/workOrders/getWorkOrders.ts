import { NodeCache } from '@cacheable/node-cache'
import { type mssql, connect } from '@cityssm/mssql-multi-pool'

import { cacheTimeToLiveSeconds } from '../../apiConfig.js'

import type { WorkOrder } from './types.js'

const sql = `SELECT [SRQISysID] as serviceRequestSystemId,
  [WONOs] as workOrderNumber,
  coalesce([Proj_ID], '') as project,

  [DateTime] as requestDateTime,
  [DueDate] as dueDateTime,
  [ScheduleDate] as scheduledDateTime,
  [DoneDateTime] as doneDateTime,
  [ClosedDateTime] as closedDateTime,
  
  coalesce([ReqBy], '') as requestedBy,
  coalesce([ReqPhone], '') as requestedByPhoneNumber,
  coalesce([Add1], '') as address1,

  [WOType] as workOrderType,
  coalesce([Series], '') as workOrderSeries,
  coalesce([SubType], '') as workOrderSubType,

  coalesce([Subject], '') as subject,
  coalesce([Details], '') as details,
  coalesce([Priority], '') as priority,

  coalesce([Item_ID], '') as itemId,
  coalesce([ExJob_ID], '') as jobId,
  coalesce([Actv_ID], '') as activityId,
  coalesce([ObjCode], '') as objectCode,

  coalesce([ServiceClass], '') as serviceClass,
  coalesce([ServiceType], '') as serviceType,
  coalesce([Year], '') as fiscalYear,

  coalesce([EvaluatedBy], '') as evaluatedBy,
  coalesce([AssignTo], '') as assignedTo,
  
  coalesce([Action], '') as action,
  coalesce([ResponseNotes], '') as responseNotes,

  coalesce([BillName], '') as billingName,

  coalesce([UserDef1], '') as userDefined1,
  coalesce([UserDef2], '') as userDefined2,
  coalesce([UserDef3], '') as userDefined3,
  coalesce([UserDef4], '') as userDefined4,
  coalesce([UserDef5], '') as userDefined5
  
  FROM [AMSRQI] WITH (NOLOCK)`

const cache = new NodeCache<WorkOrder>({
  stdTTL: cacheTimeToLiveSeconds
})

/**
 * Retrieves a work order.
 * @param mssqlConfig - SQL Server configuration.
 * @param workOrderNumber - The work order number.
 * @returns - The work order, if available.
 */
export async function getWorkOrderByWorkOrderNumber(
  mssqlConfig: mssql.config,
  workOrderNumber: string
): Promise<WorkOrder | undefined> {
  const pool = await connect(mssqlConfig)

  return await _getWorkOrderByWorkOrderNumber(pool.request(), workOrderNumber)
}

export async function _getWorkOrderByWorkOrderNumber(
  request: mssql.Request,
  workOrderNumber: string
): Promise<WorkOrder | undefined> {
  let workOrder = cache.get(workOrderNumber)

  if (workOrder !== undefined) {
    return workOrder
  }

  const workOrderResult = (await request
    .input('workOrderNumber', workOrderNumber)
    .query(`${sql} where WONOs = @workOrderNumber`)) as mssql.IResult<WorkOrder>

  if (workOrderResult.recordset.length === 0) {
    return undefined
  }

  workOrder = workOrderResult.recordset[0]

  cache.set(workOrderNumber, workOrder)

  return workOrder
}
