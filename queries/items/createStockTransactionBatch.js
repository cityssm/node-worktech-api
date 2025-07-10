// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { connect } from '@cityssm/mssql-multi-pool';
import { dateToString } from '@cityssm/utils-datetime';
import Debug from 'debug';
import { DEBUG_NAMESPACE } from '../../debug.config.js';
import { lockTable } from '../../helpers/lockTable.js';
import { _getWorkOrderByWorkOrderNumber } from '../workOrders/getWorkOrders.js';
const debug = Debug(`${DEBUG_NAMESPACE}:createStockTransactionBatch`);
const batchDefaults = {
    batchType: 'Stock Transactions',
    userId: '@cityssm/worktech-api'
};
const batchEntryDefaults = {
    transactionType: 'Stock Usage'
};
/**
 * Creates a new stock transaction batch.
 * @param mssqlConfig - SQL Server configuration.
 * @param batch - The batch details
 * @returns - The batch id.
 */
export async function createStockTransactionBatch(mssqlConfig, batch) {
    const pool = await connect(mssqlConfig);
    const transaction = pool.transaction();
    try {
        await transaction.begin();
        debug('Locking tables for batch creation');
        await lockTable(transaction, 'WMBAC');
        await lockTable(transaction, 'WMTSI');
        /*
         * Create batch
         */
        const userId = batch.userId ?? batchDefaults.userId;
        const batchDate = batch.batchDate ?? dateToString(new Date());
        const batchDescription = (batch.batchDescription ?? `${batchDate} - ${batchDefaults.batchType}`).slice(0, 50);
        debug('Creating batch', batchDescription);
        const batchCreateResult = (await transaction
            .request()
            .input('Type', batchDefaults.batchType)
            .input('Desc', batchDescription)
            .input('UserID', userId)
            .input('Date', batchDate)
            .execute('WT_INSERT_WMBAC'));
        const batchId = batchCreateResult.returnValue;
        /*
         * Insert batch entries
         */
        const itemNumberToLocationCode = {};
        debug('Creating batch entries:', batch.entries.length);
        for (const entry of batch.entries) {
            let jobId = entry.jobId;
            let activityId = entry.activityId;
            let objectCode = entry.objectCode;
            if (jobId === undefined ||
                activityId === undefined ||
                objectCode === undefined) {
                const workOrder = await _getWorkOrderByWorkOrderNumber(transaction.request(), entry.workOrderNumber);
                if (workOrder !== undefined) {
                    jobId ??= workOrder.jobId ?? workOrder.itemId;
                    activityId ??= workOrder.activityId;
                    objectCode ??= workOrder.objectCode;
                }
            }
            let locationCode = entry.locationCode ?? itemNumberToLocationCode[entry.itemNumber];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (locationCode === undefined) {
                const locationCodeResult = (await transaction
                    .request()
                    .input('itemNumber', entry.itemNumber)
                    .query(`select top 1 LocationCode
            from WMILN WITH (NOLOCK)
            where Item_ID = @itemNumber
            order by DefaulLoc desc`));
                if (locationCodeResult.recordset.length > 0) {
                    locationCode = locationCodeResult.recordset[0].LocationCode;
                }
            }
            const entryDate = entry.entryDate ?? batchDate;
            await transaction
                .request()
                .input('BatchSysID', batchId)
                .input('Date', entryDate)
                .input('SItem_ID', entry.itemNumber)
                .input('ExJob_ID', jobId)
                .input('ExActv_ID', activityId)
                .input('WONOs', entry.workOrderNumber)
                .input('Accomp', null)
                .input('TC_ID', null)
                .input('Qty', entry.quantity)
                .input('Units', null)
                .input('POS_ID', null)
                .input('VehUsed', null)
                .input('VehUsedQty', null)
                .input('StockItem_ID', entry.itemNumber)
                .input('Stock', null)
                .input('TransType', batchEntryDefaults.transactionType)
                .input('UserName', userId)
                .input('LocationCode', locationCode)
                .execute('WT_INSERT_WMTSI');
        }
        debug('Committing transaction for batch creation');
        await transaction.commit();
        debug('Batch created successfully with ID:', batchId);
        return batchId;
    }
    catch (error) {
        debug('Rolling back transaction for batch creation due to error:', error);
        await transaction.rollback();
        throw error;
    }
}
