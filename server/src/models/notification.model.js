import query from '../config/db-connection.js';
import commonModel from "./common.model.js";

class notification {
    tableName = 'notifications';

    createNotification = async ({application_id, employee_id, type, message, date}) => {
        const sql = `INSERT INTO ${this.tableName} (application_id,employee_id,type,message,date,status) VALUES (?,?,?,?,?,?)`;
        const result = await query(sql, [application_id, employee_id, type, message, date, 'null']);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    findAllNotification = async (params = {}, order_by = {}) => {
        return await commonModel.find(this.tableName, params, order_by);
    }

    findById = async (params = {}, order_by = {}) => {
        return await commonModel.find(this.tableName, params, order_by)
    }

    updateNotification = async (params, id) => {
        return await commonModel.profile_update(this.tableName, params, id);
    }
}

export default new notification;