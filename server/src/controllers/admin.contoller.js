import AuthModel from '../models/auth.model.js';
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import EmployeeModel from "../models/employee.model.js";
import BreakModel from "../models/break.model.js";
import HttpException from '../utils/HttpException.utils.js';

/******************************************************************************
 *                              Auth Controller
 ******************************************************************************/

class AdminController {
    register = async (req, res, next) => {
        const password = req.body.password;
        await this.hashPassword(req);
        req.body.id = uuid();

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

    getAllEmployee = async (req, res, next) => {
        const result = await AuthModel.find({'status': 'Active'}, {'created_at': 'ASC'});
        // console.log({ result });
        const {password, status, created_at, updated_at, ...userWithoutPassword} = result;
        res.send(userWithoutPassword)
    };

    getEmployeeById = async (req, res, next) => {
        const result = await AuthModel.findOne({id: req.params.id});
        if (!result) {
            return res.status(404).send({message: 'Employee not found'});
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
        const inTime = req.body._in ? moment(`${req.body.date}T${req.body._in}`, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss') : null;
        const outTime = req.body._out ? moment(`${req.body.date}T${req.body._out}`, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss') : null;

        const user = await AuthModel.findOne({id:userId});

        if (user.role !== 'Admin' && user.role !== 'HR') {
            res.status(401).send({message: 'Employees are not allowed to edit their recorded time.'});
            return;
        }

        if(user.role === 'HR' ){
            const hrUser = await AuthModel.findOne({ id: req.body.employee_id });
            if (hrUser && userId === hrUser.id) {
                res.status(400).send({
                    message: 'HR can not edit their own record. Kindly reach out to Admin for assistance. Thank you'
                });
                return;
            }
        }

        if (outTime === "Invalid date") {
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
        const inTime = req.body._in ? moment(`${req.body.date}T${req.body._in}`, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss') : null;
        const outTime = req.body._out ? moment(`${req.body.date}T${req.body._out}`, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss') : null;

        const user = await AuthModel.findOne({id:userId});

        if (user.role !== 'Admin' && user.role !== 'HR') {
            res.status(401).send({message: 'Employees are not allowed to edit their recorded time.'});
            return;
        }

        if(user.role === 'HR' ){
            const hrUser = await AuthModel.findOne({ id: req.body.employee_id });
            if (hrUser && userId === hrUser.id) {
                res.status(400).send({
                    message: 'HR can not edit their own record. Kindly reach out to Admin for assistance. Thank you'
                });
                return;
            }
        }

        if (outTime === "Invalid date") {
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
        const result = await EmployeeModel.getBirthday();
        res.status(200).send(result);
    }

    addHoliday = async (req, res, next) => {
        const id = req.currentUser.id;

        const result = await AuthModel.findOne({id});
        req.body.post_by = result.role;

        const holiday = await AuthModel.crateHoliday(req.body);
        if(holiday === 1){
            await this.getHoliday(req, res);
        }else{
            res.status(401).send({message: 'Something went wrong while adding Holiday.'});
        }
    }

    getHoliday = async (req, res, next) => {
        const result = await AuthModel.findHolidays();
        res.status(200).send(result);
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