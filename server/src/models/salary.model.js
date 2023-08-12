import query from '../config/db-connection.js';
import CommonModel from "./common.model.js";


class SalaryModel {
    userTable = 'users';
    salaryTable = 'salary';
    creditSalary = async ({employee_id, amount, status}) => {
        const sql = `INSERT INTO ${this.salaryTable}(employee_id,amount,status)VALUES(?,?,?)`;

        const result = await query(sql, [employee_id, amount, status]);
        return result ? result.affectedRows : 0;
    };

    salary_status = async ({currentMonth, currentYear}) => {
        const sql = `SELECT u.first_name, u.last_name, u.join_date, s.* FROM ${this.salaryTable} s INNER JOIN ${this.userTable} u ON s.employee_id = u.id WHERE u.status = 'Active' AND MONTH(s.salary_date) = ? AND YEAR(s.salary_date) = ?`;
        return await query(sql, [currentMonth, currentYear]);
    }
}

export default new SalaryModel;