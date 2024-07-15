import { type config as MSSQLConfig, connect } from '@cityssm/mssql-multi-pool'
import { dateToString, dateToTimeString } from '@cityssm/utils-datetime'

import type { BigIntString } from '../types.js'

import type { WorkOrderResource } from './types.js'

export interface UpdateWorkOrderResource extends Partial<WorkOrderResource> {
  serviceRequestItemSystemId: BigIntString
}

/**
 * Updates a resource on a work order.
 * Note that only a subset of fields can be updated,
 * and each group must have all fields within it's grouping defined to be updated.
 * - workDescription
 * - serviceRequestSystemId, workOrderNumber
 * - startDateTime
 * - quantity, unitPrice, baseAmount
 * @param mssqlConfig - SQL Service configuration.
 * @param workOrderResource - The work order resource fields.
 * @returns - True when the update is processed successfully.
 */
export async function updateWorkOrderResource(
  mssqlConfig: MSSQLConfig,
  workOrderResource: UpdateWorkOrderResource
): Promise<boolean> {
  /*
   * Do the transaction
   */

  const pool = await connect(mssqlConfig)

  const transaction = pool.transaction()

  try {
    await transaction.begin()

    let sql = `update AMSRI
      set SRISysID = @serviceRequestItemSystemId`

    let request = transaction
      .request()
      .input(
        'serviceRequestItemSystemId',
        workOrderResource.serviceRequestItemSystemId
      )

    /*
     * Update Work Description
     */

    if (workOrderResource.workDescription !== undefined) {
      request = request.input(
        'workDescription',
        workOrderResource.workDescription
      )

      sql += ', WORKDESC = @workDescription'
    }

    /*
     * Update Work Order Number
     */

    if (
      workOrderResource.serviceRequestSystemId !== undefined &&
      workOrderResource.workOrderNumber !== undefined
    ) {
      request = request
        .input(
          'serviceRequestSystemId',
          workOrderResource.serviceRequestSystemId
        )
        .input('workOrderNumber', workOrderResource.workOrderNumber)

      sql += `, SRQISYSID = @serviceRequestSystemId,
        WONOS = @workOrderNumber`
    }

    /*
     * Update Start Date/Time
     */

    if (workOrderResource.startDateTime !== undefined) {
      const startDateTimeString = `${dateToString(workOrderResource.startDateTime)} ${dateToTimeString(
        workOrderResource.startDateTime
      )}`

      request = request.input('startDateTime', startDateTimeString)

      sql += ', SCHEDDATETIME = @startDateTime'
    }

    /*
     * Update Quantity and Price
     */

    if (
      workOrderResource.quantity !== undefined &&
      workOrderResource.unitPrice !== undefined &&
      workOrderResource.baseAmount !== undefined
    ) {
      request = request
        .input('quantity', workOrderResource.quantity)
        .input('unitPrice', workOrderResource.unitPrice)
        .input('baseAmount', workOrderResource.baseAmount)

      sql += `, QTY = @quantity,
        UNITPRICE = @unitPrice,
        AMT = @baseAmount`
    }

    sql += ' where SRISysID = @serviceRequestItemSystemId'

    await request.query(sql)

    await transaction.commit()

    return true
  } catch (error) {
    await transaction.rollback()
    throw error as Error
  }
}
