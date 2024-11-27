import express from 'express';
import {  getAllEmployees } from '../../controllers/employees/getallEmployeesController.js';
import { getAllTeamLeaders } from '../../controllers/employees/getallEmployeesController.js';


const router = express.Router();

router.get('/employees',getAllEmployees);

router.get('/teamleaders',getAllTeamLeaders);


export default router;