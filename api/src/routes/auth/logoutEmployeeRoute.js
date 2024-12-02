import express from "express";
import EmployeelogoutController from "../../controllers/employees/logoutController.js";

const route = express.Router();

route.post('/employee/logout',EmployeelogoutController);


export default route;
