import express from "express";
import CreateJWT from "../../middlewares/manager/createJWT.js";
import loginController from "../../controllers/manager/loginController.js";
import { registerController } from "../../controllers/manager/registerController.js";
import { validateManager } from "../../middlewares/manager/validateManager.js";

const route = express.Router();

route.post('/login', CreateJWT, loginController);

route.post('/register',validateManager,registerController);

export default route;
