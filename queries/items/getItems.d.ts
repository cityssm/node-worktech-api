import { type mssql } from '@cityssm/mssql-multi-pool';
import type { ResourceItem } from './types.js';
/**
 * Retrieves an item.
 * @param mssqlConfig - SQL Server configuration.
 * @param itemId - The item id.
 * @param bypassCache - Whether to bypass the cache
 * @returns - The item, if available.
 */
export declare function getItemByItemId(mssqlConfig: mssql.config, itemId: string, bypassCache?: boolean): Promise<ResourceItem | undefined>;
