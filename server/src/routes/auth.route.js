import express from 'express';

import awaitHandlerFactory from '../middlewares/awaitHandlerFactory.middleware.js';
import AdminController from '../controllers/admin.contoller.js';
import EmployeeController from '../controllers/employee.controller.js';
import auth from '../middlewares/auth.middleware.js';
import UploadMediaController from '../controllers/upload_media.controller.js';


const router = express.Router();
// Admin Use
router.post('/register', awaitHandlerFactory(AdminController.register));
router.post('/login', awaitHandlerFactory(AdminController.login));
router.patch('/edit', auth(), awaitHandlerFactory(AdminController.edit));
router.get('/employees', auth(), awaitHandlerFactory(AdminController.getAllEmployee));
router.get('/id/:id', auth(), awaitHandlerFactory(AdminController.getEmployeeById));
router.patch('/check-time-edit', auth(), awaitHandlerFactory(AdminController.checkTimeUpdate));
router.patch('/break-time-edit', auth(), awaitHandlerFactory(AdminController.breakTimeUpdate));

//User use
router.patch('/user/edit', auth(), (UploadMediaController.uplodMedia), awaitHandlerFactory(EmployeeController.edit));
router.get('/checkAttendance', auth(), awaitHandlerFactory(EmployeeController.checkAttendance));
router.get('/check-in-status', auth(), awaitHandlerFactory(EmployeeController.checkInStatus));
router.get('/break-count', auth(), awaitHandlerFactory(EmployeeController.break_calculation));
router.get('/break-status', auth(), awaitHandlerFactory(EmployeeController.break_status));



router.post('/timestamp', auth(), awaitHandlerFactory(EmployeeController.timestamp));
router.patch('/timestamp', auth(), awaitHandlerFactory(EmployeeController.timestamp));




export default router;