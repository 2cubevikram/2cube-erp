import LeaveAppModel from "../models/leave_app_model.js";
import AuthModel from "../models/auth.model.js";
import { io } from '../server.js';
import notificationController from "./notification.controller.js";


/******************************************************************************
 *                              Leave Application Controller
 ******************************************************************************/

class LeaveAppController {
    create = async (req, res, next) => {
        req.body.employee_id = req.currentUser.id;
        const id = req.body.employee_id;

        const user = await AuthModel.findOne({id});
        // console.log(user)
        const result = await LeaveAppModel.create(req.body);
        if (result === 1) {
            await this.getLeavesById(req, res)

            const result = await LeaveAppModel.findById({employee_id: req.currentUser.id}, {})
            req.body = {
                id: result[result.length - 1],
                employee_id: req.body.employee_id,
                type: 'leave',
                message: 'Leave Application from ' + user.first_name + ' ' + user.last_name,
            }
            await notificationController.createNotification(req, res);
        }else {
            return res.status(500).send({message: 'Something went wrong while applied leave'});
        }
    };

    getAllLeaves = async (req, res, next) => {
        const result = await LeaveAppModel.findAll();
        res.status(200).send(result);
    };

    getLeavesById = async (req, res, next) => {
        const result = await LeaveAppModel.findById({employee_id: req.currentUser.id}, {'id': 'DESC'})
        if (!result) {
            return res.status(500).send({message: 'Something went wrong'});
        }
        res.status(200).send(result);
    };
    update = async (req, res, next) => {
        const id = req.currentUser.id;
        const row_id = req.body.id;

        const user = await AuthModel.findOne({id});

        if (user.role !== 'Admin' && user.role !== 'HR') {
            res.status(401).send({message: 'Only Admin or HR can review you application.'});
            return;
        }

        const params = {
            status: req.body.status,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            leave_type: req.body.leave_type,
            reason: req.body.reason,
            updated_by: user.role
        }
        let result = await LeaveAppModel.update(params, row_id);
        if(result.affectedRows > 0 ){
            await this.getAllLeaves(req, res);
        }else{
            return res.status(500).send({message: 'Something went wrong while getting updated application'});
        }

    };

}

/******************************************************************************
 *                               Export
 ******************************************************************************/

export default new LeaveAppController;