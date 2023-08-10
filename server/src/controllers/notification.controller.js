import notificationModel from "../models/notification.model.js";
import { io } from '../server.js';
import LeaveController from "./leave_app_controller.js";
import AuthModel from "../models/auth.model.js";


/******************************************************************************
 *                              Notification Controller
 ******************************************************************************/
class NotificationController {

    createNotification = async (req, res, next) => {
        const id = req.body.employee_id;

        const user = await AuthModel.findOne({id});

        const params = {
            application_id: req.body.id,
            employee_id: req.body.employee_id,
            type: 'leave',
            message: 'Leave Application from ' + user.first_name + ' ' + user.last_name,
        }
        const result = await notificationModel.createNotification(params);
        const data = await notificationModel.findById({application_id: req.body.id, status: 'null'}, {});
        await LeaveController.getLeavesById(req, res);

        if (result === 1) {
            // console.log(result,data)
            io.emit('new_leave_application', {
                id: data.application_id,
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