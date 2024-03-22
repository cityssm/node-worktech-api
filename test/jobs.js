import assert from 'node:assert';
import { releaseAll } from '@cityssm/mssql-multi-pool';
import { getActivitiesAssignedToJobByFiscalYear, getActivityByActivityId, getJobActivityObjectCodeByKeys, getJobByJobId, getObjectCodeByObjectCode, getObjectCodesAssignedToJobByFiscalYear } from '../index.js';
import { invalidActivityId, invalidJobId, invalidObjectCode, mssqlConfig, validActivityId, validJobId, validObjectCode } from './config.js';
describe('queries/jobs', () => {
    after(() => {
        releaseAll();
    });
    describe('getJobs()', () => {
        it('Retrieves a job', async () => {
            const job = await getJobByJobId(mssqlConfig, validJobId);
            console.log(job);
            assert.ok(job !== undefined);
            assert.strictEqual(job.jobId, validJobId);
        });
        it('Returns "undefined" when no job is available.', async () => {
            const job = await getJobByJobId(mssqlConfig, invalidJobId);
            assert.strictEqual(job, undefined);
        });
    });
    describe('getActivities()', () => {
        it('Retrieves an activity', async () => {
            const activity = await getActivityByActivityId(mssqlConfig, validActivityId);
            console.log(activity);
            assert.ok(activity !== undefined);
            assert.strictEqual(activity.activityId, validActivityId);
        });
        it('Returns "undefined" when no activity is available.', async () => {
            const activity = await getActivityByActivityId(mssqlConfig, invalidActivityId);
            assert.strictEqual(activity, undefined);
        });
        it('Retrieve activities for a given job', async () => {
            const activities = await getActivitiesAssignedToJobByFiscalYear(mssqlConfig, validJobId, new Date().getFullYear() - 1);
            console.log(activities);
            assert.ok(activities.length > 0);
        });
    });
    describe('getObjectCodes()', () => {
        it('Retrieves an object code', async () => {
            const objectCode = await getObjectCodeByObjectCode(mssqlConfig, validObjectCode);
            console.log(objectCode);
            assert.ok(objectCode !== undefined);
            assert.strictEqual(objectCode.objectCode, validObjectCode);
        });
        it('Returns "undefined" when no object code is available.', async () => {
            const objectCode = await getObjectCodeByObjectCode(mssqlConfig, invalidObjectCode);
            assert.strictEqual(objectCode, undefined);
        });
        it('Retrieve object codes for a given job', async () => {
            const objectCodes = await getObjectCodesAssignedToJobByFiscalYear(mssqlConfig, validJobId, new Date().getFullYear() - 1);
            console.log(objectCodes);
            assert.ok(objectCodes.length > 0);
        });
    });
    describe('getJobActivityObjectCodes()', () => {
        it('Retrieves a job - activity - object code', async () => {
            const code = await getJobActivityObjectCodeByKeys(mssqlConfig, validJobId, validActivityId, validObjectCode, new Date().getFullYear() - 1);
            console.log(code);
            assert.ok(code !== undefined);
            assert.strictEqual(code.jobId, validJobId);
            assert.strictEqual(code.activityId, validActivityId);
            assert.strictEqual(code.objectCode, validObjectCode);
        });
        it('Returns "undefined" when no job - activity - object code is available.', async () => {
            const code = await getJobActivityObjectCodeByKeys(mssqlConfig, invalidJobId, validActivityId, validObjectCode, new Date().getFullYear());
            assert.strictEqual(code, undefined);
        });
    });
});
