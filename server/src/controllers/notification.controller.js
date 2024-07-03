import notificationModel from "../models/notification.model.js";
// import {io} from '../server.js';
import LeaveController from "./leave_app_controller.js";
import AuthModel from "../models/auth.model.js";
import moment from "moment";


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
            message: 'from ' + user.first_name + ' ' + user.last_name,
            date: moment().format('YYYY-MM-DD'),
        }
        const result = await notificationModel.createNotification(params);
        await notificationModel.findById({application_id: req.body.id, status: 'null'}, {});

        if (result === 1) {
            // io.emit('new_leave_application', {
            //     id: params.application_id,
            //     message: params.message,
            //     link: '/leave-app'
            // });
            await LeaveController.getLeavesById(req, res);
        } else {
            return res.status(500).send({message: 'Something went wrong while applied leave'});
        }
    }

    getAllNotification = async (req, res, next) => {
        const params = {
            // status: 'null',
            date: moment().format('YYYY-MM-DD')
        }
        const result = await notificationModel.findAllNotification(params, {'id': 'DESC'});
        res.status(200).send(result);
    }

    updateNotification = async (req, res, next) => {
        const id = req.body.id;
        const userId = req.currentUser.id;
        const params = {
            status: 'read',
        }
        const user = await AuthModel.findOne({id: userId});
        const result = await notificationModel.updateNotification(params, id);

        if (result.affectedRows !== 0) {
            io.emit('new_leave_application', {
                id: req.body.id,
                message: req.body.status + ' from ' + user.first_name + ' ' + user.last_name,
                link: '/leave-app'
            });
        }
    }

}


/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new NotificationController;