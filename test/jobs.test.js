import assert from 'node:assert';
import { after, describe, it } from 'node:test';
import { releaseAll } from '@cityssm/mssql-multi-pool';
import { getActivitiesAssignedToJobByFiscalYear, getActivityByActivityId, getJobActivityObjectCodeByKeys, getJobByJobId, getObjectCodeByObjectCode, getObjectCodesAssignedToJobByFiscalYear } from '../index.js';
import { invalidActivityId, invalidJobId, invalidObjectCode, mssqlConfig, validActivityId, validJobId, validObjectCode } from './config.js';
await describe('queries/jobs', async () => {
    after(() => {
        releaseAll();
    });
    await describe('getJobs()', async () => {
        await it('Retrieves a job', async () => {
            const job = await getJobByJobId(mssqlConfig, validJobId);
            console.log(job);
            assert.ok(job !== undefined);
            assert.strictEqual(job.jobId, validJobId);
        });
        await it('Returns "undefined" when no job is available.', async () => {
            const job = await getJobByJobId(mssqlConfig, invalidJobId);
            assert.strictEqual(job, undefined);
        });
    });
    await describe('getActivities()', async () => {
        await it('Retrieves an activity', async () => {
            const activity = await getActivityByActivityId(mssqlConfig, validActivityId);
            console.log(activity);
            assert.ok(activity !== undefined);
            assert.strictEqual(activity.activityId, validActivityId);
        });
        await it('Returns "undefined" when no activity is available.', async () => {
            const activity = await getActivityByActivityId(mssqlConfig, invalidActivityId);
            assert.strictEqual(activity, undefined);
        });
        await it('Retrieve activities for a given job', async () => {
            const activities = await getActivitiesAssignedToJobByFiscalYear(mssqlConfig, validJobId, new Date().getFullYear() - 1);
            console.log(activities);
            assert.ok(activities.length > 0);
        });
    });
    await describe('getObjectCodes()', async () => {
        await it('Retrieves an object code', async () => {
            const objectCode = await getObjectCodeByObjectCode(mssqlConfig, validObjectCode);
            console.log(objectCode);
            assert.ok(objectCode !== undefined);
            assert.strictEqual(objectCode.objectCode, validObjectCode);
        });
        await it('Returns "undefined" when no object code is available.', async () => {
            const objectCode = await getObjectCodeByObjectCode(mssqlConfig, invalidObjectCode);
            assert.strictEqual(objectCode, undefined);
        });
        await it('Retrieve object codes for a given job', async () => {
            const objectCodes = await getObjectCodesAssignedToJobByFiscalYear(mssqlConfig, validJobId, new Date().getFullYear() - 1);
            console.log(objectCodes);
            assert.ok(objectCodes.length > 0);
        });
    });
    await describe('getJobActivityObjectCodes()', async () => {
        await it('Retrieves a job - activity - object code', async () => {
            const code = await getJobActivityObjectCodeByKeys(mssqlConfig, {
                jobId: validJobId,
                activityId: validActivityId,
                objectCode: validObjectCode,
                fiscalYear: new Date().getFullYear() - 1
            });
            console.log(code);
            assert.ok(code !== undefined);
            assert.strictEqual(code.jobId, validJobId);
            assert.strictEqual(code.activityId, validActivityId);
            assert.strictEqual(code.objectCode, validObjectCode);
        });
        await it('Returns "undefined" when no job - activity - object code is available.', async () => {
            const code = await getJobActivityObjectCodeByKeys(mssqlConfig, {
                jobId: invalidJobId,
                activityId: validActivityId,
                objectCode: validObjectCode,
                fiscalYear: new Date().getFullYear()
            });
            assert.strictEqual(code, undefined);
        });
    });
});
