import { type mssql } from '@cityssm/mssql-multi-pool';
import type { BigIntString } from '../types.js';
import type { ResourceItem } from './types.js';
export interface AddResourceItem extends Partial<ResourceItem> {
    itemId: string;
    itemType: string;
    itemClass: string;
    unit: string;
    plate?: string;
    odometer?: number;
}
/**
 * Creates a new resource item.
 * @param mssqlConfig - SQL Server configuration.
 * @param resourceItem - The resource item fields.
 * @returns The system id for the new resource item.
 */
export declare function addResourceItem(mssqlConfig: mssql.config, resourceItem: AddResourceItem): Promise<BigIntString>;
