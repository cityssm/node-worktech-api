import type { BigIntString } from "../types.js";
export interface EquipmentItem {
    equipmentSystemId: BigIntString;
    equipmentId: string;
    equipmentDescription: string;
    equipmentClass: string;
    equipmentBrand: string;
    equipmentModel: string;
    equipmentModelYear: number;
    serialNumber: string;
    plate: string;
    fuelType: string;
    equipmentStatus: string;
    comments: string;
    location: string;
    departmentOwned: string;
    departmentManaged: string;
    expenseJobId: string;
    expenseActivityId: string;
    expenseObjectCode: string;
    revenueJobId: string;
    revenueActivityId: string;
    revenueObjectCode: string;
    odometer: number;
    jobCostHours: number;
    hourMeter: number;
}
