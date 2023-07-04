import query from '../config/db-connection.js';

class EmployeeModel {
    tableName = `attendance`;
    check_in = async (employee_id) => {
        const sql = `INSERT INTO ${this.tableName}
        (employee_id,status)VALUES(?,?)`

        const result = await query(sql, [employee_id, 'checkIn']);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    check_out = async (employee_id) => {
        const sql = `UPDATE attendance SET check_out = CURRENT_TIMESTAMP,status = 'checkOut' WHERE employee_id = ? AND check_out IS NULL`;

        const result = await query(sql, [employee_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
        // return await commonModel.update(this.tableName, employee_id);

    }

    work_hours = async (employeeId, date) => {
        const startDate = `${date} 00:00:00`;
        const endDate = `${date} 23:59:59`;

        let sql = `SELECT check_in, check_out, status FROM ${this.tableName} WHERE employee_id = ? AND check_in BETWEEN ? AND ?`;

        return await query(sql, [employeeId, startDate, endDate]);

    }

    work_hours_all = async (employeeId, date) => {
        const startDate = `${date} 00:00:00`;
        const endDate = `${date} 23:59:59`;

        let sql = `SELECT check_in, check_out, status FROM ${this.tableName} WHERE employee_id = ? AND check_in BETWEEN ? AND ?`;

        return await query(sql, [employeeId, startDate, endDate]);
    };

    calculateDuration = async (checkIn, checkOut) => {
        const sql = 'SELECT TIMEDIFF(?, ?) AS duration';
        const result = await query(sql, [checkOut, checkIn]);
        return result[0].duration;
    }

    findOne = async (params) => {
        return await commonModel.findOne(this.tableName, params);
    }

    checkInStatus = async () => {

    }


}

export default new EmployeeModel;