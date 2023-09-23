import moment from "moment";
import AuthModel from '../models/auth.model.js';
import EmployeeModel from '../models/employee.model.js';
import BreakModel from "../models/break.model.js";


/******************************************************************************
 *                             Employee Controller
 ******************************************************************************/

class EmployeeController {
    getUserById = async (req, res, next) => {
        const user = await AuthModel.findOne({id: req.body.id});
        if (!user) {
            return res.status(404).send({message: 'User not found'});
        }
        const {password, created_at, updated_at, ...userWithoutPassword} = user;
        // const userWithIncrement = { ...userWithoutPassword, increment };
        res.send(userWithoutPassword);
    };

    add_data = async (req, res, next) => {
        const id = req.currentUser.id;
        if (req.body.profile !== undefined || req.file !== undefined) {
            req.file ? req.body.profile = req.file.filename : req.body.profile = 'avatar.png';
        }
        req.body.updated_at = new Date();

        const params = {
            ...req.body,
        };
        const result = await EmployeeModel.profile_update(params, id);

        if (!result) {
            return res.status(400).send({message: 'Unable to edit user'});
        }

        req.body.id = id;
        await this.getUserById(req, res, next);
    }

    userProfileUpdateByAdmin = async (req, res, next) => {
        const id = req.body.employee_id;
        req.body.updated_at = new Date();

        const params = {
            birth_date: req.body.birth_date,
            account_number: req.body.account_number,
            join_date: req.body.join_date,
            extra_details: req.body.extra_details,
            basic: req.body.basic,
        }
        const result = await EmployeeModel.profile_update(params, id);

        if (!result) {
            return res.status(400).send({message: 'Unable to edit user'});
        }

        req.body.id = id;
        await this.getUserById(req, res, next);
    }

    timestamp = async (req, res, next) => {
        const tableAction = req.body.action;
        const id = req.body.id;
        const currentDate = new Date();
        req.body._time = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');

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

            let breakHours = breakResult.brakeTimeHours;
            let workedHours = workingHours - breakHours
            let remainWorkingHours = minimumWorkingHours - workedHours;

            res.json({
                employeeId,
                date,
                minimumWorkingHours,
                workingHours,
                breakHours,
                workedHours,
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
                const mergedResult = {...result, serverTime: dateString};
                res.send(mergedResult);
                // console.log(mergedResult)
                // res.send(result);
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

    checkLastStatus = async (req, res, next) => {
        const result = await EmployeeModel.find({employee_id: req.currentUser.id});
        const currentTime = new Date();
        const lastStatus = result[result.length - 1]._in; // Assuming this is a datetime

        // Extract only the date parts from the datetime values
        const currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
        const lastStatusDate = new Date(lastStatus.getFullYear(), lastStatus.getMonth(), lastStatus.getDate());

        // Compare the extracted date parts
        const isSameDate = currentDate.getTime() === lastStatusDate.getTime();

        const response = {
            lastStatus: result[result.length - 1],
            serverTime: currentTime,
            isSameDate: isSameDate
        };

        res.send(response);
    }

    deleteBreak = async (req, res, next) => {
        const id = req.query.row_id;
        const result = await EmployeeModel.delete(id);

        if (!result) {
            return res.status(400).json({message: 'Something went wrong'});
        }
        await this.checkInStatus(req, res);
    }

    addIncrement = async (req, res, next) => {
        const id = req.currentUser.id;

        const user = await AuthModel.findOne({id: id});
        const params = {
            employee_id: req.body.employee_id,
            increment_date: req.body.increment_date,
            amount: req.body.amount,
            updated_by: user.role,
        }
        const result = await EmployeeModel.addIncrement(params);

        if (!result) {
            return res.status(400).json({message: 'Something went wrong'});
        }
        await this.getIncrementById(req, res, next);
    }

    getIncrementById = async (req, res, next) => {
        const id = req.body.employee_id;
        const result = await EmployeeModel.getIncrementById({employee_id: id});
        res.send(result);
    }

}


/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new EmployeeController;