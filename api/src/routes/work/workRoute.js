import express from "express";
import { createWork, uploadWork } from "../../controllers/work/workController.js";
import { getAllWorks } from "../../controllers/work/getWorksController.js";

const router = express.Router();

router.post("/work", uploadWork, createWork);

router.get("/getworks",getAllWorks);

export default router;
