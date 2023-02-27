import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as middlewares from "./middlewares";
import api from "./api";
import MessageResponse from "./interfaces/MessageResponse";
import csrf from "csurf";
require("dotenv").config();

const app = express();
const csrfProtection = csrf({
  cookie: {
    key: "_csrf-poc",
    httpOnly: true,
    maxAge: 3600, // 1-hour
  },
});

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(csrfProtection);

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
