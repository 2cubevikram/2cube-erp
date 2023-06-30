import query from '../config/db-connection.js';

class EmployeeModel {
    tableName = `attendance`;
    check_in = async (employee_id) => {
        const sql = `INSERT INTO ${this.tableName}
        (employee_id)VALUES(?)`

        const result = await query(sql, [employee_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    check_out = async (employee_id) => {
        const sql = `UPDATE attendance SET check_out = CURRENT_TIMESTAMP WHERE employee_id = ? AND check_out IS NULL`;

        const result = await query(sql, [employee_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
        // return await commonModel.update(this.tableName, employee_id);

    }

    work_hours = async (employeeId, date) => {
        const startDate = `${date} 00:00:00`;
        const endDate = `${date} 23:59:59`;

        let sql = `SELECT check_in, check_out FROM ${this.tableName} WHERE employee_id = ? AND check_in BETWEEN ? AND ?`;

        return await query(sql, [employeeId, startDate, endDate]);

    }

    calculateDuration = async (checkIn, checkOut) => {
        const sql = 'SELECT TIMEDIFF(?, ?) AS duration';
        const result = await query(sql, [checkOut, checkIn]);
        console.log(result);
        return result[0].duration;
    }

    findOne = async (params) => {
        return await commonModel.findOne(this.tableName, params);
    }

    
}

export default new EmployeeModel;