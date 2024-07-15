import { type config as MSSQLConfig } from '@cityssm/mssql-multi-pool';
import type { BigIntString } from '../types.js';
/**
 * Deletes a resource on a work order.
 * @param mssqlConfig - SQL Service configuration.
 * @param serviceRequestItemSystemId - The work order resource id.
 * @returns - True when the delete is processed successfully.
 */
export declare function deleteWorkOrderResource(mssqlConfig: MSSQLConfig, serviceRequestItemSystemId: BigIntString): Promise<boolean>;
