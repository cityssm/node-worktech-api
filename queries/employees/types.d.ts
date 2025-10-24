export interface EmployeePayCode {
    employeeNumber: string;
    payCode: string;
    level: number;
    position: string | null;
    positionId: string | null;
    effectiveDate: Date;
    isPrimary: boolean;
}
export interface TimeCode {
    timeCode: string;
    timeCodeDescription: string;
    externalCode: string | null;
}
export interface TimesheetBatchEntry {
    batchSystemId: string;
    batchId: string;
    batchEntryNumber: number;
    timesheetDate: Date | null;
    timesheetDateString: string | null;
    employeeNumber: string | null;
    positionId: string | null;
    payCode: string | null;
    timeCode: string | null;
    jobId: string | null;
    activityId: string | null;
    workOrderNumber: string | null;
    objectCode: string | null;
    timesheetHours: number;
}
