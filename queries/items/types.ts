import type { BigIntString } from '../types.js'

export enum ResourceItemStock {
  No = 0,
  Yes = 1,
  'Non-Inventory' = 2
}

export interface ResourceItem {
  itemSystemId: BigIntString
  itemId: string

  itemDescription: string
  itemClass: string
  itemType: string

  externalItemId: string
  itemBrand: string
  itemModel: string
  serialNumber: string
  fuelType: string

  itemStatus: string
  comments: string

  location: string
  department: string
  division: string
  company: string

  expenseJob: string
  expenseActivity: string
  expenseObjectCode: string

  revenueJob: string
  revenueActivity: string
  revenueObjectCode: string

  /**
   * 0 = No,
   * 1 = Yes,
   * 2 = Non-Inventory
   */
  stock: ResourceItemStock

  unit: string
  unitCost: number
  quantityOnHand: number
}
