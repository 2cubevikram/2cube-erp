import query from '../config/db-connection.js';
import commonModel from "./common.model.js";

class BreakModel {
    tableName = `break_in_out`;

    timestamp = async (id, employee_id, _time, method, status) => {
        return await commonModel.timestamp(this.tableName, id, employee_id, _time, method, status);
    }
    work_hours = async (employeeId, date) => {
        return await commonModel.work_hours(this.tableName, employeeId, date);
    }

    findOne = async (params) => {
        return await commonModel.findOne(this.tableName, params);
    }


}

export default new BreakModel;