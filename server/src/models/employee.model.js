import commonModel from "./common.model.js";
import query from '../config/db-connection.js';

class EmployeeModel {
    tableName = `attendance`;
    breakTable = `break_in_out`;
    userTable = `users`;
    IncrementTable = `increment`;

    timestamp = async (row_id, employee_id, _time, method, status, updated_by) => {
        return await commonModel.timestamp(this.tableName, row_id, employee_id, _time, method, status, updated_by);
    }

    work_hours = async (employeeId, date) => {
        return await commonModel.work_hours(this.tableName, employeeId, date);
    }

    check_work_hours = async (employeeId, date) => {
        let check = await commonModel.work_hours(this.tableName, employeeId, date);
        let breakin = [];
        if (check.length > 0) {
            check = check[check.length - 1];
            breakin = await commonModel.work_hours(this.breakTable, employeeId, date);
        } else {
            check = [];
        }
        return {
            "check": check,
            "breakin": breakin
        };
    }

    calculateDuration = async (checkIn, checkOut) => {
        // const sql = 'SELECT TIMEDIFF(?, ?) AS duration';
        // const result = await query(sql, [checkOut, checkIn]);
        // return result[0].duration;

        const durationInMillis = checkOut.getTime() - checkIn.getTime();
        const durationInHours = durationInMillis / (1000 * 60 * 60);
        return durationInHours.toString();
    }

    findOne = async (params) => {
        return await commonModel.findOne(this.tableName, params);
    }

    checkTimeUpdate = async (params, id) => {
        // console.log(params, id)
        return await commonModel.update(this.tableName, params, id);
    }

    profile_update = async (params, id) => {
        return await commonModel.profile_update(this.userTable, params, id);
    }

    find_day_attendance_status = async (employee_ids, date) => {
        return await commonModel.find_day_status(this.tableName, employee_ids, date);
    }

    find_day_break_status = async (employee_ids, date) => {
        return await commonModel.find_day_status(this.breakTable, employee_ids, date);
    }

    getBirthday = async () => {
        return await commonModel.getBirthday(this.userTable);
    }

    find = async (params = {}) => {
        return await commonModel.find(this.tableName, params);
    }

    delete = async (params) => {
        return await commonModel.delete(this.breakTable, params);
    }

    addIncrement = async ({employee_id, increment_date, amount, updated_by}) => {
        const sql = `INSERT INTO ${this.IncrementTable} (employee_id, increment_date,amount, updated_by) VALUES (?,?, ?, ?)`;
        const result = await query(sql, [employee_id, increment_date, amount, updated_by]);
        return result ? result.affectedRows : 0;

    }

    getIncrementById = async (params = {}) => {
        return await commonModel.findWhere(this.IncrementTable, params);
    };


}

export default new EmployeeModel;