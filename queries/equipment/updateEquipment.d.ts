import { type mssql } from '@cityssm/mssql-multi-pool';
import type { BigIntString } from '../types.js';
export interface UpdateEquipmentFields {
    equipmentDescription: string;
    equipmentStatus: string;
    equipmentClass: string;
    serialNumber: string;
    plate: string;
    equipmentBrand: string;
    equipmentModel: string;
    equipmentModelYear: number;
    departmentOwned: string;
    location: string;
    comments: string;
    odometer: number;
}
/**
 * Updates fields for a piece of equipment.
 * @param mssqlConfig - SQL Server configuration.
 * @param equipmentSystemId - The equipment system id.
 * @param fieldsToUpdate - The fields to update.
 * @returns True if the update was successful.
 */
export declare function updateEquipmentFields(mssqlConfig: mssql.config, equipmentSystemId: BigIntString, fieldsToUpdate: Partial<UpdateEquipmentFields>): Promise<boolean>;
