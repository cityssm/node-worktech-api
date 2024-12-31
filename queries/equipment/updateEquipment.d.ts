import { type mssql } from '@cityssm/mssql-multi-pool';
export interface UpdateEquipmentFields {
    equipmentDescription: string;
    equipmentStatus: string;
    equipmentClass: string;
    serialNumber: string;
    plate: string;
    equipmentBrand: string;
    equipmentModel: string;
    equipmentModelYear: number;
    location: string;
    comments: string;
    odometer: number;
}
/**
 * Updates fields for a piece of equipment.
 * @param mssqlConfig - SQL Server configuration.
 * @param equipmentId - The equipment id.
 * @param fieldsToUpdate - The fields to update.
 * @returns True if the update was successful.
 */
export declare function updateEquipmentFields(mssqlConfig: mssql.config, equipmentId: string, fieldsToUpdate: Partial<UpdateEquipmentFields>): Promise<boolean>;
