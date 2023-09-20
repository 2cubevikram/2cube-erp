import AuthModel from "../models/auth.model.js";
import LeaveAppModel from "../models/leave_app_model.js";
import moment from "moment/moment.js";
import ReportGenerateModel from "../models/reportGenerate.model.js";
import EmployeeModel from "../models/employee.model.js";
import SalaryModel from "../models/salary.model.js";


class ReportGenerateController {
    getReport = async (req, res) => {
        const id = req.body.id;
        const date = req.body.date;
        let status = req.body.status !== undefined ? req.body.status : 'Approved';

        const user = await AuthModel.findOne({id: id});

        const params = {
            employee_id: req.body.id,
            start_date: moment(date, 'YYYY-MM-DD').format('YYYY-MM'),
            status: status
        };
        const leave = await LeaveAppModel.findWhere(params)
        const leaves = [];

        for (const data of leave) {
            // console.log(data.leave_type, data.days, moment(data.start_date).format('YYYY-MM-DD') + ' to ' + moment(data.end_date).format('YYYY-MM-DD'))
            leaves.push({
                leave_type: data.leave_type,
                days: data.days,
                leave_start: moment(data.start_date).format('YYYY-MM-DD'),
                leave_end: moment(data.end_date).format('YYYY-MM-DD'),
            })
        }

        let currentDate = req.body.date && !isNaN(new Date(req.body.date)) ? new Date(req.body.date) : new Date();
        const currentMonth = currentDate.getMonth(); // Months are 0-indexed
        const currentYear = currentDate.getFullYear();

        const salary = await SalaryModel.getSalaryById(id, currentMonth, currentYear);

        const date1 = moment(date, 'YYYY-MM-DD');
        const monthDays = date1.daysInMonth();

        let minimumWorkingHours = 8;

        const attandance = await this.checkReport(req, res);
        const breakHours = await this.breakReport(req, res);

        const mergedResults = [];

        const mergedResult = {
            currentMonth: date,
            id: user.id,
            name: user.first_name + ' ' + user.last_name,
            email: user.email,
            join_date: user.join_date,
            role: user.role,
            leaves: leaves,
            checkHours: attandance,
            breakHours: breakHours,
            salary:salary.amount,
            extraAllowance:salary.extra_allowance
        }
        mergedResults.push(mergedResult);

        res.json(mergedResults);
        // console.log(workingHours);

    }

    checkReport = async (req, res) => {
        const id = req.body.id;
        const date = req.body.date;

        const attendance = await ReportGenerateModel.check_hours(id, moment(date, 'YYYY-MM-DD').format('YYYY-MM'));

        let workingHours = 0;

        for (const row of attendance) {
            const checkIn = new Date(row._in);
            const checkOut = new Date(row._out);
            const duration = await EmployeeModel.calculateDuration(checkIn, checkOut);
            workingHours += parseFloat(duration);
        }

        return workingHours;
    }

    breakReport = async (req, res) => {
        const id = req.body.id;
        const date = req.body.date;

        const attendance = await ReportGenerateModel.break_hours(id, moment(date, 'YYYY-MM-DD').format('YYYY-MM'));

        let workingHours = 0;

        for (const row of attendance) {
            const checkIn = new Date(row._in);
            const checkOut = new Date(row._out);
            const duration = await EmployeeModel.calculateDuration(checkIn, checkOut);
            workingHours += parseFloat(duration);
        }

        return workingHours;
    }
}

export default new ReportGenerateController();