import { connect, type mssqlTypes } from '@cityssm/mssql-multi-pool'

import type { BigIntString } from '../types.js'

/**
 * Deletes a resource on a work order.
 * @param mssqlConfig - SQL Service configuration.
 * @param serviceRequestItemSystemId - The work order resource id.
 * @returns - True when the delete is processed successfully.
 */
export async function deleteWorkOrderResource(
  mssqlConfig: mssqlTypes.config,
  serviceRequestItemSystemId: BigIntString
): Promise<boolean> {
  const pool = await connect(mssqlConfig)

  await pool
    .request()
    .input('serviceRequestItemSystemId', serviceRequestItemSystemId)
    .query(`delete from AMSRI
      where SRISysID = @serviceRequestItemSystemId`)

  return true
}
