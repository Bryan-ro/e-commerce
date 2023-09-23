import express from "express";
import cors from "cors";
import { ErrorHandler } from "./errors/ErrorHandler";
import "express-async-errors";
import { router } from "./router/router";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(ErrorHandler);

export default app;
