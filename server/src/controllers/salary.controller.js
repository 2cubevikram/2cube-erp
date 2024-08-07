import SalaryModel from "../models/salary.model.js";
import AuthModel from "../models/auth.model.js";
import LeaveAppModel from "../models/leave_app_model.js";
import moment from "moment/moment.js";
import EmployeeModel from "../models/employee.model.js";
import HttpException from "../utils/HttpException.utils.js";


/******************************************************************************
 *                              Salary Controller
 ******************************************************************************/


class SalaryController {

    getSalaryById = async (req, res, next) => {
        const id = req.body.id;
        let currentDate = req.body.date && !isNaN(new Date(req.body.date)) ? new Date(req.body.date) : new Date();
        const currentMonth = currentDate.getMonth(); // Months are 0-indexed
        const currentYear = currentDate.getFullYear();

        const result = await SalaryModel.getSalaryById(id, currentMonth, currentYear);
        res.send(result);
    }

    salaryGenerate = async (req, res, next) => {
        try {
            const data = req.body;
            const results = await Promise.all(data.map(user => {
                const params = {
                    employee_name: user.first_name + ' ' + user.last_name,
                    employee_id: user.id,
                    total_leave: user.leaveAndDays,
                    present_day: user.presentDays,
                    amount: user.finalSalary,
                    extra_allowance: 0,
                    salary_date: user.createDate || moment(new Date()).format('YYYY-MM-DD'),
                    status: null,
                };
                // console.log(params)
                return SalaryModel.creditForAll(params);
            }));

            // Check if all users were successfully inserted
            const allUsersInserted = results.every(result => result > 0);

            if (allUsersInserted) {
                const data = req.body;
                if(data[0].createDate == undefined){
                    await this.getAllSalaryStatus(req, res, next);
                } else { 
                    await this.getAllPreSalaryStatus(req, res, next);
                }
                // await this.getAllSalaryStatus(req, res, next);
            } else {
                res.status(500).json({message: 'Some users failed to insert'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Something went wrong'});
        }
    }

    reGenerateSalary = async (req, res, next) => {
        // console.log(req.body)
        const updates = req.body;
        try {
            for (const user of updates) {
                const params = {
                    employee_name: user.first_name + ' ' + user.last_name,
                    employee_id: user.id,
                    total_leave: user.leaveAndDays,
                    present_day: user.presentDays,
                    amount: user.finalSalary,
                    extra_allowance: 0,
                    salary_date: user.createDate || moment(new Date()).format('YYYY-MM-DD'),
                    status: user.createDate ? 'CREDIT' : null,
                };
                const conditionalParams = {
                    id: user.salaryIds,
                    employee_id: user.id,
                }

                
                // console.log({params, conditionalParams});
                await SalaryModel.updateWhere(params, conditionalParams);
                // console.log(`Updated iD ${user.salaryIds} user id ${user.id}`);
            }

            if(updates[0].createDate == undefined){
                console.log('if condition')
                await this.getAllSalaryStatus(req, res, next);
            } else { 
                console.log('else condition')
                await this.getAllPreSalaryStatus(req, res, next);
            }

            // await this.getAllSalaryStatus(req, res, next);
        } catch (error) {
            next(error);
        }
    }

    SalaryDataGenerate = async (req, res, next) => {
        try {
            let date = moment(req.query.date, 'YYYY-MM').isValid() ? moment(req.query.date).format('YYYY-MM') : moment().format('YYYY-MM');
            let status = req.query.status !== undefined ? req.query.status : 'Approved';

            const users = await AuthModel.find({'status': 'Active'}, {'created_at': 'ASC'});

            let user_ids = req.query.id !== undefined && req.query.id !== '' ? [req.query.id] : users.map(user => user.id);

            const liveParams = {
                employee_id: user_ids,
                start_date: date,
                // leave_type: 'PL',
                status: status
            };

            const leave = await LeaveAppModel.findWhere(liveParams);
            const increment = await EmployeeModel.getIncrementById({employee_id: user_ids});

            const leaveTypesByUser = {};
            for (const leaveRecord of leave) {
                if (!leaveTypesByUser[leaveRecord.employee_id]) {
                    leaveTypesByUser[leaveRecord.employee_id] = {};
                }

                if (leaveRecord.leave_type) {
                    const leaveTypeArray = leaveRecord.leave_type.split('/');
                    leaveTypeArray.forEach(type => {
                        if (!leaveTypesByUser[leaveRecord.employee_id][type]) {
                            leaveTypesByUser[leaveRecord.employee_id][type] = 0;
                        }
                        leaveTypesByUser[leaveRecord.employee_id][type] += leaveRecord.days || 0;
                    });
                }
            }

            const userIncrementsMap = {};
            for (const incrementRecord of increment) {
                const userId = incrementRecord.employee_id;

                if (!userIncrementsMap[userId]) {
                    userIncrementsMap[userId] = [];
                }
                userIncrementsMap[userId] = incrementRecord.amount;
            }

            const mergedResults = [];
            for (const user_id of user_ids) {
                const user = users.find(u => u.id === user_id);
                const userLeaveTypes = leaveTypesByUser[user_id] || {};
                const userIncrements = userIncrementsMap[user_id] || [];

                const leave_type = Object.keys(userLeaveTypes); // Convert to array of leave types
                const leave_days = Object.values(userLeaveTypes); // Convert to array of accumulated leave days

                const plDays = leave_type.includes('PL') ? leave_days[leave_type.indexOf('PL')] : 0;
                const hplCount = leave_type.includes('HPL') ? leave_days[leave_type.indexOf('HPL')] : 0;
                const halfPaidDayCount = hplCount * 0.5; // Convert half-days to actual days
                // const hlCount = leave_type.includes('HL') ? leave_days[leave_type.indexOf('HL')] : 0;
                const hlCount = leave_type.includes('HSL') ? leave_days[leave_type.indexOf('HSL')] : 0;
                const halfDayCount = hlCount * 0.5; // Convert half-days to actual days
                const hlClCount = leave_type.includes('HCL') ? leave_days[leave_type.indexOf('HCL')] : 0;
                const halfDayClCount = hlClCount * 0.5; // Convert half-days to actual days


                const mergedResult = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    basic_salary: user.basic,
                    join_date: user.join_date,
                    increment: userIncrements, // Use userIncrements array
                    leave_type: leave_type,
                    days: leave_days,
                    plDays: plDays,
                    halfDayCount: halfPaidDayCount,
                    halfDay: halfDayCount,
                    halfDayCl: halfDayClCount
                };
                mergedResults.push(mergedResult);
            }
            res.status(200).json(mergedResults);
        } catch (error) {
            next(error);
        }
    }

    updateSalaryById = async (req, res, next) => {
        const id = req.body.id;
        const status = req.body.status === '' ? null : req.body.status;

        const params = {
            amount: req.body.amount,
            extra_allowance: req.body.extra_allowance,
            status: status,
        };
        const result = await SalaryModel.update(params, id);
        if (result === 0) {
            res.status(500).send({message: "Something went wrong"});
        }
        await this.getAllSalaryStatus(req, res, next);
    }

    getAllSalaryStatus = async (req, res, next) => {
        let currentDate = req.query.date && !isNaN(new Date(req.query.date)) ? new Date(req.query.date) : new Date();

        const currentMonth = currentDate.getMonth(); // Months are 0-indexed
        const currentYear = currentDate.getFullYear();

        const result = await SalaryModel.findAll({currentMonth, currentYear});

        if (result.length < 1) {
            return res.status(400).send({message: "Salary not found"});
        }
        res.status(200).send(result);
    }

    getAllPreSalaryStatus = async (req, res, next) => {
        let currentDate;

        if (req.query.date && !isNaN(new Date(req.query.date))) {
            currentDate = new Date(req.query.date);
        } else {
            currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() - 1);
        }

        const currentMonth = currentDate.getMonth(); // Months are 0-indexed
        const currentYear = currentDate.getFullYear();

        const result = await SalaryModel.findAll({currentMonth, currentYear});

        if (result.length < 1) {
            return res.status(400).send({message: "Salary not found"});
        }
        res.status(200).send(result);
    }

    manualSalaryAdd = async (req, res, next) => {
        try {
            const data = req.body;
            let filterDate = null;

            const employeeData = data.filter(item => item !== null);
            const results = await Promise.all(employeeData.map(user => {
                const params = {
                    employee_name: user.employee_name,
                    employee_id: user.employee_id,
                    total_leave: user.leave,
                    present_day: user.presentDays,
                    amount: user.salary,
                    extra_allowance: user.allowance,
                    salary_date: user.creditDate,
                    status: user.status,
                };
                filterDate = user.creditDate;
                return SalaryModel.creditManuallyForAll(params);
            }));
            const allUsersInserted = results.every(result => result > 0);

            if (allUsersInserted) {
                req.query.date = filterDate
                await this.getAllSalaryStatus(req, res, next);
            } else {
                res.status(400).send({message: 'Some users salary failed to insert.'});
            }
        } catch (error) {
            res.status(400).send({message: 'Something went wrong.'});
        }
    }

    deleteSalaryById = async (req, res, next) => {
        const id = req.query.id
        const result = await SalaryModel.delete(id)

        if (!result) {
            return res.status(500).send({message: "Something went wrong while salary delete!"});
            // throw new HttpException(404, 'Something went wrong while salary delete!');
        }
        await this.getAllSalaryStatus(req, res, next)
    }


}

/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new SalaryController;