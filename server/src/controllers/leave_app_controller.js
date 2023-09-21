import LeaveAppModel from "../models/leave_app_model.js";
import AuthModel from "../models/auth.model.js";
import {io} from '../server.js';
import notificationController from "./notification.controller.js";
import moment from "moment";
import HttpException from "../utils/HttpException.utils.js";


/******************************************************************************
 *                              Leave Application Controller
 ******************************************************************************/

class LeaveAppController {
    create = async (req, res, next) => {
        req.body.employee_id = req.currentUser.id;

        // count day between start_date and end_date
        const start_date = moment(req.body.start_date);
        const end_date = moment(req.body.end_date);
        const duration = moment.duration(end_date.diff(start_date));
        const days = duration.asDays();

        req.body.days = days + 1;
        const result = await LeaveAppModel.create(req.body);

        if (result.id > 0) {
            req.body.id = result.id;
            await notificationController.createNotification(req, res);
        } else {
            return res.status(500).send({message: 'Something went wrong while applied leave'});
        }
    };

    getAllLeaves = async (req, res, next) => {
        let date = req.query.date !== undefined ? moment(req.query.date).format('YYYY-MM') : moment(new Date()).format('YYYY-MM');
        const result = await LeaveAppModel.findAllLeaves({date}, {id: 'DESC'});
        res.status(200).send(result);
    };

    getLeavesById = async (req, res, next) => {
        // let date = req.query.date !== undefined ? moment(req.query.date).format('YYYY-MM') : moment(new Date()).format('YYYY-MM');
        let date = req.query.date !== undefined ? moment(req.query.date, 'YYYY-MM-DD').format('YYYY-MM') : moment(new Date(), moment.ISO_8601).format('YYYY-MM');
        let user_id = req.body.user_id !== undefined ? req.body.user_id : req.currentUser.id;
        let status = req.body.status !== undefined ? req.body.status : 'Applied';

        const params = {
            employee_id: user_id,
            start_date: date,
            // status: status
        };
        const result = await LeaveAppModel.findWhere(params)
        if (!result) {
            return res.status(500).send({message: 'Something went wrong'});
        }
        res.status(200).send(result);
    };

    update = async (req, res, next) => {
        const userId = req.currentUser.id;
        const row_id = req.body.id;

        const user = await AuthModel.findOne({id: userId});

        if (user.role !== 'Admin' && user.role !== 'HR') {
            res.status(401).send({message: 'Only Admin or HR can review you application.'});
            return;
        }

        if (user.role === 'HR') {
            const hrUser = await AuthModel.findOne({id: req.body.employee_id});
            if (hrUser && userId === hrUser.id) {
                res.status(400).send({
                    message: 'HR can not edit their own record. Kindly reach out to Admin for assistance. Thank you'
                });
                return;
            }
        }

        const start_date = moment(req.body.start_date);
        const end_date = moment(req.body.end_date);
        const duration = moment.duration(end_date.diff(start_date));
        const days = duration.asDays();

        req.body.days = days + 1;
        req.query.date = moment(req.body.start_date);

        const params = {
            status: req.body.status,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            days: req.body.days,
            leave_type: req.body.leave_type,
            reason: req.body.reason,
            updated_by: user.role
        };
        let result = await LeaveAppModel.update(params, row_id);
        if (result.affectedRows > 0) {
            await notificationController.updateNotification(req, res);
            await this.getAllLeaves(req, res);
        } else {
            return res.status(500).send({message: 'Something went wrong while getting updated application'});
        }

    };

    delete = async (req, res, next) => {
        const id = req.query.id;
        const result = await LeaveAppModel.delete(id);
        if (!result) {
            throw new HttpException(404, 'Data not found');
        }
        await this.getAllLeaves(req, res);
        // res.send('Leave has been deleted');
    }

}

/******************************************************************************
 *                               Export
 ******************************************************************************/

export default new LeaveAppController;