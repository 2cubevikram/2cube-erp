import query from "../config/db-connection.js";
import commonModel from "./common.model.js";

class LeaveAppModel {
    tableName = `leave_application`;
    create = async ({employee_id, start_date, end_date, leave_type, reason, status = 'Applied'}) => {
        const sql = `INSERT INTO ${this.tableName}
        (employee_id, start_date, end_date, leave_type, reason,status)VALUES(?,?,?,?,?,?)`

        const result = await query(sql, [employee_id, start_date, end_date, leave_type, reason, status]);
        return result ? result.affectedRows : 0;
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