import query from "../config/db-connection.js";
import commonModel from "./common.model.js";

class LeaveAppModel {
    tableName = `leave_application`;
    create = async ({employee_id, start_date, end_date, leave_type, reason, status = 'Applied'}) => {
        const sql = `INSERT INTO ${this.tableName}(employee_id, start_date, end_date, leave_type, reason,status)VALUES(?,?,?,?,?,?)`;
        const selectSql = `SELECT * FROM ${this.tableName} WHERE id = LAST_INSERT_ID()`;

        const result = await query(sql, [employee_id, start_date, end_date, leave_type, reason, status]);
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

    findAll = async () => {
        return await commonModel.findAll();
    }

    update = async (params, id) => {
        return await commonModel.leave_update(this.tableName, params, id);
    }
}

export default new LeaveAppModel;