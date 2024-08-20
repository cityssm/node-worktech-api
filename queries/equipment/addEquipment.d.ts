import type { config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import type { BigIntString } from '../types.js';
import type { EquipmentItem } from './types.js';
export interface AddEquipment extends Partial<EquipmentItem> {
    equipmentId: string;
    equipmentClass: string;
    equipmentDescription: string;
}
export declare function addEquipment(mssqlConfig: MSSQLConfig, equipment: AddEquipment): Promise<BigIntString>;
