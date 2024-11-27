import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './src/utils/db/db.js';
import loginRoute from "./src/routes/auth/loginManagerRoute.js";
import logoutRoute from "./src/routes/auth/logoutManagerRoute.js"
import getManagerRoute from "./src/routes/manager/getmanagerRoute.js"
import getAllEmployeesRoute from "./src/routes/employee/getallEmployeeRoute.js"
import registerEmployeeRoute from "./src/routes/employee/registerEmployee.js"
import workRoute from "./src/routes/work/workRoute.js"
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();

dbConnection();

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', loginRoute);

app.use('/api/auth',logoutRoute)

app.use('/api',getManagerRoute);

app.use('/api',getAllEmployeesRoute);

app.use('/api',registerEmployeeRoute);

app.use('/api',workRoute);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});
