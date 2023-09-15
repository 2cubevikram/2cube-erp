import commonModel from "./common.model.js";

class BreakModel {
    tableName = `break_in_out`;

    timestamp = async (row_id, employee_id, _time, method, status, updated_by) => {
        return await commonModel.timestamp(this.tableName, row_id, employee_id, _time, method, status, updated_by);
    }
    work_hours = async (employeeId, date) => {
        return await commonModel.work_hours(this.tableName, employeeId, date);
    }

    findOne = async (params) => {
        return await commonModel.findOne(this.tableName, params);
    }
    breakTimeUpdate = async (params, id) => {
        return await commonModel.update(this.tableName, params, id);
    }
}

export default new BreakModel;