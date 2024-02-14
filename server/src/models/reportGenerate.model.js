import CommonReportGenerateModel from "./CommonReportGenerate.model.js";
import commonModel from "./common.model.js";


class ReportGenerateModel {
    tableName = `attendance`;
    breakTable = `break_in_out`;
    salaryTable = `salary`;

    getUserById(id) {

    }

    check_hours = async (employeeId, date) => {
        return await CommonReportGenerateModel.work_hours(this.tableName, employeeId, date);
    }

    break_hours = async (employeeId, date) => {
        return await CommonReportGenerateModel.work_hours(this.breakTable, employeeId, date);
    }

    check_time = async (employeeId, startTime, endTime) => {
        return await CommonReportGenerateModel.checkTime(this.tableName, employeeId, startTime, endTime);
    }

    break_time = async (employeeId, startTime, endTime) => {
        return await CommonReportGenerateModel.checkTime(this.breakTable, employeeId, startTime, endTime);
    }

}

export default new ReportGenerateModel();