import { type config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import type { EquipmentItem } from './types.js';
/**
 * Retrieves a piece of equipment.
 * @param mssqlConfig - SQL Server configuration.
 * @param equipmentId - The equipment id.
 * @returns - The equipment record, if available.
 */
export declare function getEquipmentByEquipmentId(mssqlConfig: MSSQLConfig, equipmentId: string): Promise<EquipmentItem | undefined>;
