# Unofficial WorkTech API for Node

[![DeepSource](https://app.deepsource.com/gh/cityssm/node-worktech-api.svg/?label=active+issues&show_trend=true&token=dXtpnezfJ8MzuRxb95LrmLA_)](https://app.deepsource.com/gh/cityssm/node-worktech-api/)

This package assists with integrations between WorkTech and other systems.
It is not meant to be a complete API, and it is not endorsed by WorkTech.

The queries used were discovered using tools like SQL Profiler,
and are subject to change and break with WorkTech application updates.

Before using this package, especially for update purposes,
be sure to run the queries against a test system!

## Sample Functions

- `getEquipmentByEquipmentId(equipmentId: string): Promise<EquipmentItem | undefined>;`
- `getItemByItemId(itemId: string): Promise<ResourceItem | undefined>;`
- `getWorkOrderByWorkOrderNumber(workOrderNumber: string): Promise<WorkOrder | undefined>;`
- `getWorkOrderResourcesByWorkOrderNumber(workOrderNumber: string): Promise<WorkOrderResource[]>;`
- `getWorkOrderResourcesByStartDate(startDateString: DateString): Promise<WorkOrderResource[]>;`
- `getJobByJobId(jobId: string): Promise<Job | undefined>;`
- `getActivityByActivityId(activityId: string): Promise<Activity | undefined>;`
- `getObjectCodeByObjectCode(objectCode: string): Promise<ObjectCode | undefined>;`

For a complete list,
see [`index.ts`](https://github.com/cityssm/node-worktech-api/blob/main/index.ts).

## Sample Update Functions

- `addWorkOrderResource(workOrderResource: AddWorkOrderResource): Promise<BigIntString>;`
- `updateWorkOrderResource(workOrderResource: WorkOrderResource): Promise<boolean>;`
- `deleteWorkOrderResource(workOrderResourceId: BigIntString): Promise<boolean>;`

## Other Related Projects

[FASTER Web Report Parser](https://github.com/cityssm/node-faster-report-parser)<br />
Parses select Excel and CSV reports from FASTER Web into usable data objects.
