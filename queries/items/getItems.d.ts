import type { config as MSSQLConfig } from 'mssql';
import type { ResourceItem } from './types.js';
/**
 * Retrieves an item.
 * @param {MSSQLConfig} mssqlConfig - SQL Server configuration.
 * @param {string} itemId - The item id.
 * @returns {Promise<ResourceItem | undefined>} - The item, if available.
 */
export declare function _getItemByItemId(mssqlConfig: MSSQLConfig, itemId: string): Promise<ResourceItem | undefined>;
