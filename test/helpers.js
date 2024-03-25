import assert from 'node:assert';
import { releaseAll } from '@cityssm/mssql-multi-pool';
import { getAccountNumberByWorkOrderNumberAndObjectCode } from '../helpers/getAccountNumber.js';
import { accountNumberObjectCode, accountNumberWorkOrderNumber, mssqlConfig } from './config.js';
describe('helpers', () => {
    after(() => {
        releaseAll();
    });
    describe('getAccountNumberByWorkOrderNumberAndObjectCode()', () => {
        it('Retrieves an account number', async () => {
            const accountNumber = await getAccountNumberByWorkOrderNumberAndObjectCode(mssqlConfig, accountNumberWorkOrderNumber, accountNumberObjectCode);
            console.log(accountNumber);
            assert.ok(accountNumber !== undefined);
        });
    });
});
