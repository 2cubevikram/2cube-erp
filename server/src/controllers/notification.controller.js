import notificationModel from "../models/notification.model.js";
import { io } from '../server.js';


/******************************************************************************
 *                              Notification Controller
 ******************************************************************************/
class NotificationController {

    createNotification = async (req, res, next) => {
        const params = {
            application_id: req.body.id.id,
            employee_id: req.body.employee_id,
            type: 'leave',
            message: req.body.message,
        }
        const result = await notificationModel.createNotification(params);
        const data = await notificationModel.findById({application_id: req.body.id.id}, {status: 'null'});
        if (result === 1) {
            io.emit('new_leave_application', {
                id: data.id,
                message: data.message,
                link: '/leave-app'
            });
        }else {
            return res.status(500).send({message: 'Something went wrong while applied leave'});
        }
    }

    getAllNotification = async (req, res, next) => {
        const result = await notificationModel.findAllNotification({'status': 'null'}, {'id': 'DESC'});
        res.status(200).send(result);
    }

    updateNotification = async (req, res, next) => {
        const id = req.body.id;
        const params = {
            status: 'read',
        }
        const result = await notificationModel.updateNotification(params, id);
        // if (result.affectedRows !== 0) {
        //     await this.getAllNotification(req, res);
        // }else {
        //     return res.status(500).send({message: 'Something went wrong while update notification'});
        // }
    }


}


/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new NotificationController;