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

    findOne = async (tableName, params, selectColumns = undefined) => {
        const {columnSet, values} = utils.multipleSearchColumnSet(params)

        const sql = `SELECT ${selectColumns == undefined ? '*' : selectColumns} FROM ${tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    update = async (tableName, params, id) => {
        const {columnSet, values} = utils.multipleColumnSet(params)

        const sql = `UPDATE ${tableName} SET ${columnSet} WHERE id = ?`;
        const result = await query(sql, [...values, id]);

        return result;
    }

    timestamp = async (tableName, id, employee_id, method, status) => {
        if (method === "ADD") {
            const insertSql = `INSERT INTO ${tableName} (employee_id, status) VALUES (?, ?)`;
            const selectSql = `SELECT * FROM ${tableName} WHERE id = LAST_INSERT_ID()`;

            const insertResult = await query(insertSql, [employee_id, status]);
            const newRowId = insertResult ? insertResult.insertId : 0;

            if (newRowId) {
                const selectResult = await query(selectSql);
                return selectResult[0];
            }

            return null;
        } else {
            const updateSql = `UPDATE ${tableName} SET _out = CURRENT_TIMESTAMP,status = ? WHERE id = ?`;
            const selectSql = `SELECT * FROM ${tableName} WHERE employee_id = ?`;

            const updateResult = await query(updateSql, [status, id]);

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
        let sql = `SELECT id,_in, _out, status FROM ${tableName} WHERE employee_id = ? AND \`_in\` BETWEEN ? AND ?`;

        return await query(sql, [employeeId, startDate, endDate]);
    }

}

export default new CommonModel;