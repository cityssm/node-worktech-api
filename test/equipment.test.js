import assert from 'node:assert';
import { randomUUID } from 'node:crypto';
import { after, describe, it } from 'node:test';
import { releaseAll } from '@cityssm/mssql-multi-pool';
import { WorkTechAPI } from '../index.js';
import { equipmentToAdd, invalidEquipmentId, mssqlConfig, validEquipmentId } from './config.js';
await describe('queries/equipment', async () => {
    const worktechApi = new WorkTechAPI(mssqlConfig);
    after(async () => {
        await releaseAll();
    });
    await it('Retrieves a piece of equipment', async () => {
        const equipment = await worktechApi.getEquipmentByEquipmentId(validEquipmentId);
        console.log(equipment);
        assert.ok(equipment !== undefined);
        assert.strictEqual(equipment.equipmentId, validEquipmentId);
    });
    await it('Returns "undefined" when no equipment is available.', async () => {
        const equipment = await worktechApi.getEquipmentByEquipmentId(invalidEquipmentId);
        assert.strictEqual(equipment, undefined);
    });
    await it('Adds a new piece of equipment, then updates it.', async () => {
        const equipmentId = 'TEST-' + Math.round(Date.now() / 1000).toString();
        const equipmentDescription = randomUUID();
        console.log(`Adding new equipment: ${equipmentId}`);
        const systemId = await worktechApi.addEquipment(Object.assign({
            equipmentId,
            equipmentDescription
        }, equipmentToAdd));
        console.log(`New equipment system id: ${systemId}`);
        assert.ok(systemId);
        const equipment = await worktechApi.getEquipmentByEquipmentId(equipmentId);
        assert(equipment !== undefined);
        assert.strictEqual(equipment.equipmentId, equipmentId);
        assert.strictEqual(equipment.equipmentDescription, equipmentDescription);
        const newEquipmentDescription = randomUUID();
        await worktechApi.updateEquipmentFields(equipmentId, {
            equipmentDescription: newEquipmentDescription
        });
        const updatedEquipment = await worktechApi.getEquipmentByEquipmentId(equipmentId);
        assert(updatedEquipment !== undefined);
        assert.strictEqual(updatedEquipment.equipmentDescription, newEquipmentDescription);
    });
});
