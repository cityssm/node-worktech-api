import type { Transaction } from '@cityssm/mssql-multi-pool';
/**
 * Returns the last used system id.
 * @param {Transaction} transaction - An open database transaction.
 * @returns {string | undefined} - The last used system id.
 */
export declare function getLastSystemId(transaction: Transaction): Promise<`${number}` | undefined>;
/**
 * Increments the last used system id.
 * @param {Transaction} transaction - An open database transaction.
 */
export declare function incrementLastSystemId(transaction: Transaction): Promise<void>;
