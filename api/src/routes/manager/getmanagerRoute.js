import express from 'express';
import getManagerDetails from '../../controllers/manager/getController.js';

const router = express.Router();

router.get('/manager/:id', getManagerDetails);

export default router;
