import { addResourceItem } from '../items/addResourceItem.js';
export async function addEquipment(mssqlConfig, equipment) {
    return await addResourceItem(mssqlConfig, {
        itemType: 'Equipment',
        itemStatus: 'Active',
        itemId: equipment.equipmentId,
        itemClass: equipment.equipmentClass,
        itemDescription: equipment.equipmentDescription,
        itemBrand: equipment.equipmentBrand,
        itemModel: equipment.equipmentModel,
        itemModelYear: equipment.equipmentModelYear,
        serialNumber: equipment.serialNumber,
        plate: equipment.plate,
        location: equipment.location,
        comments: equipment.comments,
        odometer: equipment.odometer,
        unit: 'km'
    });
}
