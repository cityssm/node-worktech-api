import { connect } from '@cityssm/mssql-multi-pool';
/**
 * Retrieves employees.
 * @param mssqlConfig - SQL Server configuration
 * @param filters - Filters to apply to the employee query.
 * @returns The employees.
 */
// eslint-disable-next-line complexity
export async function getEmployees(mssqlConfig, filters = {}) {
    const pool = await connect(mssqlConfig);
    let request = pool.request();
    let sql = /* sql */ `
    SELECT
      ITM.ITMSYSID AS itemSystemId,
      ITM.ITEM_ID AS employeeNumber,
      ITM."DESC" AS employeeName,
      ITM.ITEMCLASS AS employeeClass,
      ITM.STATUS AS employeeStatus,
      ITM.DEPT AS department,
      ITM.DATEIN AS startDate,
      ITM.ADDRESS AS address1,
      ITM.ADDRESS2 AS address2,
      ITM.ADDRESS3 AS address3,
      ITM.ADDRESS4 AS address4,
      ITM.BIRTHD AS birthDate,
      coalesce(ITM.PHONE1, '') AS phoneNumber1,
      coalesce(ITM.PHONEDESC1, '') AS phoneNumberType1,
      coalesce(ITM.EMAIL, '') AS emailAddress,
      coalesce(ITM."POSITION", '') AS positionId,
      ITM.HRSPERPP AS hoursPerPayPeriod,
      cast(ITM.PAYOT AS BIT) AS payOvertime,
      cast(ITM.BANKOT AS BIT) AS bankOvertime,
      coalesce(ITM.DEFVEH_ID, '') AS defaultEquipmentId,
      ITM.PATROL AS patrol
    FROM
      dbo.WMITM ITM
    WITH
      (NOLOCK)
    WHERE
      (
        TYPE = 'Employee'
        AND Status <> 'EstOnly'
      )
  `;
    if (filters.employeeIsActive !== undefined) {
        sql += filters.employeeIsActive
            ? ` AND ITM.STATUS = 'Active' `
            : ` AND ITM.STATUS <> 'Active' `;
    }
    if (filters.departments !== undefined && filters.departments.length > 0) {
        sql += ' AND ( 1=0 ';
        for (const [index, department] of filters.departments.entries()) {
            sql += ` OR ITM.DEPT = @department${index} `;
            request = request.input(`department${index}`, department);
        }
        sql += ' ) ';
    }
    if (filters.notDepartments !== undefined &&
        filters.notDepartments.length > 0) {
        sql += ' AND ( 1=1 ';
        for (const [index, department] of filters.notDepartments.entries()) {
            sql += ` AND ITM.DEPT <> @notDepartment${index} `;
            request = request.input(`notDepartment${index}`, department);
        }
        sql += ' ) ';
    }
    if (filters.employeeNumbers !== undefined &&
        filters.employeeNumbers.length > 0) {
        sql += ' AND ( 1=0 ';
        for (const [index, employeeNumber] of filters.employeeNumbers.entries()) {
            sql += ` OR ITM.ITEM_ID = @employeeNumber${index} `;
            request = request.input(`employeeNumber${index}`, employeeNumber);
        }
        sql += ' ) ';
    }
    if (filters.notEmployeeNumbers !== undefined &&
        filters.notEmployeeNumbers.length > 0) {
        sql += ' AND ( 1=1 ';
        for (const [index, employeeNumber] of filters.notEmployeeNumbers.entries()) {
            sql += ` AND ITM.ITEM_ID <> @notEmployeeNumber${index} `;
            request = request.input(`notEmployeeNumber${index}`, employeeNumber);
        }
        sql += ' ) ';
    }
    if (filters.positionIds !== undefined && filters.positionIds.length > 0) {
        sql += ' AND ( 1=0 ';
        for (const [index, positionId] of filters.positionIds.entries()) {
            sql += ` OR ITM.POSITION = @positionId${index} `;
            request = request.input(`positionId${index}`, positionId);
        }
        sql += ' ) ';
    }
    if (filters.notPositionIds !== undefined &&
        filters.notPositionIds.length > 0) {
        sql += ' AND ( 1=1 ';
        for (const [index, positionId] of filters.notPositionIds.entries()) {
            sql += ` AND ITM.POSITION <> @notPositionId${index} `;
            request = request.input(`notPositionId${index}`, positionId);
        }
        sql += ' ) ';
    }
    const result = (await request.query(sql));
    return result.recordset;
}
