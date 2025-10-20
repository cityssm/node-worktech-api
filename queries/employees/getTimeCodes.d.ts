import { type mssql } from '@cityssm/mssql-multi-pool';
import type { TimeCode } from './types.js';
/**
 * Retrieves available time codes.
 * @param mssqlConfig - SQL Server configuration.
 * @returns The available time codes.
 */
export declare function getTimeCodes(mssqlConfig: mssql.config): Promise<TimeCode[]>;
