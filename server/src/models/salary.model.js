import query from '../config/db-connection.js';
import CommonModel from "./common.model.js";
import commonModel from "./common.model.js";


class SalaryModel {
    salaryTable = 'salary';

    // salary_status = async ({employee_ids, currentMonth, currentYear}) => {
    //     const placeholders = employee_ids.map(() => '?').join(', ');
    //     let sql = `SELECT id,employee_id,amount,extra_allowance, salary_date, status FROM ${this.salaryTable} WHERE employee_id IN (${placeholders}) AND MONTH(salary_date) = ? AND YEAR(salary_date) = ?`;
    //     const values = [...employee_ids, currentMonth + 1, currentYear];
    //
    //     try {
    //         return await query(sql, values);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    update = async (params, id) => {
        return await CommonModel.profile_update(this.salaryTable, params, id)
    }

    creditForAll = async ({employee_name, employee_id, total_leave, present_day, amount, salary_date, status}) => {

        const sql = `INSERT INTO ${this.salaryTable} (employee_name, employee_id, total_leave, present_day,amount,salary_date,status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        try {
            const result = await query(sql, [employee_name, employee_id, total_leave, present_day, amount, salary_date, status]);
            return result ? result.affectedRows : 0;
        } catch (error) {
            console.error(error);
            return 0;
        }
    };

    creditManuallyForAll = async ({
                                      employee_name,
                                      employee_id,
                                      total_leave,
                                      present_day,
                                      amount,
                                      extra_allowance,
                                      salary_date,
                                      status
                                  }) => {

        const sql = `INSERT INTO ${this.salaryTable} (employee_name, employee_id, total_leave, present_day,extra_allowance,amount,salary_date,status) VALUES (?,?, ?, ?, ?, ?, ?, ?)`;
        try {
            const result = await query(sql, [employee_name, employee_id, total_leave, present_day, extra_allowance, amount, salary_date, status]);
            return result ? result.affectedRows : 0;
        } catch (error) {
            console.error(error);
            return 0;
        }
    };

    findAll = async ({currentMonth, currentYear}) => {
        let sql = `SELECT * FROM ${this.salaryTable} WHERE MONTH(salary_date) = ? AND YEAR(salary_date) = ?`;
        const values = [currentMonth + 1, currentYear];
        // console.log(values)

        try {
            return await query(sql, values);
        } catch (error) {
            throw error;
        }
    }

    updateWhere = async (params, conditionalParams) => {
        return await commonModel.updateWhere(this.salaryTable, params, conditionalParams);
    }

    delete = async (id) => {
        return await commonModel.delete(this.salaryTable, id);
    }

}

export default new SalaryModel;