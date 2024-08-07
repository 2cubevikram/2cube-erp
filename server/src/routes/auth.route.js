import express from 'express';

import auth from '../middlewares/auth.middleware.js';
import awaitHandlerFactory from '../middlewares/awaitHandlerFactory.middleware.js';
import AdminController from '../controllers/admin.contoller.js';
import EmployeeController from '../controllers/employee.controller.js';
import UploadMediaController from '../controllers/upload_media.controller.js';
import LeaveAppController from "../controllers/leave_app_controller.js";
import NotificationController from "../controllers/notification.controller.js";
import SalaryController from "../controllers/salary.controller.js";
import ReportGenerateController from "../controllers/reportGenerate.controller.js";
import salaryController from "../controllers/salary.controller.js";


const router = express.Router();
// Admin Use
router.post('/register', awaitHandlerFactory(AdminController.register));
router.post('/login', awaitHandlerFactory(AdminController.login));
router.patch('/edit', auth(), awaitHandlerFactory(AdminController.edit));
router.get('/employees', auth(), awaitHandlerFactory(AdminController.getActiveEmployee));
router.get('/old-employees', auth(), awaitHandlerFactory(AdminController.getOldEmployee));
router.get('/all-employees', auth(), awaitHandlerFactory(AdminController.getAllEmployee));
router.get('/id/:id', auth(), awaitHandlerFactory(AdminController.getEmployeeById));
router.get('/employees/profile/:id', auth(), awaitHandlerFactory(AdminController.getEmployeeById));
router.patch('/check-time-edit', auth(), awaitHandlerFactory(AdminController.checkTimeUpdate));
router.patch('/break-time-edit', auth(), awaitHandlerFactory(AdminController.breakTimeUpdate));
router.get('/to-day', auth(), awaitHandlerFactory(AdminController.to_day))
router.get('/get-birthday', auth(), awaitHandlerFactory(AdminController.getBirthday));
router.post('/add-holiday', auth(), awaitHandlerFactory(AdminController.addHoliday));
router.get('/get-holiday', auth(), awaitHandlerFactory(AdminController.getHoliday));
router.delete('/delete-holiday', auth(), awaitHandlerFactory(AdminController.deleteHoliday));
router.get('/send-email', awaitHandlerFactory(AdminController.sendForgotPasswordEmail));
router.patch('/reset-password', awaitHandlerFactory(AdminController.forgotPassword));
router.patch('/delete-user', auth(), awaitHandlerFactory(AdminController.userDelete));

// Salary Controller
router.get('/salary-data-generate', auth(), awaitHandlerFactory(SalaryController.SalaryDataGenerate));
router.patch('/update-salary', auth(), awaitHandlerFactory(SalaryController.updateSalaryById));
router.post('/salary-generate', awaitHandlerFactory(SalaryController.salaryGenerate));
router.get('/get-salary-status', auth(), awaitHandlerFactory(SalaryController.getAllSalaryStatus));
router.patch('/salary-re-generate', auth(), awaitHandlerFactory(SalaryController.reGenerateSalary));
router.post('/manual-salary-add', awaitHandlerFactory(SalaryController.manualSalaryAdd));
router.delete('/delete-salary', auth(), awaitHandlerFactory(salaryController.deleteSalaryById))


//Employee use
router.patch('/add', auth(), (UploadMediaController.uplodMedia), awaitHandlerFactory(EmployeeController.add_data));
router.patch('/update-user', auth(), awaitHandlerFactory(EmployeeController.add_data));
router.patch('/update-by-admin', auth(), awaitHandlerFactory(EmployeeController.userProfileUpdateByAdmin));
router.get('/checkAttendance', auth(), awaitHandlerFactory(EmployeeController.checkAttendance));
router.get('/check-in-status', auth(), awaitHandlerFactory(EmployeeController.checkInStatus));
router.get('/break-count', auth(), awaitHandlerFactory(EmployeeController.break_calculation));
router.get('/break-status', auth(), awaitHandlerFactory(EmployeeController.break_status));
router.get('/get-last-status', auth(), awaitHandlerFactory(EmployeeController.checkLastStatus));
router.delete('/delete-break', auth(), awaitHandlerFactory(EmployeeController.deleteBreak));
router.post('/add-increment', auth(), awaitHandlerFactory(EmployeeController.addIncrement));

router.post('/leave-applied', auth(), awaitHandlerFactory(LeaveAppController.create));
router.get('/leave-by-id', auth(), awaitHandlerFactory(LeaveAppController.getLeavesById));
router.get('/all-leaves', auth(), awaitHandlerFactory(LeaveAppController.getAllLeaves));
router.get('/all-previous-leaves', auth(), awaitHandlerFactory(LeaveAppController.getAllPreviousLeaves));
router.get('/leaves-by-year', auth(), awaitHandlerFactory(LeaveAppController.getYearlyLiveById));
router.patch('/leave-update', auth(), awaitHandlerFactory(LeaveAppController.update));
router.delete('/leave-delete', auth(), awaitHandlerFactory(LeaveAppController.delete));
router.get('/get-notification', auth(), awaitHandlerFactory(NotificationController.getAllNotification));
router.patch('/update-notification', auth(), awaitHandlerFactory(NotificationController.updateNotification));
router.post('/add-notification', auth(), awaitHandlerFactory(NotificationController.createNotification));

router.get('/get-report', auth(), awaitHandlerFactory(ReportGenerateController.getReport));
router.get('/get-yearly-report', auth(), awaitHandlerFactory(ReportGenerateController.getYearlyReport));

router.post('/timestamp', auth(), awaitHandlerFactory(EmployeeController.timestamp));
router.patch('/timestamp', auth(), awaitHandlerFactory(EmployeeController.timestamp));


export default router;