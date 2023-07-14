import query from '../config/db-connection.js';
import commonModel from './common.model.js';

class AuthModel {
    tableName = `users`;
    attendance_tableName = `testing_table`;

    create = async ({id, first_name, last_name, email, password, role}) => {
        const sql = `INSERT INTO ${this.tableName}
        (id, first_name, last_name, email, password, role)VALUES(?,?,?,?,?,?)`

        const result = await query(sql, [id, first_name, last_name, email, password, role]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    find = async (params = {}, order_by = {}) => {
        return await commonModel.find(this.tableName, params, order_by);
    }

    findOne = async (params) => {
        return await commonModel.findOne(this.tableName, params);
    }

    update = async (params, id) => {
        return await commonModel.update(this.tableName, params, id);
    }

    checkTimeUpdate = async (employee_id, _in, status, method, id) => {
        return await commonModel.checkTimeUpdate(this.attendance_tableName, employee_id, _in, status, method, id);
    }
}

export default new AuthModel;