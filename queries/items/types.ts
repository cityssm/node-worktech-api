import type { BigIntString } from '../types.js'

export const enum ResourceItemStock {
  No = 0,
  Yes = 1,
  
  'Non-Inventory' = 2
}

export interface ResourceItem {
  itemSystemId: BigIntString | number
  itemId: string

  itemDescription: string
  itemType: string
  itemClass: string

  externalItemId: string
  itemBrand: string
  itemModel: string
  itemModelYear: number
  serialNumber: string
  fuelType: string

  itemStatus: string
  comments: string

  location: string
  department: string
  division: string
  company: string

  expenseJobId: string
  expenseActivityId: string
  expenseObjectCode: string

  revenueJobId: string
  revenueActivityId: string
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
