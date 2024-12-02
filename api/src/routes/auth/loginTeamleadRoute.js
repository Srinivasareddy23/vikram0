import express from 'express';
import CreateJWT from '../../middlewares/employees/createJWT.js';
import loginController from '../../controllers/employees/loginController.js';

const router = express.Router();

router.post('/teamlead',CreateJWT,loginController);

export default router;

