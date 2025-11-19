import { connect } from '@cityssm/mssql-multi-pool';
/**
 * Retrieves equipment based on filters.
 * @param mssqlConfig - SQL Server configuration
 * @param filters - Filters to apply to the equipment query.
 * @returns The equipment
 */
export async function getEquipment(mssqlConfig, filters) {
    const pool = await connect(mssqlConfig);
    let request = pool.request();
    let sql = /* sql */ `
    SELECT [ITMSysID] as equipmentSystemId,
      [Item_ID] as equipmentId,
      coalesce([DESC], '') as equipmentDescription,
      coalesce([ItemClass], '') as equipmentClass,

      coalesce([Brand], '') as equipmentBrand,
      coalesce([Model], '') as equipmentModel,
      [Year] as equipmentModelYear,

      coalesce([Serial], '') as serialNumber,
      coalesce([Plate], '') as plate,

      coalesce([FlType], '') as fuelType,

      coalesce([Status], '') as equipmentStatus,
      coalesce([Comments], '') as comments,

      coalesce([Location], '') as location,
      coalesce([Dept], '') as departmentOwned,
      coalesce([Division], '') as departmentManaged,

      coalesce([ExJob_ID], '') as expenseJobId,
      coalesce([ExActv_ID], '') as expenseActivityId,
      coalesce([ExObjCode], '') as expenseObjectCode,
      coalesce([RevJob_ID], '') as revenueJobId,
      coalesce([RevActv_ID], '') as revenueActivityId,
      coalesce([RevObjCode], '') as revenueObjectCode,
      
      [Odom] as odometer,
      [Hours] as jobCostHours,
      [RunHrs] as hourMeter

    FROM [WMITM] WITH (NOLOCK)
    
    where [Type] in ('Equipment')
  `;
    if (filters.equipmentStatuses !== undefined &&
        filters.equipmentStatuses.length > 0) {
        sql += ' and ( 1=0 ';
        for (const [index, equipmentStatus] of filters.equipmentStatuses.entries()) {
            sql += ` or [Status] = @equipmentStatus${index}`;
            request = request.input(`equipmentStatus${index}`, equipmentStatus);
        }
        sql += ')';
    }
    if (filters.notEquipmentStatuses !== undefined &&
        filters.notEquipmentStatuses.length > 0) {
        sql += ' and ( 1=1 ';
        for (const [index, equipmentStatus] of filters.notEquipmentStatuses.entries()) {
            sql += ` and [Status] <> @notEquipmentStatus${index}`;
            request = request.input(`notEquipmentStatus${index}`, equipmentStatus);
        }
        sql += ')';
    }
    if (filters.equipmentIds !== undefined && filters.equipmentIds.length > 0) {
        sql += ' and ( 1=0 ';
        for (const [index, equipmentId] of filters.equipmentIds.entries()) {
            sql += ` or [Item_ID] = @equipmentId${index}`;
            request = request.input(`equipmentId${index}`, equipmentId);
        }
        sql += ')';
    }
    if (filters.notEquipmentIds !== undefined &&
        filters.notEquipmentIds.length > 0) {
        sql += ' and ( 1=1 ';
        for (const [index, equipmentId] of filters.notEquipmentIds.entries()) {
            sql += ` and [Item_ID] <> @notEquipmentId${index}`;
            request = request.input(`notEquipmentId${index}`, equipmentId);
        }
        sql += ')';
    }
    if (filters.equipmentClasses !== undefined &&
        filters.equipmentClasses.length > 0) {
        sql += ' and ( 1=0 ';
        for (const [index, equipmentClass] of filters.equipmentClasses.entries()) {
            sql += ` or [ItemClass] = @equipmentClass${index}`;
            request = request.input(`equipmentClass${index}`, equipmentClass);
        }
        sql += ')';
    }
    if (filters.notEquipmentClasses !== undefined &&
        filters.notEquipmentClasses.length > 0) {
        sql += ' and ( 1=1 ';
        for (const [index, equipmentClass] of filters.notEquipmentClasses.entries()) {
            sql += ` and [ItemClass] <> @notEquipmentClass${index}`;
            request = request.input(`notEquipmentClass${index}`, equipmentClass);
        }
        sql += ')';
    }
    if (filters.departmentsOwned !== undefined &&
        filters.departmentsOwned.length > 0) {
        sql += ' and ( 1=0 ';
        for (const [index, department] of filters.departmentsOwned.entries()) {
            sql += ` or [Dept] = @departmentOwned${index}`;
            request = request.input(`departmentOwned${index}`, department);
        }
        sql += ')';
    }
    if (filters.notDepartmentsOwned !== undefined &&
        filters.notDepartmentsOwned.length > 0) {
        sql += ' and ( 1=1 ';
        for (const [index, department] of filters.notDepartmentsOwned.entries()) {
            sql += ` and [Dept] <> @notDepartmentOwned${index}`;
            request = request.input(`notDepartmentOwned${index}`, department);
        }
        sql += ')';
    }
    const equipmentResult = (await request.query(sql));
    return equipmentResult.recordset;
}
