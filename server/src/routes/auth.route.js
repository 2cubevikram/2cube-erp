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

//User use
router.patch('/user/edit', auth(), (UploadMediaController.uplodMedia), awaitHandlerFactory(EmployeeController.edit));
router.get('/checkAttendance', auth(), awaitHandlerFactory(EmployeeController.checkAttendance));
router.get('/checkAllAttendance', auth(), awaitHandlerFactory(EmployeeController.checkAllAttendance));
router.post('/check-in', auth(), awaitHandlerFactory(EmployeeController.check_in));
router.patch('/check-out', auth(), awaitHandlerFactory(EmployeeController.check_out));
router.get('/check-in-status', auth(), awaitHandlerFactory(EmployeeController.checkInStatus));




export default router;