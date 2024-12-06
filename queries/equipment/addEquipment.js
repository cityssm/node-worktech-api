import { addResourceItem } from '../items/addResourceItem.js';
export async function addEquipment(mssqlConfig, equipment) {
    return await addResourceItem(mssqlConfig, {
        itemType: 'Equipment',
        itemStatus: 'Active',
        itemId: equipment.equipmentId,
        itemClass: equipment.equipmentClass,
        itemDescription: equipment.equipmentDescription,
        unit: 'km'
    });
}
