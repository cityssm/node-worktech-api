import type { mssqlTypes } from '@cityssm/mssql-multi-pool';
import type { BigIntString } from '../types.js';
import type { EquipmentItem } from './types.js';
export interface AddEquipment extends Partial<EquipmentItem> {
    equipmentId: string;
    equipmentClass: string;
    equipmentDescription: string;
}
export declare function addEquipment(mssqlConfig: mssqlTypes.config, equipment: AddEquipment): Promise<BigIntString>;
