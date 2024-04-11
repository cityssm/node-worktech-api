import assert from 'node:assert';
import { after, describe, it } from 'node:test';
import { releaseAll } from '@cityssm/mssql-multi-pool';
import { getAccountNumberByWorkOrderNumberAndObjectCode } from '../index.js';
import { accountNumberObjectCode, accountNumberWorkOrderNumber, mssqlConfig } from './config.js';
await describe('helpers', async () => {
    await describe('getAccountNumberByWorkOrderNumberAndObjectCode()', async () => {
        after(async () => {
            await releaseAll();
        });
        await it('Retrieves an account number', async () => {
            const accountNumber = await getAccountNumberByWorkOrderNumberAndObjectCode(mssqlConfig, accountNumberWorkOrderNumber, accountNumberObjectCode);
            console.log(accountNumber);
            assert.ok(accountNumber !== undefined);
        });
    });
});
