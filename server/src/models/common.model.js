import query from '../config/db-connection.js';
import utils from '../utils/common.utils.js';

class CommonModel {
    find = async (tableName, params = {}, order_by = {}, selectColumns = '*') => {
        let sql = `SELECT ${selectColumns} FROM ${tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const {columnSet, values} = utils.multipleSearchColumnSet(params)
        sql += ` WHERE ${columnSet}`;
        if (Object.keys(order_by).length) {
            sql += ` ORDER BY ${Object.keys(order_by)[0]} ${Object.values(order_by)[0]}`
        }

        return await query(sql, [...values]);
    }

    findWhere = async (tableName, params = {}, order_by = {}, selectColumns = '*') => {
        let sql = `SELECT ${selectColumns} FROM ${tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        let ids = params.employee_id; // Retrieve IDs if passed as 'employee_id' parameter

        // Check if 'ids' is an array, if not, convert to an array
        if (!Array.isArray(ids)) {
            ids = [ids];
        }

        if (ids.length > 0) {
            const placeholders = ids.map(() => '?').join(', ');
            sql += ` WHERE employee_id IN (${placeholders})`;
        }

        if (Object.keys(order_by).length) {
            sql += ` ORDER BY ${Object.keys(order_by)[0]} ${Object.values(order_by)[0]}`;
        }

        return await query(sql, ids);
    };

    findOne = async (tableName, params, selectColumns = undefined) => {
        const {columnSet, values} = utils.multipleSearchColumnSet(params)

        const sql = `SELECT ${selectColumns == undefined ? '*' : selectColumns} FROM ${tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    profile_update = async (tableName, params, id) => {
        const {columnSet, values} = utils.multipleColumnSet(params)

        const sql = `UPDATE ${tableName} SET ${columnSet} WHERE id = ?`;
        return await query(sql, [...values, id]);
    }

    update = async (tableName, params, id) => {
        const {columnSet, values} = utils.multipleColumnSet(params)

        const sql = `UPDATE ${tableName} SET ${columnSet} WHERE id = ?`;
        await query(sql, [...values, id]);

        const selectSql1 = `SELECT * FROM ${tableName} WHERE id = ?`;
        const selectSql = `SELECT * FROM ${tableName} WHERE employee_id = ? AND id=?`;

        const result1 = await query(selectSql1, [id]);
        const result = await query(selectSql, [result1[0].employee_id, result1[0].id]);

        if (result.length > 0) {
            return result[result.length - 1];
        }
        return null;
    }

    // updateWhere = async (tableName, params, conditionalParams) => {
    //     console.log(params, conditionalParams)
    //     var {columnSet, values} = utils.multipleColumnSet(params);
    //     const conditions = utils.multipleSearchColumnSet(conditionalParams);
    //
    //     const sql = `UPDATE ${tableName} SET ${columnSet} WHERE ${conditions.columnSet}`;
    //
    //     var allValues = conditions.values;
    //     const result = await query(sql, [...values, ...allValues]);
    //
    //     return result;
    // }

    updateWhere = async (tableName, params, conditionalParams) => {
        var { columnSet, values } = utils.multipleColumnSet(params);
        const conditions = utils.multipleSearchColumnSet(conditionalParams);

        const sql = `UPDATE ${tableName} SET ${columnSet} WHERE ${conditions.columnSet}`;

        var allValues = conditions.values;
        const result = await query(sql, [...values, ...allValues]);

        return result;
    }


    timestamp = async (tableName, row_id, employee_id, _time, method, status) => {
        if (method === "ADD") {
            const insertSql = `INSERT INTO ${tableName} (employee_id, _in, status) VALUES (?, ?, ?)`;
            const selectSql = `SELECT * FROM ${tableName} WHERE id = LAST_INSERT_ID()`;

            const insertResult = await query(insertSql, [employee_id, _time, status]);
            const newRowId = insertResult ? insertResult.insertId : 0;

            if (newRowId) {
                const selectResult = await query(selectSql);
                return selectResult[0];
            }

            return null;
        } else {
            const updateSql = `UPDATE ${tableName} SET _out = CURRENT_TIMESTAMP,status = ? WHERE id = ?`;
            const selectSql = `SELECT * FROM ${tableName} WHERE employee_id = ?`;

            const updateResult = await query(updateSql, [status, row_id]);

            if (updateResult.affectedRows > 0) {
                const selectResult = await query(selectSql, [employee_id]);
                return selectResult[selectResult.length - 1];
            }
            return null;
        }
    }

    work_hours = async (tableName, employeeId, date) => {
        const startDate = `${date} 00:00:00`;
        const endDate = `${date} 23:59:59`;

        // let sql = `SELECT id,_in, _out, status FROM ${tableName} WHERE employee_id = ? AND in BETWEEN ? AND ?`;
        let sql = `SELECT id,employee_id,_in, _out, status FROM ${tableName} WHERE employee_id = ? AND \`_in\` BETWEEN ? AND ?`;

        return await query(sql, [employeeId, startDate, endDate]);
    }

    find_day_status = async (tableName, employee_id, date) => {
        const placeholders = employee_id.map(() => '?').join(', ');
        let sql = `SELECT employee_id, status FROM ${tableName} WHERE employee_id IN (${placeholders}) AND DATE(_in) = ? ORDER BY employee_id, _in DESC`;

        const sqlParams = [...employee_id, date];
        return await query(sql, sqlParams);
    }

    findAllLeaves = async (tableName, params, order_by) => {
        let sql = `SELECT leave_application.*, users.first_name, users.last_name FROM leave_application JOIN users ON leave_application.employee_id = users.id ORDER BY leave_application.id DESC`;

        return await query(sql);
    }

    leave_update = async (tableName, params, id) => {
        const {columnSet, values} = utils.multipleColumnSet(params)

        const sql = `UPDATE ${tableName} SET ${columnSet} WHERE id = ?`;
        const result = await query(sql, [...values, id]);

        return result;
    }

    getBirthday = async (userTable) => {
        // const sql = `SELECT id, first_name, last_name, profile, CONVERT_TZ(birth_date, '+00:00', @@session.time_zone) AS birth_date FROM ${userTable} WHERE
        //                     (
        //                       DAY(birth_date) >= DAY(CURRENT_DATE())
        //                       AND MONTH(birth_date) = MONTH(CURRENT_DATE())
        //                       AND status = 'Active'
        //                     ) -- Upcoming birthdays in the current month
        //                     OR
        //                     (
        //                       DAY(birth_date) <= DAY(CURRENT_DATE())
        //                       AND MONTH(birth_date) = MONTH(DATE_ADD(CURRENT_DATE(), INTERVAL 1 MONTH))
        //                       AND status = 'Active'
        //                     ) ORDER BY birth_date DESC  -- Upcoming birthdays in the next month (if today is the last day of the current month)
        //                 `;
        const sql = `SELECT id, first_name, last_name, profile,birth_date FROM ${userTable} WHERE status = 'Active'`;
        return await query(sql);
    }

    delete = async (tableName, id) => {
        const sql = `DELETE FROM ${tableName} WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    findAll = async (tableName) => {
        const sql = `SELECT * FROM ${tableName}`;
        return await query(sql);
    }


}

export default new CommonModel;