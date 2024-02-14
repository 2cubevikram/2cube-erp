import query from "../config/db-connection.js";


class CommonReportGenerateModel {

    work_hours = async (tableName, employeeId, date) => {
        // const startDate = `${date} 00:00:00`;
        // const endDate = `${date} 23:59:59`;
        //
        // // let sql = `SELECT id,_in, _out, status FROM ${tableName} WHERE employee_id = ? AND in BETWEEN ? AND ?`;
        // let sql = `SELECT id,employee_id,_in, _out, status FROM ${this.tableName} WHERE employee_id = ? AND \`_in\` BETWEEN ? AND ?`;
        //
        // return await query(sql, [employeeId, startDate, endDate]);

        const [year, month] = date.split('-');

        // Calculate the start and end dates for the specified month
        const startDate = `${year}-${month}-01 00:00:00`;
        const nextMonth = month === '12' ? '01' : (parseInt(month) + 1).toString().padStart(2, '0');
        const nextYear = month === '12' ? (parseInt(year) + 1).toString() : year;
        const endDate = `${nextYear}-${nextMonth}-01 00:00:00`;

        // Use the BETWEEN clause to filter data for the specified month
        let sql = `SELECT id, employee_id, _in, _out, status FROM ${tableName} WHERE employee_id = ? AND \`_in\` BETWEEN ? AND ?`;

        return await query(sql, [employeeId, startDate, endDate]);
    }

    checkTime = async (tableName, employeeId, startTime, endTime) => {
        const [startYear, startMonth] = startTime.split('-');
        const [endYear, endMonth] = endTime.split('-');
    
        let sql = `SELECT id, employee_id, _in, _out, status 
                   FROM ${tableName} 
                   WHERE employee_id = ? 
                   AND YEAR(_in) >= ? AND MONTH(_in) >= ? 
                   AND YEAR(_in) <= ? AND MONTH(_in) <= ?`;
        
        return await query(sql, [employeeId, startYear, startMonth, endYear, endMonth]);
    }    

}

export default new CommonReportGenerateModel();