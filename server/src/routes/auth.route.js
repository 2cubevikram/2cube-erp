import express from 'express';

import auth from '../middlewares/auth.middleware.js';
import awaitHandlerFactory from '../middlewares/awaitHandlerFactory.middleware.js';
import AdminController from '../controllers/admin.contoller.js';
import EmployeeController from '../controllers/employee.controller.js';
import UploadMediaController from '../controllers/upload_media.controller.js';
import LeaveAppController from "../controllers/leave_app_controller.js";
import NotificationController from "../controllers/notification.controller.js";


const router = express.Router();
// Admin Use
router.post('/register', awaitHandlerFactory(AdminController.register));
router.post('/login', awaitHandlerFactory(AdminController.login));
router.patch('/edit', auth(), awaitHandlerFactory(AdminController.edit));
router.get('/employees', auth(), awaitHandlerFactory(AdminController.getAllEmployee));
router.get('/id/:id', auth(), awaitHandlerFactory(AdminController.getEmployeeById));
router.get('/employees/profile/:id', auth(), awaitHandlerFactory(AdminController.getEmployeeById));
router.patch('/check-time-edit', auth(), awaitHandlerFactory(AdminController.checkTimeUpdate));
router.patch('/break-time-edit', auth(), awaitHandlerFactory(AdminController.breakTimeUpdate));
router.get('/to-day', auth(), awaitHandlerFactory(AdminController.to_day))
router.get('/get-birthday', auth(), awaitHandlerFactory(AdminController.getBirthday));


//Employee use
router.patch('/add', auth(), (UploadMediaController.uplodMedia), awaitHandlerFactory(EmployeeController.add_data));
router.get('/checkAttendance', auth(), awaitHandlerFactory(EmployeeController.checkAttendance));
router.get('/check-in-status', auth(), awaitHandlerFactory(EmployeeController.checkInStatus));
router.get('/break-count', auth(), awaitHandlerFactory(EmployeeController.break_calculation));
router.get('/break-status', auth(), awaitHandlerFactory(EmployeeController.break_status));
router.post('/leave-applied', auth(), awaitHandlerFactory(LeaveAppController.create));
router.get('/leave-by-id', auth(), awaitHandlerFactory(LeaveAppController.getLeavesById));
router.get('/all-leaves', auth(), awaitHandlerFactory(LeaveAppController.getAllLeaves));
router.patch('/leave-update', auth(), awaitHandlerFactory(LeaveAppController.update));
router.get('/get-notification', auth(), awaitHandlerFactory(NotificationController.getAllNotification));


router.post('/timestamp', auth(), awaitHandlerFactory(EmployeeController.timestamp));
router.patch('/timestamp', auth(), awaitHandlerFactory(EmployeeController.timestamp));


export default router;