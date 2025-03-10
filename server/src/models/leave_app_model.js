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

    findAllLeaves = async (params, order_by) => {
        return await commonModel.findAllLeaves(params, order_by);
    }

    update = async (params, id) => {
        return await commonModel.leave_update(this.tableName, params, id);
    }

    // findWhere = async ({ employee_id, start_date, status }) => {
    //     const employee_ids = Array.isArray(employee_id) ? employee_id : [employee_id];
    //     const placeholders = employee_ids.map(() => '?').join(', '); // Create placeholders based on the number of IDs
    //     const sql = `SELECT * FROM ${this.tableName} WHERE employee_id IN (${placeholders}) AND start_date LIKE ? AND status = ?`;
    //
    //     // Construct the values array, first the IDs, then the other values
    //     const values = [...employee_ids, `${start_date}%`, status];
    //
    //     try {
    //         return await query(sql, values);
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    findWhere = async ({employee_id, start_date, status, leave_type}) => {
        const employee_ids = Array.isArray(employee_id) ? employee_id : [employee_id];
        const placeholders = employee_ids.map(() => '?').join(', '); // Create placeholders based on the number of IDs

        // Construct the SQL query and values array based on whether status is set
        let sql;
        let values;

        if (status !== undefined && status !== null) {
            sql = `SELECT * FROM ${this.tableName} WHERE employee_id IN (${placeholders}) AND start_date LIKE ? AND status = ? ORDER BY id DESC`;
            values = [...employee_ids, `${start_date}%`, status];
        } else {
            sql = `SELECT * FROM ${this.tableName} WHERE employee_id IN (${placeholders}) AND start_date LIKE ? ORDER BY id DESC`;
            values = [...employee_ids, `${start_date}%`];
        }

        try {
            return await query(sql, values);
        } catch (error) {
            throw error;
        }
    };

    getYearlyLiveById = async (start_date, end_date, id) => {
        // let sql = `SELECT * FROM ${this.tableName} WHERE start_date >= ? AND start_date < ? AND employee_id = ? AND status = "Approved" `;
        let sql = `SELECT * FROM ${this.tableName} WHERE start_date >= ? AND start_date < ? AND employee_id = ? ORDER BY id DESC`;
        return await query(sql, [start_date, end_date, id]);
    }

    delete = async (id) => {
        return await commonModel.delete(this.tableName,id);
        // return await commonModel.delete(start_date, end_date, id);
    }
}

export default new LeaveAppModel;