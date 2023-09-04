import query from "../config/db-connection.js";
import commonModel from "./common.model.js";

class LeaveAppModel {
    tableName = `leave_application`;
    create = async ({employee_id, start_date, end_date, days, leave_type, reason, status = 'Applied'}) => {
        const sql = `INSERT INTO ${this.tableName}(employee_id, start_date, end_date,days, leave_type, reason,status)VALUES(?,?,?,?,?,?,?)`;
        const selectSql = `SELECT * FROM ${this.tableName} WHERE id = LAST_INSERT_ID()`;

        const result = await query(sql, [employee_id, start_date, end_date, days, leave_type, reason, status]);
        const newRowId = result ? result.affectedRows : 0;

        if (newRowId) {
            const selectResult = await query(selectSql);
            return selectResult[0];
        }
        return null;
    }

    findById = async (params = {}, order_by = {}) => {
        return await commonModel.find(this.tableName, params, order_by)
    }

    find = async (params = {}, order_by = {}) => {
        return await commonModel.find(this.tableName, params, order_by);
    }

    findAllLeaves = async () => {
        return await commonModel.findAllLeaves();
    }

    update = async (params, id) => {
        return await commonModel.leave_update(this.tableName, params, id);
    }

    findWhere = async ({ employee_id, start_date, status }) => {
        const employee_ids = Array.isArray(employee_id) ? employee_id : [employee_id];
        const placeholders = employee_ids.map(() => '?').join(', '); // Create placeholders based on the number of IDs
        const sql = `SELECT * FROM ${this.tableName} WHERE employee_id IN (${placeholders}) AND start_date LIKE ? AND status = ?`;

        // Construct the values array, first the IDs, then the other values
        const values = [...employee_ids, `${start_date}%`, status];

        try {
            return await query(sql, values);
        } catch (error) {
            throw error;
        }
    };


}

export default new LeaveAppModel;