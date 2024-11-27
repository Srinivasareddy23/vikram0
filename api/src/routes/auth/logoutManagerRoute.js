import express from "express";
import logoutController from "../../controllers/manager/logoutController.js";

const route = express.Router();

route.post('/logout',logoutController);


export default route;
