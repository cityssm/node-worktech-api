import { type mssql } from '@cityssm/mssql-multi-pool';
import type { EquipmentItem } from './types.js';
/**
 * Retrieves a piece of equipment.
 * @param mssqlConfig - SQL Server configuration.
 * @param equipmentId - The equipment id.
 * @returns - The equipment record, if available.
 */
export declare function getEquipmentByEquipmentId(mssqlConfig: mssql.config, equipmentId: string): Promise<EquipmentItem | undefined>;
/**
 * Clears the equipment cache.
 */
export declare function clearEquipmentCache(): void;
