import query from '../config/db-connection.js';
import commonModel from "./common.model.js";

class EmployeeModel {
    tableName = `attendance`;
    breakTable = `break_in_out`;

    timestamp = async (id, employee_id, _time, method, status) => {
        return await commonModel.timestamp(this.tableName, id, employee_id, _time, method, status);
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


}

export default new EmployeeModel;