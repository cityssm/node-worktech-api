import NodeCache from '@cacheable/node-cache'
import { type mssql, connect } from '@cityssm/mssql-multi-pool'

import { cacheTimeToLiveSeconds } from '../../apiConfig.js'

import type { EmployeePayCode } from './types.js'

const cache = new NodeCache<EmployeePayCode[]>({
  stdTTL: cacheTimeToLiveSeconds
})

/**
 * Retrieves employee pay codes.
 * @param mssqlConfig - SQL Server configuration.
 * @param employeeNumber - The employee number.
 * @param effectiveDate - The effective date.
 * @returns The employee pay codes.
 */
export async function getEmployeePayCodes(
  mssqlConfig: mssql.config,
  employeeNumber: string,
  effectiveDate?: Date
): Promise<EmployeePayCode[]> {
  const cacheKey = `employeePayCodes-${employeeNumber}-${effectiveDate?.toISOString() ?? 'all'}`

  let employeePayCodes = cache.get(cacheKey)

  if (employeePayCodes !== undefined) {
    return employeePayCodes
  }

  const pool = await connect(mssqlConfig)

  let query = /* sql */ `
    SELECT
      Item_ID AS employeeNumber,
      rtrim(epc.EPCode) AS payCode,
      isnull(pc.level, epc.level) AS level,
      rtrim(epc.POS_ID) AS positionId,
      p.[Desc] AS position,
      isnull(pc.effectiveDateTime, epc.effectiveDate) AS effectiveDate,
      cast([Primary] AS BIT) AS isPrimary
    FROM
      WMEPCI epc
    WITH
      (NOLOCK)
      LEFT JOIN WMEPD pc
    WITH
      (NOLOCK) ON epc.EPCode = pc.EPCode
      AND (
        pc.EffectiveDateTime IS NULL
        OR pc.EffectiveDateTime >= epc.EffectiveDate
      )
      AND pc.NotUsedForOverride = 0
      LEFT JOIN WMPOD p
    WITH
      (NOLOCK) ON epc.POS_ID = p.POS_ID
      AND p.Status <> 1
      AND (
        p.EndDateTime IS NULL
        OR p.EndDateTime >= epc.EffectiveDate
      )
    WHERE
      epc.Item_ID = @employeeNumber
  `

  if (effectiveDate !== undefined) {
    query += ' AND epc.effectiveDate <= @effectiveDate'
  }

  query += ' ORDER BY isPrimary DESC, effectiveDate DESC'

  const result = (await pool
    .request()
    .input('employeeNumber', employeeNumber)
    .input('effectiveDate', effectiveDate)
    .query(query)) as mssql.IResult<EmployeePayCode>

  employeePayCodes = result.recordset

  cache.set(cacheKey, employeePayCodes)

  return employeePayCodes
}
