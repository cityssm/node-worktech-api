// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import assert from 'node:assert';
import { after, describe, it } from 'node:test';
import { releaseAll } from '@cityssm/mssql-multi-pool';
import Debug from 'debug';
import { DEBUG_ENABLE_NAMESPACES } from '../debug.config.js';
import { getEmployeePayCodes } from '../queries/employees/getEmployeePayCodes.js';
import { mssqlConfig, validEmployeeNumber } from './config.js';
Debug.enable(DEBUG_ENABLE_NAMESPACES);
await describe('queries/employees', async () => {
    after(async () => {
        await releaseAll();
    });
    await describe('getEmployeePayCodes()', async () => {
        await it('Retrieves employee pay codes', async () => {
            const employeePayCodes = await getEmployeePayCodes(mssqlConfig, validEmployeeNumber);
            console.log(employeePayCodes);
            if (employeePayCodes.length === 0) {
                throw new Error('No employee pay codes retrieved');
            }
            for (const employeePayCode of employeePayCodes) {
                assert.strictEqual(employeePayCode.employeeNumber, validEmployeeNumber);
            }
        });
    });
});
