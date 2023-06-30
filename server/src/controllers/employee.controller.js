import AuthModel from '../models/auth.model.js';
import EmployeeModel from '../models/employee.model.js';
import { v4 as uuid, validate as uuidValidate } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


/******************************************************************************
 *                             Employee Controller
 ******************************************************************************/

class EmployeeController {
    login = async (req, res, next) => {
        const { email, password: pass } = req.body;

        console.log(email);
        const user = await AuthModel.findOne({ email });

        if (!user) {
            res.status(400).send({ message: 'Incorrect email or password.' });
            return;
        }

        const isMatch = await bcrypt.compare(pass, user.password)
        if (!isMatch) {
            res.status(400).send({ message: 'Incorrect email or password.' });
            return;
        }

        // user matched
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '2d'
        });

        const { password, created_at, updated_at, ...userWithoutPassword } = user;
        res.status(200).send({ ...userWithoutPassword, token });
    };

    edit = async (req, res, next) => {
        console.log(req.files[0].filename);

        const id = req.currentUser.id;

        const user = await AuthModel.findOne({ id });
        if (user.role != 'Employee' || user.status != 'Active') {
            res.status(401).send({ message: 'you have not permission to edit' });
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
        console.log(result);
    };

    check_out = async (req, res, next) => {
        const employee_id = req.currentUser.id
        const result = await EmployeeModel.check_out(employee_id);
        console.log(result);
    };

    checkAttendance = async (req, res, next) => {
        try {
            const employeeId = req.currentUser.id;
            const date = req.body.date;

            const result = await EmployeeModel.work_hours(employeeId, date);

            let workingHours = 0;
            let minimumWorkingHours = 12;

            for (const row of result) {
                const checkIn = new Date(row.check_in);
                const checkOut = row.check_out ? new Date(row.check_out) : new Date();

                const duration = await EmployeeModel.calculateDuration(checkIn, checkOut);

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
            res.json({ employeeId, date, minimumWorkingHours, workingHours, remainWorkingHours });
        } catch (err) {
            console.log('Error in getting attending details', err.message);
        }
    };

}


/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new EmployeeController;