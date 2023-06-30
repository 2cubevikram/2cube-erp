import query from '../config/db-connection.js';
import utils from '../utils/common.utils.js';

class CommonModel {
    find = async (tableName, params = {}, order_by = {}, selectColumns = '*') => {
        console.log(tableName, params, order_by, selectColumns);
        let sql = `SELECT ${selectColumns} FROM ${tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = utils.multipleSearchColumnSet(params)
        sql += ` WHERE ${columnSet}`;
        if (Object.keys(order_by).length) {
            sql += ` ORDER BY ${Object.keys(order_by)[0]} ${Object.values(order_by)[0]}`
        }
        return await query(sql, [...values]);
    }

    findOne = async (tableName, params, selectColumns = undefined) => {
        const { columnSet, values } = utils.multipleSearchColumnSet(params)

        const sql = `SELECT ${selectColumns == undefined ? '*' : selectColumns} FROM ${tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    update = async (tableName, params, id) => {
        const { columnSet, values } = utils.multipleColumnSet(params)

        const sql = `UPDATE ${tableName} SET ${columnSet} WHERE id = ?`;
        const result = await query(sql, [...values, id]);

        return result;
    }
}

export default new CommonModel;