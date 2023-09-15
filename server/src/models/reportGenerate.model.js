import CommonReportGenerateModel from "./CommonReportGenerate.model.js";


class ReportGenerateModel {
    tableName = `attendance`;
    breakTable = `break_in_out`;

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