// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { connect } from '@cityssm/mssql-multi-pool';
import { dateToString, dateToTimeString } from '@cityssm/utils-datetime';
import { getItemByItemId } from '../items/getItems.js';
import { getLastSystemId, incrementLastSystemId } from '../systemId.js';
import { getWorkOrderByWorkOrderNumber } from './getWorkOrders.js';
/**
 * Adds a resource to a work order.
 * @param {MSSQLConfig} mssqlConfig - SQL Service configuration.
 * @param {AddWorkOrderResource} workOrderResource - The work order resource fields.
 * @returns {BigIntString} - The system id for the new resource record.
 */
export async function addWorkOrderResource(mssqlConfig, workOrderResource) {
    /*
     * Get Work Order Id
     */
    let serviceRequestSystemId = workOrderResource.serviceRequestSystemId;
    const workOrder = await getWorkOrderByWorkOrderNumber(mssqlConfig, workOrderResource.workOrderNumber);
    if (workOrder === undefined) {
        throw new Error(`Work Order not found: ${workOrderResource.workOrderNumber}`);
    }
    if (serviceRequestSystemId === undefined) {
        serviceRequestSystemId = workOrder.serviceRequestSystemId;
    }
    /*
     * Get Item Id
     */
    let itemSystemId = workOrderResource.itemSystemId;
    const item = await getItemByItemId(mssqlConfig, workOrderResource.itemId);
    if (item === undefined) {
        throw new Error(`Item not found: ${workOrderResource.itemId}`);
    }
    if (itemSystemId === undefined) {
        itemSystemId = item.itemSystemId;
    }
    /*
     * Calculate dates
     */
    const startDate = workOrderResource.startDateTime ?? new Date();
    const startDateTimeString = `${dateToString(startDate)} ${dateToTimeString(startDate)}`;
    const endDateTimeString = workOrderResource.endDateTime === undefined
        ? null
        : `${dateToString(workOrderResource.endDateTime)} ${dateToTimeString(workOrderResource.endDateTime)}`;
    /*
     * Calculate base amount
     */
    const quantity = workOrderResource.quantity ?? 0;
    const unitPrice = workOrderResource.unitPrice ?? item.unitCost;
    const baseAmount = workOrderResource.baseAmount ?? quantity * unitPrice;
    /*
     * Do the transaction
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const pool = await connect(mssqlConfig);
    const transaction = pool.transaction();
    try {
        await transaction.begin();
        const lastSystemId = await getLastSystemId(transaction);
        if (lastSystemId === undefined) {
            throw new Error('Last used system id is unavailable.');
        }
        const serviceRequestItemSystemId = (Number.parseInt(lastSystemId, 10) + 1).toString();
        await transaction
            .request()
            .input('serviceRequestItemSystemId', serviceRequestItemSystemId)
            .input('serviceRequestSystemId', serviceRequestSystemId)
            .input('startDateTime', startDateTimeString)
            .input('itemSystemId', itemSystemId)
            .input('itemId', workOrderResource.itemId)
            .input('quantity', quantity)
            .input('unitPrice', unitPrice)
            .input('baseAmount', baseAmount)
            .input('lockUnitPrice', workOrderResource.lockUnitPrice ?? 0)
            .input('lockMargin', workOrderResource.lockMargin ?? 0)
            .input('workOrderNumber', workOrderResource.workOrderNumber)
            .input('workDescription', workOrderResource.workDescription ?? item.itemDescription ?? '')
            .input('endDateTime', endDateTimeString)
            .input('step', workOrderResource.step ?? '').query(`INSERT INTO AMSRI (
        SRISYSID, SRQISYSID,
        PPSYSID, PROJ_ID, P_ID, PMD_TASK, WORKSOURCE,
        SCHEDDATETIME,
        ITMSYSID,
        ITEM_ID,
        QTY,
        UNITPRICE,
        AMT,
        LOCKEST, LOCMARGIN,
        WONOS,
        SYSID,
        WORKDESC,
        ENDDATETIME,
        STEP,
        ACTV_ID, RPTCODE, DONE,
        OVERHEAD_PER, OVERHEAD_AMT,
        TAXCODE, MOD_USER,
        WOPRIMARY,
        DIM1, DIM2, DIM3,
        TSISYSID,
        LOCKSCHEDDATE, KIT_ID, LOCKKIT,
        REASONFORCHANGE,
        EXTAX1, EXTAX2, EXPAYABLE,
        MULT, QTY2,
        ACTAMT,
        EXT_ID, ASSIGNTO,
        ACTQTY, PROCESSEDQTY,
        SRAISYSID, OBJCODE, LOCATION)
      VALUES (
        @serviceRequestItemSystemId,
        @serviceRequestSystemId,
        0, '', 0, '', '',
        @startDateTime,
        @itemSystemId,
        @itemId,
        @quantity,
        @unitPrice,
        @baseAmount,
        @lockUnitPrice, @lockMargin,
        @workOrderNumber,
        0,
        @workDescription,
        @endDateTime,
        @step,
        '', '', 0,
        0.00, 0.00,
        '', '',
        0,
        0.00, 0.00, 0.00,
        0,
        0, '', 0,
        '',
        0.00, 0.00, 0.00,
        0.00, 1.00,
        0.00,
        '', '',
        0.00, 0.00,
        0, '', '')`);
        await incrementLastSystemId(transaction);
        await transaction.commit();
        return serviceRequestItemSystemId;
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
}
