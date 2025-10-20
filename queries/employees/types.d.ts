export interface EmployeePayCode {
    employeeNumber: string;
    payCode: string;
    level: number;
    position: string | null;
    positionId: string | null;
    effectiveDate: Date;
    isPrimary: boolean;
}
