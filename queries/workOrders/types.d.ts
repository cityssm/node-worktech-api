import type { BigIntString } from '../types.js';
export interface WorkOrder {
    serviceRequestSystemId: BigIntString;
    workOrderNumber: string;
    project: string;
    requestDateTime: Date | null;
    dueDateTime: Date | null;
    scheduleDate: Date | null;
    doneDateTime: Date | null;
    closedDateTime: Date | null;
    requestedBy: string;
    requestedByPhoneNumber: string;
    address1: string;
    workOrderType: 'General' | 'Equipment';
    workOrderSubType: string;
    workOrderSeries: string;
    subject: string;
    details: string;
    priority: string;
    itemId: string;
    jobId: string;
    activityId: string;
    objectCode: string;
    serviceClass: string;
    serviceType: string;
    fiscalYear: string;
    evaluatedBy: string;
    assignedTo: string;
    action: string;
    responseNotes: string;
    billingName: string;
    userDefined1: string;
    userDefined2: string;
    userDefined3: string;
    userDefined4: string;
    userDefined5: string;
}
export interface WorkOrderResource {
    serviceRequestItemSystemId: BigIntString | number;
    /** Max length = 9 */
    step: string;
    serviceRequestSystemId: BigIntString | number;
    workOrderNumber: string;
    itemSystemId: BigIntString | number;
    itemId: string;
    workDescription: string;
    quantity: number;
    unitPrice: number;
    baseAmount: number;
    lockUnitPrice: 0 | 1;
    lockMargin: 0 | 1;
    startDateTime: Date;
    endDateTime: Date;
}
