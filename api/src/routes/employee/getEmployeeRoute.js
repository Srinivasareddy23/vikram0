import express from 'express';
import getTeamleadDetails from '../../controllers/employees/getteamleadController.js';

const router = express.Router();

router.get('/teamlead/:id', getTeamleadDetails);

export default router;
