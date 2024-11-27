import express from 'express';
import { registerEmployee } from '../../controllers/employees/registerEmployee.js';

const router = express.Router();

router.post('/registerEmployee',registerEmployee);

export default router;