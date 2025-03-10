// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @cspell/spellchecker */
import { connect } from '@cityssm/mssql-multi-pool';
import Debug from 'debug';
import { lockTable } from '../../helpers/lockTable.js';
import { getLastSystemId, incrementLastSystemId } from '../systemId.js';
const debug = Debug('worktech-api:addResourceItem');
/**
 * Creates a new resource item.
 * @param mssqlConfig - SQL Server configuration.
 * @param resourceItem - The resource item fields.
 * @returns The system id for the new resource item.
 */
export async function addResourceItem(mssqlConfig, resourceItem) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (resourceItem.itemId.length > 15) {
        throw new Error('itemId exceeds 15 characters');
    }
    const pool = await connect(mssqlConfig);
    const transaction = pool.transaction();
    try {
        debug('Starting transaction');
        await transaction.begin();
        debug('Lock tables');
        await lockTable(transaction, 'WMITM');
        debug('Getting last system id');
        const lastSystemId = await getLastSystemId(transaction);
        if (lastSystemId === undefined) {
            throw new Error('Last used system id is unavailable.');
        }
        const itemSystemId = (Number.parseInt(lastSystemId, 10) + 1).toString();
        debug(`Adding item ${itemSystemId} (${resourceItem.itemId})`);
        await transaction
            .request()
            .input('itemSystemId', itemSystemId)
            .input('itemId', resourceItem.itemId)
            .input('itemDescription', resourceItem.itemDescription ?? '')
            .input('externalItemId', resourceItem.externalItemId ?? '')
            .input('itemClass', resourceItem.itemClass)
            .input('itemType', resourceItem.itemType)
            .input('itemStatus', resourceItem.itemStatus ?? 'EstOnly')
            .input('department', resourceItem.department ?? '')
            .input('division', resourceItem.division ?? '')
            .input('company', resourceItem.company ?? '')
            .input('comments', resourceItem.comments ?? '')
            .input('stock', resourceItem.stock ?? 0)
            .input('unit', resourceItem.unit)
            .input('unitCost', resourceItem.unitCost ?? 0)
            .input('quantityOnHand', resourceItem.quantityOnHand ?? 0)
            .input('itemBrand', resourceItem.itemBrand)
            .input('location', resourceItem.location ?? '')
            .input('odometer', resourceItem.odometer ?? 0)
            .input('plate', resourceItem.plate ?? '')
            .input('serialNumber', resourceItem.serialNumber ?? '')
            .input('itemModel', resourceItem.itemModel)
            .input('itemModelYear', resourceItem.itemModelYear ?? new Date().getFullYear()).query(`INSERT INTO WMITM (
        ITMSYSID, ITEM_ID, "DESC", RESLIST, EXTITEM_ID,
        ITEMCLASS, CLASSITEM, TYPE, STATUS,
        DEPT, DIVISION, COMPANY, FLTYPE, COMMENTS,
        EXJOB_ID, EXJOBSYSID, EXACTV_ID, EXOBJCODE, EXOCSYSID,
        REVJOBSYSID, REVJOB_ID, REVACTV_ID, REVOBJCODE, REVOCSYSID,
        VEHSYS, STOCK, UNITS, UNITCOST, UNITS2, UNITS3, UNITS4,
        QTYHAND, MINLEVEL, ORDERQTY,
        ORDVEND_ID, VEND_ID, VENDSYSID,
        IREMPURGE, VREMPURGED, VARIANCE, "VALUE",
        VARWARN, VARDOWN, VARUP,
        TAXCODE,
        PAYGROUP, PGSYSID,
        INSTALLVENDOR, DATEINST,
        MEAS_UNITS, SHAPE, LENGTH, DIAMETER, HEIGHT, WIDTH,
        CAPACITY, TANK, QTYHANDCHECK, TANKUSAGECHOICE, CAPACITYFLAG, BRAND,
        DATEIN, CREW, HOURS, HRCOST, INITVAL,
        LOCATION, MODEL,
        ODOM, RUNHRS, ORGODOM, ORGHOURS, PLATE, SERIAL,
        PURCHDATE, PURCHFRM, REPLCOST, REPLYR, RESVAL, REVTD,
        TOTCOST, PURCHPRICE, USELIFE, "YEAR", TRADEIN,
        ODOMUPDATECHECK, HRMETERUPDATECHECK,
        CARDNUMBER,
        ADDRESS, ADDRESS2, ADDRESS3, ADDRESS4,
        BIRTHD, EMAIL,
        PHONE1, PHONE2, PHONE3, PHONEDESC1, PHONEDESC2, PHONEDESC3,
        "POSITION",
        HRSPERPP, PAYOT, BANKOT,
        EBCHOICE, EBPERCENT, EBDOBJCODE, EBDOCSYSID, EBRJOBSYSID, EBRJOB_ID, EBROBJCODE, EBROCSYSID, EBRACTV_ID,
        DEFVEH_ID, EBGROUP, STOCKPILE, PROCESSCOST, ROYALTYCOST, ROYALTYTO, HAULER, DAYS2REORDER,
        FUELCONRATE, FUELOVERLAST, OILCONRATE, OILOVERLAST,
        PAYMETHOD, FIXEDRECRATE, ESTRATE, ESTITEM,
        CVOR, PATROL, UNITP, HASODOMETER, CHARGEOUT, DAILYHRS,
        REVCAPJOB_ID, REVCAPJOBSYSID, REVCAPACTV_ID, REVCAPOBJCODE, REVCAPOCSYSID, OTCHECKTYPE,
        EXTITMSYSID, DEFTC_ID, EMPLSTATUS, EXTARITEM_ID,
        EXTRA1, EXTRA2, DATE1, DATE2, DATE3, PIL,
        ASSET_ID, ASSETSYSID, EXTRAD1, EXTRAC1, STK_MKUP, ORGPOS_ID,
        FEATURE_ID, ACISYSID, SYSTEM, MOD_USER, ROOM_ID, PITEM_ID,
        MEASURE1, MEASURE2, MEASURE3, MEASURE4,
        EXTRAC2, PORT, DIALS, CELLPHONE, FIR_ID, EXTRA3) 
      VALUES (
        @itemSystemId, @itemId, @itemDescription, 1, @externalItemId,
        @itemClass, 0, @itemType, @itemStatus,
        @department, @division, @company, NULL, @comments,
        NULL, 0, NULL, '', 0,
        0, '', NULL, '', 0,
        NULL, @stock, @unit, @unitCost, NULL, '', '',
        @quantityOnHand, 0.00, 0.00,
        NULL, NULL, 0,
        0, 0, 0.00, 0.00,
        0, 0.00, 0.00,
        NULL,
        NULL, 0,
        NULL, NULL,
        'Metres', 'Rectangle', 0.00, 0.00, 0.00, 0.00,
        0.00, 0, 0, 'Vehicle ID', 0, @itemBrand,
        NULL, NULL, 0.0, 0.00, 0.00,
        @location, @itemModel,
        @odometer, 0.00, 0.0, 0.0, @plate, @serialNumber,
        NULL, NULL, 0.00, 0, 0.00, 0.00,
        0.00, 0.00, 0, @itemModelYear, 0.00,
        0, 0,
        NULL,
        NULL, NULL, NULL, NULL,
        NULL, NULL,
        NULL, NULL, NULL, NULL, NULL, NULL,
        NULL,
        80.00, 0, 0,
        0, 0.000, NULL, 0, 0, NULL, NULL, 0, NULL,
        NULL, NULL, 0, 0.0000, 0.0000, NULL, 0, 0,
        0.00, 0, 0.00, 0,
        'Hourly', 0.00, 0.00, 0,
        0, '', 0.00, 0, 0, 0.00,
        NULL, 0, NULL, NULL, 0, NULL,
        0, NULL, NULL, NULL,
        NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, 0, 0.00, 0, 0.00, NULL,
        NULL, 0, NULL, '', NULL, NULL,
        0.00, 0.00, 0.00, 0.00,
        0, 0, 0, NULL, NULL, NULL)`);
        debug(`Added item ${itemSystemId} (${resourceItem.itemId})`);
        await incrementLastSystemId(transaction);
        await transaction.commit();
        return itemSystemId;
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
}
