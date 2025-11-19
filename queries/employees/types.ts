import type { BigIntString } from '../types.js'

export interface EmployeeItem {
  itemSystemId: BigIntString | number

  employeeNumber: string
  employeeName: string
  employeeClass: string
  employeeStatus: string
  department: string
  startDate: Date | null

  address1: string
  address2: string
  address3: string
  address4: string

  birthDate: Date | null

  phoneNumber1: string
  phoneNumberType1: string

  emailAddress: string
  positionId: string
  hoursPerPayPeriod: number
  payOvertime: boolean
  bankOvertime: boolean
  defaultEquipmentId: string
  patrol: string
}

export interface EmployeePayCode {
  employeeNumber: string
  payCode: string

  level: number

  position: string | null
  positionId: string | null

  effectiveDate: Date
  isPrimary: boolean
}

export interface TimeCode {
  timeCode: string
  timeCodeDescription: string

  externalCode: string | null
}

export interface TimesheetBatchEntry {
  batchSystemId: string
  batchId: string
  batchEntryNumber: number

  timesheetDate: Date | null
  timesheetDateString: string | null

  employeeNumber: string | null
  positionId: string | null
  payCode: string | null
  timeCode: string | null

  jobId: string | null
  activityId: string | null
  workOrderNumber: string | null
  objectCode: string | null

  timesheetHours: number
}
