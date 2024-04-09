import { connect } from '@cityssm/mssql-multi-pool';
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
  FROM [AMSRI] WITH (NOLOCK)`;
/**
 * Retrieves a list of work order resources.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} workOrderNumber - The work order number.
 * @returns {Promise<WorkOrderResource[]>} - An array of resources associated with a work order.
 */
export async function getWorkOrderResourcesByWorkOrderNumber(mssqlConfig, workOrderNumber) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const pool = await connect(mssqlConfig);
    const resourcesResult = await pool
        .request()
        .input('workOrderNumber', workOrderNumber)
        .query(`${sql} where WONOs = @workOrderNumber`);
    return resourcesResult.recordset;
}
