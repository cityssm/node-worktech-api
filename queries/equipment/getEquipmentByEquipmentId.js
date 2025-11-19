import { NodeCache } from '@cacheable/node-cache';
import { cacheTimeToLiveSeconds } from '../../apiConfig.js';
import { getEquipment } from './getEquipment.js';
const cache = new NodeCache({
    stdTTL: cacheTimeToLiveSeconds
});
/**
 * Retrieves a piece of equipment.
 * @param mssqlConfig - SQL Server configuration.
 * @param equipmentId - The equipment id.
 * @param bypassCache - Whether to bypass the cache
 * @returns - The equipment record, if available.
 */
export async function getEquipmentByEquipmentId(mssqlConfig, equipmentId, bypassCache = false) {
    let equipment = bypassCache ? undefined : cache.get(equipmentId);
    if (equipment !== undefined) {
        return equipment;
    }
    const equipmentList = await getEquipment(mssqlConfig, {
        equipmentIds: [equipmentId]
    });
    if (equipmentList.length === 0) {
        return undefined;
    }
    equipment = equipmentList[0];
    cache.set(equipmentId, equipment);
    return equipment;
}
/**
 * Clears the equipment cache.
 */
export function clearEquipmentCache() {
    cache.flushAll();
}
