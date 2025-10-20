import { connect } from '@cityssm/mssql-multi-pool';
/**
 * Retrieves available time codes.
 * @param mssqlConfig - SQL Server configuration.
 * @returns The available time codes.
 */
export async function getTimeCodes(mssqlConfig) {
    const pool = await connect(mssqlConfig);
    const result = (await pool.request().query(/* sql */ `
      SELECT
        TC_ID as timeCode,
        DESCRIPTION as timeCodeDescription,
        EXTCODE as externalCode
      FROM WMTCD
      WHERE 
        Inactive = 0
        and AdminOnly = 0
      ORDER BY TC_ID`));
    return result.recordset;
}
