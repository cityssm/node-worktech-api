import type { mssql } from '@cityssm/mssql-multi-pool'

export async function lockTable(
  transaction: mssql.Transaction,
  tableName: string
): Promise<void> {
  await transaction
    .request()
    .query(`SELECT TOP 1 * FROM ${tableName} WITH (TABLOCKX)`)
}
