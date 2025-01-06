import type { mssql } from '@cityssm/mssql-multi-pool'

import { addResourceItem } from '../items/addResourceItem.js'
import type { BigIntString } from '../types.js'

import type { EquipmentItem } from './types.js'

export interface AddEquipment extends Partial<EquipmentItem> {
  equipmentId: string
  equipmentClass: string
  equipmentDescription: string
  serialNumber?: string
  plate?: string
  equipmentBrand?: string
  equipmentModel?: string
  equipmentModelYear?: number
  departmentOwned?: string
  location?: string
  comments?: string
  odometer?: number
}

export async function addEquipment(
  mssqlConfig: mssql.config,
  equipment: AddEquipment
): Promise<BigIntString> {
  return await addResourceItem(mssqlConfig, {
    itemType: 'Equipment',
    itemStatus: 'Active',
    itemId: equipment.equipmentId,
    itemClass: equipment.equipmentClass,
    itemDescription: equipment.equipmentDescription,
    itemBrand: equipment.equipmentBrand,
    itemModel: equipment.equipmentModel,
    itemModelYear: equipment.equipmentModelYear,
    department: equipment.departmentOwned,
    serialNumber: equipment.serialNumber,
    plate: equipment.plate,
    location: equipment.location,
    comments: equipment.comments,
    odometer: equipment.odometer,
    unit: 'km'
  })
}
