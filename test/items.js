import assert from 'node:assert';
import { releaseAll } from '@cityssm/mssql-multi-pool';
import { _getItemByItemId } from '../queries/items/getItems.js';
import { invalidItemId, mssqlConfig, validItemId } from './config.js';
describe('queries/items', () => {
    after(() => {
        releaseAll();
    });
    describe('getItems()', () => {
        it('Retrieves an item', async () => {
            const item = await _getItemByItemId(mssqlConfig, validItemId);
            console.log(item);
            assert.ok(item !== undefined);
            assert.strictEqual(item.itemId, validItemId);
        });
        it('Returns "undefined" when no item is available.', async () => {
            const item = await _getItemByItemId(mssqlConfig, invalidItemId);
            assert.strictEqual(item, undefined);
        });
    });
});
