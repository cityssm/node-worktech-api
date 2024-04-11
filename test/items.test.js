import assert from 'node:assert';
import { after, describe, it } from 'node:test';
import { releaseAll } from '@cityssm/mssql-multi-pool';
import { getItemByItemId } from '../index.js';
import { invalidItemId, mssqlConfig, validItemId } from './config.js';
await describe('queries/items', async () => {
    after(async () => {
        await releaseAll();
    });
    await it('Retrieves an item', async () => {
        const item = await getItemByItemId(mssqlConfig, validItemId);
        console.log(item);
        assert.ok(item !== undefined);
        assert.strictEqual(item.itemId, validItemId);
    });
    await it('Returns "undefined" when no item is available.', async () => {
        const item = await getItemByItemId(mssqlConfig, invalidItemId);
        assert.strictEqual(item, undefined);
    });
});
