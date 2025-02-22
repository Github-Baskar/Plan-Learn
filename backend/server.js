import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from 'cors';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import studyPlanRoutes from './routes/studyPlanRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors({
    origin: process.env.ORIGIN_BASE_URL,
    credentials: true,
}));
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/study-plan', studyPlanRoutes)

app.get("/", (req, res) => res.send("Server is running..."));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));