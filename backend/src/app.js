import express from "express";

import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.middleware.js";
import ApiError from "./utils/apiError.js";

const app = express();

const API_BASE_URL = process.env.API_BASE_URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [API_BASE_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    exposedHeaders: ["Set-Cookie", "*"],
  }),
);
app.use(cookieParser());
app.use(express.static("public"));

// import routers
import goalRouter from "./routes/goal.routes.js";
import healthCheckRouter from "./routes/health.routes.js";
import userRouter from "./routes/user.routes.js";

// routes the related routes :
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/goals", goalRouter);

app.use((req, res, next) => {
  return next(
    new ApiError(
      404,
      `Route ${req.originalUrl} for specified method not found`,
    ),
  );
});

app.use(errorHandler);
export default app;
