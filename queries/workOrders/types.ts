import type { BigIntString } from '../types.js'

export interface WorkOrder {
  serviceRequestSystemId: BigIntString
  workOrderNumber: string
  project: string

  requestDateTime: Date | null
  dueDateTime: Date | null
  scheduleDate: Date | null
  doneDateTime: Date | null
  closedDateTime: Date | null

  requestedBy: string
  requestedByPhoneNumber: string
  address1: string

  workOrderType: 'General' | 'Equipment'
  workOrderSubType: string
  workOrderSeries: string

  subject: string
  details: string
  priority: string

  jobId: string
  activityId: string
  objectCode: string
  serviceClass: string
  serviceType: string
  fiscalYear: string

  evaluatedBy: string
  assignedTo: string

  action: string
  responseNotes: string

  billingName: string

  userDefined1: string
  userDefined2: string
  userDefined3: string
  userDefined4: string
  userDefined5: string
}

export interface WorkOrderResource {
  serviceRequestItemSystemId: BigIntString
  step: string

  serviceRequestSystemId: BigIntString
  workOrderNumber: string

  itemSystemId: BigIntString
  itemId: string
  workDescription: string

  quantity: number
  unitPrice: number
  baseAmount: number

  startDateTime: Date
  endDateTime: Date
}
