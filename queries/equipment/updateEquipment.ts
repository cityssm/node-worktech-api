import { connect, type mssql } from '@cityssm/mssql-multi-pool'

import { clearEquipmentCache } from './getEquipment.js'

export interface UpdateEquipmentFields {
  equipmentDescription: string
  equipmentClass: string
  equipmentStatus: string
  plate: string
  odometer: number
}

const columnNameMappings: Record<keyof UpdateEquipmentFields, string> = {
  equipmentDescription: 'DESC',
  equipmentClass: 'ItemClass',
  equipmentStatus: 'Status',
  plate: 'Plate',
  odometer: 'Odom'
}

/**
 * Updates fields for a piece of equipment.
 * @param mssqlConfig - SQL Server configuration.
 * @param equipmentId - The equipment id.
 * @param fieldsToUpdate - The fields to update.
 * @returns True if the update was successful.
 */
export async function updateEquipmentFields(
  mssqlConfig: mssql.config,
  equipmentId: string,
  fieldsToUpdate: Partial<UpdateEquipmentFields>
): Promise<boolean> {
  const pool = await connect(mssqlConfig)

  let request = pool.request()

  const updateList: string[] = []

  for (const [fieldName, fieldValue] of Object.entries(fieldsToUpdate)) {
    const columnName =
      columnNameMappings[fieldName as keyof UpdateEquipmentFields]

    updateList.push(`[${columnName}] = @${fieldName}`)
    request = request.input(fieldName, fieldValue)
  }

  await request.input('equipmentId', equipmentId).query(`update WMITM
    set ${updateList.join(', ')}
    where Item_ID = @equipmentId`)

  clearEquipmentCache()

  return true
}
