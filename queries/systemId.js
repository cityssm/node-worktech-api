// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const tableId = 'SRISYSID';
/**
 * Returns the last used system id.
 * @param transaction - An open database transaction.
 * @returns - The last used system id.
 */
export async function getLastSystemId(transaction) {
    const idResult = (await transaction
        .request()
        .input('tableId', tableId)
        .query('select Last_Id as systemId from AUTO_KEYS where Table_Id = @tableId'));
    if (idResult.recordset.length > 0) {
        return idResult.recordset[0].systemId;
    }
    return undefined;
}
/**
 * Increments the last used system id.
 * @param transaction - An open database transaction.
 */
export async function incrementLastSystemId(transaction) {
    await transaction
        .request()
        .input('tableId', tableId)
        .query('UPDATE AUTO_KEYS SET LAST_ID = LAST_ID + 1 WHERE TABLE_ID = @tableId');
}
