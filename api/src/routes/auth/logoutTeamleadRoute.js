import express from "express";
import logoutController from "../../controllers/employees/logoutController.js";

const route = express.Router();

route.post('/teamlead/logout',logoutController);


export default route;
