import type { BigIntString } from '../types.js'

export interface Job {
  jobSystemId: BigIntString
  jobId: string
  location: string
  jobDescription: string
  jobShortDescription: string
  status: string

  program: string
  jobGroup: string

  startYear: string
  endYear: string

  accountSegment: string

  defaultActivityId: string
  defaultVehicleId: string
  defaultProjectId: string
  defaultAssetId: string
}

export interface Activity {
  activitySystemId: BigIntString
  activityId: string
  activityType: string
  activityDescription: string
  activityShortDescription: string
  activityClass: string
  accountSegment: string
}

export interface ObjectCode {
  objectCodeSystemId: string
  objectCode: string
  objectCodeDescription: string
  accountSegment: string
}

export interface JobAssignedObjectCode extends ObjectCode {
  accountNumber: string
}

export interface JobActivityObjectCode {
  jobId: string
  activityId: string
  objectCode: string
  fiscalYear: string
  accountNumber: string
}
