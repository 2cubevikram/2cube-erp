import {calculateDuration} from '../utils/function.js'
import bcrypt from 'bcrypt';
import moment from "moment";
import jwt from 'jsonwebtoken';
import AuthModel from '../models/auth.model.js';
import EmployeeModel from '../models/employee.model.js';
import BreakModel from "../models/break.model.js";


/******************************************************************************
 *                             Employee Controller
 ******************************************************************************/

class EmployeeController {
    login = async (req, res, next) => {
        const {email, password: pass} = req.body;

        console.log(email);
        const user = await AuthModel.findOne({email});

        if (!user) {
            res.status(400).send({message: 'Incorrect email or password.'});
            return;
        }

        const isMatch = await bcrypt.compare(pass, user.password)
        if (!isMatch) {
            res.status(400).send({message: 'Incorrect email or password.'});
            return;
        }

        // user matched
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({user_id: user.id.toString()}, secretKey, {
            expiresIn: '2d'
        });

        const {password, created_at, updated_at, ...userWithoutPassword} = user;
        res.status(200).send({...userWithoutPassword, token});
    };

    edit = async (req, res, next) => {
        console.log(req.files[0].filename);

        const id = req.currentUser.id;

        const user = await AuthModel.findOne({id});
        if (user.role !== 'Employee' || user.status !== 'Active') {
            res.status(401).send({message: 'you have not permission to edit'});
        }
        // req.body.updated_at = CURRENT_TIMESTAMP
        req.body.updated_at = new Date();
        console.log(req.body);

        // const result = await AuthModel.update(req.body, req.currentUser.id);
        // res.send(result)

    };

    timestamp = async (req, res, next) => {
        const tableAction = req.body.action;
        const id = req.body.id;
        const currentDate = new Date();
        console.log(currentDate);
        req.body._time = moment().format('YYYY-MM-DD HH:mm:ss');

        const employee_id = req.currentUser.id
        let result;

        if (tableAction === "check") {
            result = await EmployeeModel.timestamp(id, employee_id, req.body._time, req.body.method, req.body.status);
        } else {
            result = await BreakModel.timestamp(id, employee_id, req.body._time, req.body.method, req.body.status);
        }
        if (!result) {
            return res.status(400).json({message: 'Something went wrong'});
        }
        res.send(result);
    };

    checkAttendance = async (req, res, next) => {
        let datePart;
        const date = new Date();
        const dateString = date.toISOString();
        [datePart] = dateString.split("T");
        const employeeId = req.currentUser.id;

        if (req.body.date !== undefined) {
            datePart = req.body.date;
        }

        try {
            req.body.userId = employeeId
            req.body.date = datePart;
            const date = datePart;
            // const date = "2023-07-04";

            const result = await EmployeeModel.work_hours(employeeId, date);

            let workingHours = 0;
            let minimumWorkingHours = 8;

            for (const row of result) {

                const checkIn = new Date(row._in);
                const checkOut = row._out ? new Date(row._out) : new Date();

                const duration = await EmployeeModel.calculateDuration(checkIn, checkOut);

                // Extract hours from the duration string (format: HH:MM:SS)
                const [hours] = duration.split(':');
                workingHours += parseFloat(hours);
            }
            const breakResult = await this.break_calculation(req, res)
            console.log(breakResult)

            // const currentTime = new Date();
            // const latestCheckIn = result.length > 0 ? new Date(result[result.length - 1].in) : null;

            // if (latestCheckIn && latestCheckIn.toDateString() === currentTime.toDateString()) {
            //     // User has a check-in entry for the current day
            //     const duration = (currentTime - latestCheckIn) / 1000 / 60 / 60; // Duration in hours
            //     workingHours += duration;
            // }
            let breakHours = breakResult.brakeTimeHours;
            let workedgHours = workingHours - breakHours
            let remainWorkingHours = minimumWorkingHours - workedgHours;

            res.json({
                employeeId,
                date,
                minimumWorkingHours,
                workingHours,
                breakHours,
                workedgHours,
                remainWorkingHours
            });
        } catch (err) {
            console.log('Error in getting attending details', err.message);
        }
    };
    checkInStatus = async (req, res, next) => {
        let datePart;
        const date = new Date();
        const dateString = date.toISOString();
        [datePart] = dateString.split("T");
        let curentUserId = req.currentUser.id;

        if (req.query.date !== undefined) {
            datePart = req.query.date;
        }

        if (req.query.id !== undefined) {
            curentUserId = req.query.id;
        }

        try {
            const employeeId = curentUserId;
            // const date = '2023-07-05';
            const date = datePart;

            let result = await EmployeeModel.check_work_hours(employeeId, date);

            if (result.check !== undefined && result.check.length !== 0) {
                res.send(result);
            } else {
                res.send({
                    "check": {
                        "in": null,
                        "out": null,
                        "status": null
                    },
                    "breakin": []
                });
            }
        } catch (err) {
            console.log('Error in getting check-in status:', err.message);
            res.status(400).json({error: 'Failed to fetch check-in status'});
        }
    };

    break_calculation = async (req, res, next) => {
        let datePart;
        const date = new Date();
        const dateString = date.toISOString();
        [datePart] = dateString.split("T");

        if (req.body.date !== undefined) {
            datePart = req.body.date;
        }

        try {
            const employeeId = req.currentUser.id
            const date = datePart;

            const result = await BreakModel.work_hours(employeeId, date);

            let brakeTimeHours = 0;

            for (const row of result) {

                const checkIn = new Date(row._in);
                const checkOut = row._out ? new Date(row._out) : new Date();

                const duration = await EmployeeModel.calculateDuration(checkIn, checkOut);
                // Extract hours from the duration string (format: HH:MM:SS)
                const [hours] = duration.split(':');
                brakeTimeHours += parseFloat(hours);
            }
            const currentTime = new Date();
            // const latestCheckIn = result.length > 0 ? new Date(result[result.length - 1].in) : null;
            // if (latestCheckIn && latestCheckIn.toDateString() === currentTime.toDateString()) {
            //     // User has a check-in entry for the current day
            //     const duration = (currentTime - latestCheckIn) / 1000 / 60 / 60; // Duration in hours
            //     brakeTimeHours += duration;
            // }
            if (req.body.date !== undefined) {
                console.log(
                    'for testing', 'EmpId', '-', employeeId, '/', 'WorkDate', '-', date, '/', 'B hours', '-', brakeTimeHours
                )
                return ({employeeId, date, brakeTimeHours});
            } else {
                res.json({employeeId, date, brakeTimeHours});
            }
        } catch (err) {
            console.log('Error in getting attending details', err.message);
        }
    }

    break_status = async (req, res, next) => {
        const date = new Date();
        const dateString = date.toISOString();
        const [datePart] = dateString.split("T");

        try {
            const employeeId = req.currentUser.id;
            // const date = '2023-07-05';
            const date = datePart;

            let result = await BreakModel.work_hours(employeeId, date);
            result = result[result.length - 1];
            res.status(200).send(result)
        } catch (err) {
            console.log('Error in getting check-in status:', err.message);
            res.status(400).json({error: 'Failed to fetch check-in status'});
        }
    };

}


/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new EmployeeController;