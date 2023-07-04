import AuthModel from '../models/auth.model.js';
import EmployeeModel from '../models/employee.model.js';
import {calculateDuration} from '../utils/function.js'
import {v4 as uuid, validate as uuidValidate} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {json} from "express";


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

    check_in = async (req, res, next) => {
        const employee_id = req.currentUser.id
        const result = await EmployeeModel.check_in(employee_id);

        if (!result) {
            return res.status(400).json({message: 'Something went wrong'});
        }
        res.status(200).send('Check in successfully !');
    };

    check_out = async (req, res, next) => {
        const employee_id = req.currentUser.id
        const result = await EmployeeModel.check_out(employee_id);

        if (!result) {
            return res.status(400).json({message: 'Something went wrong'});
        }
        res.status(200).send('Check out successfully !');
    };

    checkAttendance = async (req, res, next) => {
        const date = new Date();
        const dateString = date.toISOString();
        const [datePart] = dateString.split("T");
        try {
            const employeeId = req.currentUser.id;
            const date = datePart;
            // const date = "2023-07-04";

            const result = await EmployeeModel.work_hours(employeeId, date);

            let workingHours = 0;
            let minimumWorkingHours = 12;
            let checkInstatus = [];

            for (const row of result) {

                const checkIn = new Date(row.check_in);
                const checkOut = row.check_out ? new Date(row.check_out) : new Date();

                const duration = await EmployeeModel.calculateDuration(checkIn, checkOut);

                // Extract hours from the duration string (format: HH:MM:SS)
                const [hours] = duration.split(':');
                workingHours += parseFloat(hours);
                checkInstatus.push(row)
            }

            const currentTime = new Date();
            const latestCheckIn = result.length > 0 ? new Date(result[result.length - 1].check_in) : null;

            if (latestCheckIn && latestCheckIn.toDateString() === currentTime.toDateString()) {
                // User has a check-in entry for the current day
                const duration = (currentTime - latestCheckIn) / 1000 / 60 / 60; // Duration in hours
                workingHours += duration;
            }
            let remainWorkingHours = minimumWorkingHours - workingHours;

            res.json({employeeId, date, minimumWorkingHours, workingHours, remainWorkingHours, checkInstatus });
        } catch (err) {
            console.log('Error in getting attending details', err.message);
        }
    };

    checkAllAttendance = async (req, res, next) => {
        try {
            // const employeeIds = req.body.employeeIds;
            // const date = req.body.date;
            const employeeIds = ["c39bf89d-9613-44bc-baab-9878ca4bc56b", "8192f06b-9e76-4abb-8183-e24c682aa0e5"];
            const date = "2023/06/23";

            const resultPromises = employeeIds.map(async (employeeId) => {
                const result = await EmployeeModel.work_hours_all(employeeId, date);
                return result;
            });

            const results = await Promise.all(resultPromises);

            let attendanceDetails = [];

            for (let i = 0; i < results.length; i++) {
                let workingHours = 0;
                let minimumWorkingHours = 12;

                const result = results[i];

                for (const row of result) {
                    const checkIn = new Date(row.check_in);
                    const checkOut = row.check_out ? new Date(row.check_out) : new Date();

                    const duration = await calculateDuration(checkIn, checkOut);

                    // Extract hours from the duration string (format: HH:MM:SS)
                    const [hours] = duration.split(':');
                    workingHours += parseFloat(hours);
                }

                const currentTime = new Date();
                const latestCheckIn = result.length > 0 ? new Date(result[result.length - 1].check_in) : null;

                if (latestCheckIn && latestCheckIn.toDateString() === currentTime.toDateString()) {
                    // User has a check-in entry for the current day
                    const duration = (currentTime - latestCheckIn) / 1000 / 60 / 60; // Duration in hours
                    workingHours += duration;
                }

                let remainWorkingHours = minimumWorkingHours - workingHours;

                const attendanceData = {
                    employeeId: employeeIds[i],
                    date,
                    minimumWorkingHours,
                    workingHours,
                    remainWorkingHours,
                };

                attendanceDetails.push(attendanceData);
            }
            // console.log(attendanceDetails)
            res.json({attendanceDetails});
        } catch (err) {
            console.log('Error in getting attending details', err.message);
        }
    };

    checkInStatus = async (req, res, next) => {
        const date = new Date();
        const dateString = date.toISOString();
        const [datePart] = dateString.split("T");

        try {
            const employeeId = req.currentUser.id;
            // const date = '2023-07-05';
            const date = datePart;

            const result = await EmployeeModel.work_hours(employeeId, date);
            console.log(result);

           res.status(200).send(result)

            // const isCheckedIn = result.length > 0;
            // console.log('status', isCheckedIn)
            //
            // res.json({checkedIn: isCheckedIn});
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