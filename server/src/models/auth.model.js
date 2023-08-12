import query from '../config/db-connection.js';
import commonModel from './common.model.js';

class AuthModel {
    tableName = `users`;
    holidayTable = `holidays`;

    create = async ({id, first_name, last_name, email, password, role}) => {
        const sql = `INSERT INTO ${this.tableName}
        (id, first_name, last_name, email, password, role)VALUES(?,?,?,?,?,?)`

        const result = await query(sql, [id, first_name, last_name, email, password, role]);
        return result ? result.affectedRows : 0;
    }

    crateHoliday = async ({date, label, post_by}) => {
        const sql = `INSERT INTO ${this.holidayTable}
        (date, label, post_by)VALUES(?,?,?)`

        const result = await query(sql, [date, label, post_by]);
        return result ? result.affectedRows : 0;
    }

    delete = async (id) => {
        return await commonModel.delete(this.holidayTable, id);
    }

    find = async (params = {}, order_by = {}) => {
        return await commonModel.find(this.tableName, params, order_by);
    }

    findHolidays = async (params = {}, order_by = {}) => {
        return await commonModel.find(this.holidayTable, params, order_by);
    }

    findOne = async (params) => {
        return await commonModel.findOne(this.tableName, params);
    }

    update = async (params, id) => {
        return await commonModel.update(this.tableName, params, id);
    }
}

export default new AuthModel;