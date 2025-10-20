import NodeCache from '@cacheable/node-cache';
import { connect } from '@cityssm/mssql-multi-pool';
import { cacheTimeToLiveSeconds } from '../../apiConfig.js';
const cache = new NodeCache({
    stdTTL: cacheTimeToLiveSeconds
});
/**
 * Retrieves employee pay codes.
 * @param mssqlConfig - SQL Server configuration.
 * @param employeeNumber - The employee number.
 * @param effectiveDate - The effective date.
 * @returns The employee pay codes.
 */
export async function getEmployeePayCodes(mssqlConfig, employeeNumber, effectiveDate) {
    const cacheKey = `employeePayCodes-${employeeNumber}-${effectiveDate?.toISOString() ?? 'all'}`;
    let employeePayCodes = cache.get(cacheKey);
    if (employeePayCodes !== undefined) {
        return employeePayCodes;
    }
    const pool = await connect(mssqlConfig);
    let query = /* sql */ `
    SELECT Item_ID as employeeNumber,
      rtrim(epc.EPCode) as payCode,
      isnull(pc.level, epc.level) as level,
      rtrim(epc.POS_ID) as positionId,
      p.[Desc] as position,
      isnull(pc.effectiveDateTime, epc.effectiveDate) as effectiveDate,
      cast ([Primary] as bit) as isPrimary
    FROM WMEPCI epc WITH (NOLOCK)
    left join WMEPD pc WITH (NOLOCK)
      on epc.EPCode = pc.EPCode
      and (pc.EffectiveDateTime is null or pc.EffectiveDateTime >= epc.EffectiveDate)
      and pc.NotUsedForOverride = 0
    left join WMPOD p WITH (NOLOCK)
      on epc.POS_ID = p.POS_ID
      and p.Status <> 1
      and (p.EndDateTime is null or p.EndDateTime >= epc.EffectiveDate)
    WHERE epc.Item_ID = @employeeNumber
  `;
    if (effectiveDate !== undefined) {
        query += ' AND epc.effectiveDate <= @effectiveDate';
    }
    query += ' ORDER BY isPrimary DESC, effectiveDate DESC';
    const result = (await pool
        .request()
        .input('employeeNumber', employeeNumber)
        .input('effectiveDate', effectiveDate)
        .query(query));
    employeePayCodes = result.recordset;
    cache.set(cacheKey, employeePayCodes);
    return employeePayCodes;
}
