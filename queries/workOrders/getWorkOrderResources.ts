import {
  type IResult,
  type config as MSSQLConfig,
  connect
} from '@cityssm/mssql-multi-pool'
import {
  type DateString,
  dateToString,
  dateToTimeString
} from '@cityssm/utils-datetime'

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
  [LockEst] as lockUnitPrice,
  [LocMargin] as lockMargin,
  [WorkDesc] as workDescription,
  [EndDateTime] as endDateTime,
  [Step] as step
  FROM [AMSRI] WITH (NOLOCK)`

/**
 * Retrieves a list of work order resources.
 * @param mssqlConfig - SQL Server configuration.
 * @param workOrderNumber - The work order number.
 * @returns - An array of resources associated with a work order.
 */
export async function getWorkOrderResourcesByWorkOrderNumber(
  mssqlConfig: MSSQLConfig,
  workOrderNumber: string
): Promise<WorkOrderResource[]> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const pool = await connect(mssqlConfig)

  const resourcesResult = (await pool
    .request()
    .input('workOrderNumber', workOrderNumber)
    .query(
      `${sql} where WONOs = @workOrderNumber`
    )) as IResult<WorkOrderResource>

  return resourcesResult.recordset
}

/**
 * Retrieves a list of work order resources.
 * @param mssqlConfig - SQL Server configuration.
 * @param startDateTimeFrom - The minimum start date.
 * @param startDateTimeTo - The maximum start date.
 * @returns - An array of resources between a given start time range.
 */
export async function getWorkOrderResourcesByStartDateTimeRange(
  mssqlConfig: MSSQLConfig,
  startDateTimeFrom: Date | string,
  startDateTimeTo: Date | string
): Promise<WorkOrderResource[]> {
  const startDateFromString =
    typeof startDateTimeFrom === 'string'
      ? startDateTimeFrom
      : `${dateToString(startDateTimeFrom)} ${dateToTimeString(
          startDateTimeFrom
        )}`

  const startDateToString =
    typeof startDateTimeTo === 'string'
      ? startDateTimeTo
      : `${dateToString(startDateTimeTo)} ${dateToTimeString(startDateTimeTo)}`

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const pool = await connect(mssqlConfig)

  const resourcesResult = (await pool
    .request()
    .input('startDateFrom', startDateFromString)
    .input('startDateTo', startDateToString)
    .query(
      `${sql} where SchedDateTime between @startDateFrom and @startDateTo`
    )) as IResult<WorkOrderResource>

  return resourcesResult.recordset
}

/**
 * Retrieves a list of work order resources.
 * @param mssqlConfig - SQL Server configuration.
 * @param startDateString - The start date.
 * @returns - An array of resources on a given start date.
 */
export async function getWorkOrderResourcesByStartDate(
  mssqlConfig: MSSQLConfig,
  startDateString: DateString
): Promise<WorkOrderResource[]> {
  return await getWorkOrderResourcesByStartDateTimeRange(
    mssqlConfig,
    startDateString,
    `${startDateString} 23:59:59`
  )
}
