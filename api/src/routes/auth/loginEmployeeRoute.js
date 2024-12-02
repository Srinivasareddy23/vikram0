import express from 'express';
import EmployeeCreateJWT from '../../middlewares/employees/createEmployeeJwt.js';
import EmployeeloginController from '../../controllers/employees/loginEmployeeController.js';

const router = express.Router();

router.post('/employee',EmployeeCreateJWT,EmployeeloginController);

export default router;

