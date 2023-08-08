import query from '../config/db-connection.js';
import commonModel from "./common.model.js";

class notification {
    tableName = 'notifications';

    createNotification = async ({employee_id, type, message}) => {
        const sql = `INSERT INTO ${this.tableName} (employee_id,type,message) VALUES (?,?,?)`;
        const result = await query(sql, [employee_id, type, message]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    findAllNotification = async (params = {}, order_by = {}) => {
        console.log(params, order_by)
        return await commonModel.find(this.tableName, params, order_by);
    }
}

export default new notification;