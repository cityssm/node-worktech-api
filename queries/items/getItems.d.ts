import { type mssqlTypes } from '@cityssm/mssql-multi-pool';
import type { ResourceItem } from './types.js';
/**
 * Retrieves an item.
 * @param mssqlConfig - SQL Server configuration.
 * @param itemId - The item id.
 * @returns - The item, if available.
 */
export declare function getItemByItemId(mssqlConfig: mssqlTypes.config, itemId: string): Promise<ResourceItem | undefined>;
