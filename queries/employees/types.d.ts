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
