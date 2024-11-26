import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './src/utils/db/db.js';
import loginRoute from "./src/routes/auth/loginManagerRoute.js";

dotenv.config();

dbConnection();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', loginRoute);

app.use('/api/auth',loginRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});
