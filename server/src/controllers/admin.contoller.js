import AuthModel from '../models/auth.model.js';
import {v4 as uuid, validate as uuidValidate} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import EmployeeModel from "../models/employee.model.js";
import BreakModel from "../models/break.model.js";


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
            res.status(400).send({message: 'Incorrect user name or email.'});
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
            expiresIn: '1d'
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
        console.log(req.body);

        // const result = await AuthModel.update(req.body, req.currentUser.id);
    }

    checkTimeUpdate = async (req, res, next) => {
        const id = req.currentUser.id;
        const tableAction = req.body.action;
        const row_id = req.body.id;
        let current_time = moment().format('YYYY-MM-DD HH:mm:ss');

        if (req.body.time !== undefined && req.body.date !== undefined) {
            current_time = moment(`${req.body.date}T${req.body.time}`).format('YYYY-MM-DD HH:mm:ss');
        }

        const user = await AuthModel.findOne({id});

        if (user.role !== 'Admin' && user.role !== 'HR') {
            res.status(401).send({message: 'Admin can edit'});
            return;
        }

        let result;
        if (req.body.action === 'in') {
            const params = {
                _in: current_time,
                status: req.body.status,
                updated_by: user.role
            }
            result = await EmployeeModel.checkTimeUpdate(params, row_id);
        } else {
            const params = {
                _out: current_time,
                status: req.body.status,
                updated_by: user.role
            }
            result = await EmployeeModel.checkTimeUpdate(params, row_id);
        }

        res.send(result);
    }

    breakTimeUpdate = async (req, res, next) => {
        const id = req.currentUser.id;
        const tableAction = req.body.action;
        const row_id = req.body.id;
        let current_time = moment().format('YYYY-MM-DD HH:mm:ss');

        if (req.body.time !== undefined && req.body.date !== undefined) {
            current_time = moment(`${req.body.date}T${req.body.time}`).format('YYYY-MM-DD HH:mm:ss');
        }

        const user = await AuthModel.findOne({id});

        if (user.role !== 'Admin' && user.role !== 'HR') {
            res.status(401).send({message: 'Admin can edit'});
            return;
        }

        let result;
        if (req.body.action === 'in') {
            const params = {
                _in: current_time,
                status: req.body.status,
                updated_by: user.role
            }
            result = await BreakModel.breakTimeUpdate(params, row_id);
        } else {
            const params = {
                _out: current_time,
                status: req.body.status,
                updated_by: user.role
            }
            result = await BreakModel.breakTimeUpdate(params, row_id);
        }

        res.send(result);
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