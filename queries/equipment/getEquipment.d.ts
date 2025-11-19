import { type mssql } from '@cityssm/mssql-multi-pool';
import type { EquipmentItem } from './types.js';
export interface GetEquipmentFilters {
    equipmentStatuses?: string[];
    notEquipmentStatuses?: string[];
    equipmentIds?: string[];
    notEquipmentIds?: string[];
    equipmentClasses?: string[];
    notEquipmentClasses?: string[];
    departmentsOwned?: string[];
    notDepartmentsOwned?: string[];
}
/**
 * Retrieves equipment based on filters.
 * @param mssqlConfig - SQL Server configuration
 * @param filters - Filters to apply to the equipment query.
 * @returns The equipment
 */
export declare function getEquipment(mssqlConfig: mssql.config, filters: GetEquipmentFilters): Promise<EquipmentItem[]>;
