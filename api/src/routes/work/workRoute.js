import express from "express";
import { createWork, uploadWork } from "../../controllers/work/workController.js";
import { getAllWorks, getWorkById, updateWorkById } from "../../controllers/work/getWorksController.js";

const router = express.Router();

router.post("/work", uploadWork, createWork);

router.get("/getworks",getAllWorks);

router.get("/works/:id",getWorkById);

router.patch("/works/:id",updateWorkById)

export default router;
