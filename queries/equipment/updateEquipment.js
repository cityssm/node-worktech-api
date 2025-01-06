import { connect } from '@cityssm/mssql-multi-pool';
import { clearEquipmentCache } from './getEquipment.js';
const columnNameMappings = {
    equipmentDescription: 'DESC',
    equipmentStatus: 'Status',
    equipmentClass: 'ItemClass',
    serialNumber: 'Serial',
    plate: 'Plate',
    equipmentBrand: 'Brand',
    equipmentModel: 'Model',
    equipmentModelYear: 'Year',
    departmentOwned: 'Dept',
    location: 'Location',
    comments: 'Comments',
    odometer: 'Odom'
};
/**
 * Updates fields for a piece of equipment.
 * @param mssqlConfig - SQL Server configuration.
 * @param equipmentId - The equipment id.
 * @param fieldsToUpdate - The fields to update.
 * @returns True if the update was successful.
 */
export async function updateEquipmentFields(mssqlConfig, equipmentId, fieldsToUpdate) {
    const pool = await connect(mssqlConfig);
    let request = pool.request();
    const updateList = [];
    for (const [fieldName, fieldValue] of Object.entries(fieldsToUpdate)) {
        const columnName = columnNameMappings[fieldName];
        updateList.push(`[${columnName}] = @${fieldName}`);
        request = request.input(fieldName, fieldValue);
    }
    await request.input('equipmentId', equipmentId).query(`update WMITM
    set ${updateList.join(', ')}
    where Item_ID = @equipmentId`);
    clearEquipmentCache();
    return true;
}
