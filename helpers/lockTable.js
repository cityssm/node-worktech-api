export async function lockTable(transaction, tableName) {
    await transaction
        .request()
        .query(`SELECT TOP 1 * FROM ${tableName} WITH (TABLOCKX)`);
}
