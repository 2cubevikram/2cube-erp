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

}

export default new ReportGenerateModel();