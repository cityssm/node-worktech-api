import type { config as MSSQLConfig } from '@cityssm/mssql-multi-pool'

import { addResourceItem } from '../items/addResourceItem.js'
import type { BigIntString } from '../types.js'

import type { EquipmentItem } from './types.js'

export interface AddEquipment extends Partial<EquipmentItem> {
  equipmentId: string
  equipmentClass: string
  equipmentDescription: string
}

export async function addEquipment(
  mssqlConfig: MSSQLConfig,
  equipment: AddEquipment
): Promise<BigIntString> {
  return await addResourceItem(mssqlConfig, {
    itemType: 'Equipment',
    itemStatus: 'Active',
    itemId: equipment.equipmentId,
    itemClass: equipment.equipmentClass,
    itemDescription: equipment.equipmentDescription,
    unit: 'km',
  })
}
