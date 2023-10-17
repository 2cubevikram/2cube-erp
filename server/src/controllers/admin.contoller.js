import AuthModel from '../models/auth.model.js';
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import EmployeeModel from "../models/employee.model.js";
import BreakModel from "../models/break.model.js";
import HttpException from '../utils/HttpException.utils.js';
import sendMail from "../utils/mailer.utils.js";
import authModel from "../models/auth.model.js";

/******************************************************************************
 *                              Auth Controller
 ******************************************************************************/

class AdminController {

    register = async (req, res, next) => {
        // const password = req.body.password;
        await this.hashPassword(req);
        req.body.id = uuid();

        const user = await AuthModel.findOne({email: req.body.email});
        if (user) {
            return res.status(409).send({message: 'Duplicate Entry, Email already exists.'});
        }

        req.body.status = "Active"
        const result = await AuthModel.create(req.body);
        if (!result) {
            return res.status(500).json({message: 'Something went wrong'});
        }
        // req.body.password = password;
        // next();
        res.status(201).send('User was created!');
    };

    login = async (req, res, next) => {
        const {email, password: pass} = req.body;

        const user = await AuthModel.findOne({email});
        if (!user) {
            res.status(400).send({message: 'Incorrect email or password.'});
            return;
        }

        const isMatch = await bcrypt.compare(pass, user.password)
        if (!isMatch) {
            res.status(400).send({message: 'Incorrect insert password.'});
            return;
        }

        // user matched
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({user_id: user.id.toString()}, secretKey, {
            expiresIn: '10h'
        });

        const {password, created_at, updated_at, ...userWithoutPassword} = user;
        res.status(200).send({...userWithoutPassword, token});
    };

    getActiveEmployee = async (req, res, next) => {
        try {
            const results = await AuthModel.find({'status': 'Active'}, {'created_at': 'ASC'});

            for (const item of results) {
                const increments = await EmployeeModel.getIncrementById({employee_id: item.id});
                const lastIncrement = increments[increments.length - 1];

                if (lastIncrement) {
                    item.employee_id = lastIncrement.employee_id;
                    item.increment_date = lastIncrement.increment_date;
                    item.amount = lastIncrement.amount;
                }
            }

            const sanitizedResults = results.map(({
                                                      password,
                                                      status,
                                                      created_at,
                                                      updated_at,
                                                      lastIncrement,
                                                      ...userWithoutPassword
                                                  }) => ({
                ...userWithoutPassword,
                employee_id: userWithoutPassword.employee_id,
                increment_date: userWithoutPassword.increment_date,
                amount: userWithoutPassword.amount
            }));

            res.send(sanitizedResults);
        } catch (error) {
            next(error);
        }
    };

    getAllEmployee = async (req, res, next) => {
        const users = await AuthModel.find({}, {'created_at': 'ASC'});

        if (!users || users.length === 0) {
            return res.status(404).send({message: 'No users found'});
        }

        const usersWithoutPassword = users.map(user => {
            const {password, created_at, updated_at, ...userWithoutPassword} = user; // Convert the user to a plain JavaScript object
            return userWithoutPassword;
        });

        res.send(usersWithoutPassword);
    };

    getEmployeeById = async (req, res, next) => {
        let result = await AuthModel.findOne({id: req.params.id});
        if (!result) {
            return res.status(404).send({message: 'Employee not found'});
        }

        const increments = await EmployeeModel.getIncrementById({employee_id: req.params.id});

        if (increments && increments.length > 0) {
            const lastIncrement = increments[increments.length - 1];
            const {id: incrementId, ...incrementWithoutId} = lastIncrement;
            result = {...result, ...incrementWithoutId, id: result.id}; // Merge the result and incrementWithoutId objects
        }

        const {password, status, created_at, updated_at, ...userWithoutPassword} = result;

        res.send(userWithoutPassword)
    };

    edit = async (req, res, next) => {
        const id = req.currentUser.id;

        const user = await AuthModel.findOne({id});

        if (user.role != 'Admin') {
            res.status(401).send({message: 'only Admin can edit'});
            return;
        }

        req.body.updated_at = new Date();
        // console.log(req.body);

        // const result = await AuthModel.update(req.body, req.currentUser.id);
    }

    checkTimeUpdate = async (req, res, next) => {
        const userId = req.currentUser.id;
        const rowId = req.body.id;
        let outTime;
        const inTime = req.body._in ? moment(`${req.body.date}T${req.body._in}`, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss') : null;
        if (req.body._out !== "Invalid date") {
            outTime = req.body._out ? moment(`${req.body.date}T${req.body._out}`, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss') : null;
        } else {
            outTime = null;
        }
        const user = await AuthModel.findOne({id: userId});

        if (user.role !== 'Admin' && user.role !== 'HR') {
            res.status(401).send({message: 'Employees are not allowed to edit their recorded time.'});
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

        if (req.body._out === "Invalid date") {
            req.body.status = "CHECK_IN";
        } else {
            req.body.status = "CHECK_OUT";
        }

        const params = {
            _in: inTime,
            _out: outTime,
            status: req.body.status,
            updated_by: user.role
        }
        let result = await EmployeeModel.checkTimeUpdate(params, rowId);

        res.status(200).send(result);
    }

    breakTimeUpdate = async (req, res, next) => {
        const userId = req.currentUser.id;
        const rowId = req.body.id;
        let outTime;
        const inTime = req.body._in ? moment(`${req.body.date}T${req.body._in}`, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss') : null;
        if (req.body._out !== "Invalid date") {
            outTime = req.body._out ? moment(`${req.body.date}T${req.body._out}`, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss') : null;
        } else {
            outTime = null;
        }

        const user = await AuthModel.findOne({id: userId});

        if (user.role !== 'Admin' && user.role !== 'HR') {
            res.status(401).send({message: 'Employees are not allowed to edit their recorded time.'});
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

        if (req.body._out === "Invalid date") {
            req.body.status = "BREAK_IN";
        } else {
            req.body.status = "BREAK_OUT";
        }

        const params = {
            _in: inTime,
            _out: outTime,
            status: req.body.status,
            updated_by: user.role
        }
        let result = await BreakModel.breakTimeUpdate(params, rowId);

        res.status(200).send(result);
    }

    to_day = async (req, res, next) => {
        const allIds = [];
        const result = await AuthModel.find({'status': 'Active'}, {'created_at': 'ASC'});

        result.forEach(item => {
            allIds.push(item.id);
        });

        let employee_ids = allIds

        let date = new Date().toISOString().slice(0, 10);
        const check = await EmployeeModel.find_day_attendance_status(employee_ids, date);
        const break1 = await EmployeeModel.find_day_break_status(employee_ids, date);

        const mergedResults = result.map(item => {
            const checkData = check.find(checkItem => checkItem.employee_id === item.id);
            const breakData = break1.find(breakItem => breakItem.employee_id === item.id);

            return {
                // ...item,
                id: item.id,
                first_name: item.first_name,
                last_name: item.last_name,
                profile: item.profile,
                check: checkData ? checkData.status : null,
                break: breakData ? breakData.status : null,
            };
        });

        res.status(200).send(mergedResults);
    }

    getBirthday = async (req, res, next) => {
        // const serverCurrentTime = new Date("2023-08-14T15:30:00");
        // const result = await EmployeeModel.getBirthday();
        // res.status(200).send(result);
        const serverCurrentTime = new Date();
        const result = await EmployeeModel.getBirthday();

        const modifiedResult = result.map(employee => ({
            ...employee,
            birth_date: new Date(employee.birth_date).toISOString(), // Convert birth_date to ISO string
            serverCurrentTime: serverCurrentTime.toISOString() // Add serverCurrentTime
        }));
        res.status(200).send(modifiedResult);
    }

    addHoliday = async (req, res, next) => {
        const id = req.currentUser.id;

        const result = await AuthModel.findOne({id});
        req.body.post_by = result.role;

        const holiday = await AuthModel.crateHoliday(req.body);
        if (holiday === 1) {
            await this.getHoliday(req, res);
        } else {
            res.status(401).send({message: 'Something went wrong while adding Holiday.'});
        }
    }

    getHoliday = async (req, res, next) => {
        const serverCurrentTime = new Date();
        const result = await AuthModel.findHolidays();
        const modifiedResult = result.map(holiday => ({
            ...holiday,
            date: new Date(holiday.date).toISOString(), // Convert birth_date to ISO string
            serverCurrentTime: serverCurrentTime.toISOString() // Add serverCurrentTime
        }));
        res.status(200).send(modifiedResult);
    }

    deleteHoliday = async (req, res, next) => {
        const id = req.query.id;
        const result = await AuthModel.delete(id);
        if (!result) {
            throw new HttpException(404, 'Data not found');
        }
        await this.getHoliday(req, res);
        res.send('Holiday has been deleted');
    }

    sendForgotPasswordEmail = async (req, res, next) => {
        const user = await AuthModel.findOne({email: req.query.email});
        if (!user) {
            return res.status(409).send({message: 'Record not found, With this email. Kindly reach out to Authorized Person for Assistance.'});
        }

        if (user.status !== 'Active') {
            return res.status(208).send({message: 'Your account is not active this time, Kindly reach out to Authorized Person for Assistance.'});
        }

        await sendMail(user.email, '2Cube-Studio – Password Forgot', user.id);
        res.status(200).send({message: 'Email has been sent on your register email address.'});
        // next();
    }

    forgotPassword = async (req, res, next) => {

        const secretKey = process.env.SECRET_JWT || "";
        try {
            // Verify Token
            const isValidToken = jwt.verify(req.body.token, secretKey);

            const user = await AuthModel.findOne({ id: isValidToken.user_id });

            if (!user) {
                return res.status(409).send({ message: 'Record not found, With this email.' });
            }

            if (user.status !== 'Active' && user.status !== 'Unverified') {
                res.status(401).send({ message: 'Editing is limited to the respective account holders only' });
                return;
            }

            await this.hashPassword(req);

            const params = {
                password: req.body.password,
                updated_at: new Date(),
            }

            const result = await AuthModel.update(params, user.id);

            if (!result) {
                return res.status(409).send({ message: 'Something went wrong while updating password.' });
            }

            return res.status(200).send({ message: 'Password has been reset successfully.' });
        } catch (error) {
            console.log('Invalid or expired token:', error.message);
            return res.status(400).send({ message: 'Invalid or expired token.' });
        }
    }

    userDelete = async (req, res, next) => {
        const userId = req.currentUser.id;
        const id = req.body.employee_id;

        const user = await AuthModel.findOne({id: userId});

        if (user.role !== 'Admin' && user.role !== 'HR') {
            return res.status(401).send({message: 'Employees are not allowed to edit their recorded time.'});

        }

        if (user.role === 'HR') {
            const hrUser = await AuthModel.findOne({id: req.body.employee_id});
            if (hrUser && userId === hrUser.id) {
                res.status(400).send({
                    message: 'HR can not delete their own Account. Kindly reach out to Admin for assistance. Thank you'
                });
                return;
            }
        }

        const params = {
            status: req.body.status,
            updated_at: new Date(),
        }
        let result = await authModel.update(params, id);

        if (!result) {
            return res.status(409).send({message: 'Something went wrong while delete user.'});
        }
        res.status(200).send({message: 'User has been delete successfully.'});
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12);
        }
    }
}


/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new AdminController;