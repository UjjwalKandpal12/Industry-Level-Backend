import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());



//import routers
import userRouter from "./routes/user.routes.js";

//route declarations
app.use("/api/v1/users", userRouter);

// Global error handler — SABSE LAST mein hona chahiye
app.use(errorHandler);

export { app };
