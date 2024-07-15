import assert from 'node:assert';
import { randomUUID } from 'node:crypto';
import { after, describe, it } from 'node:test';
import { releaseAll } from '@cityssm/mssql-multi-pool';
import { dateToString } from '@cityssm/utils-datetime';
import { addWorkOrderResource, getWorkOrderByWorkOrderNumber, getWorkOrderResourcesByStartDate, getWorkOrderResourcesByWorkOrderNumber, updateWorkOrderResource } from '../index.js';
import { invalidWorkOrderNumber, mssqlConfig, validItemId, validWorkOrderNumber } from './config.js';
await describe('queries/workOrders', async () => {
    after(async () => {
        await releaseAll();
    });
    await describe('getWorkOrders()', async () => {
        await it('Retrieves a work order', async () => {
            const workOrder = await getWorkOrderByWorkOrderNumber(mssqlConfig, validWorkOrderNumber);
            console.log(workOrder);
            assert.ok(workOrder !== undefined);
            assert.strictEqual(workOrder.workOrderNumber, validWorkOrderNumber);
        });
        await it('Returns "undefined" when no work order is available.', async () => {
            const workOrder = await getWorkOrderByWorkOrderNumber(mssqlConfig, invalidWorkOrderNumber);
            assert.strictEqual(workOrder, undefined);
        });
    });
    await describe('getWorkOrderResources()', async () => {
        await it('Retrieves an array of resources', async () => {
            const resources = await getWorkOrderResourcesByWorkOrderNumber(mssqlConfig, validWorkOrderNumber);
            console.log(resources);
            assert.ok(resources.length > 0);
        });
    });
    await describe('addWorkOrderResource(), updateWorkOrderResource()', async () => {
        await it('Adds a resource to a work order', async () => {
            const workOrderResourcesBefore = await getWorkOrderResourcesByWorkOrderNumber(mssqlConfig, validWorkOrderNumber);
            const currentDate = new Date();
            const startDateResourcesBefore = await getWorkOrderResourcesByStartDate(mssqlConfig, dateToString(currentDate));
            const systemId = await addWorkOrderResource(mssqlConfig, {
                workOrderNumber: validWorkOrderNumber,
                startDateTime: currentDate,
                step: Math.round(Date.now() / 10_000).toString(),
                itemId: validItemId,
                workDescription: `${randomUUID().slice(-10)} - Item from Faster`,
                quantity: 25,
                unitPrice: 12.5,
                lockMargin: 1,
                lockUnitPrice: 1
            });
            assert.ok(systemId !== undefined);
            let workOrderResourcesAfter = await getWorkOrderResourcesByWorkOrderNumber(mssqlConfig, validWorkOrderNumber);
            const startDateResourcesAfter = await getWorkOrderResourcesByStartDate(mssqlConfig, dateToString(currentDate));
            assert.strictEqual(workOrderResourcesBefore.length + 1, workOrderResourcesAfter.length);
            assert.strictEqual(startDateResourcesBefore.length + 1, startDateResourcesAfter.length);
            assert.ok(workOrderResourcesAfter.some((resource) => {
                return resource.serviceRequestItemSystemId === systemId;
            }));
            assert.ok(startDateResourcesAfter.some((resource) => {
                return resource.serviceRequestItemSystemId === systemId;
            }));
            /*
             * Update details
             */
            const newDescription = `Updated description - ${randomUUID().slice(-10)}`;
            assert(await updateWorkOrderResource(mssqlConfig, {
                serviceRequestItemSystemId: systemId,
                workDescription: newDescription,
                quantity: 20,
                unitPrice: 10,
                baseAmount: 200
            }));
            workOrderResourcesAfter = await getWorkOrderResourcesByWorkOrderNumber(mssqlConfig, validWorkOrderNumber);
            assert.ok(workOrderResourcesAfter.some((resource) => {
                return resource.workDescription === newDescription;
            }));
        });
    });
});
