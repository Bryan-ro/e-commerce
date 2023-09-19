import express from "express";
import { ErrorHandler } from "./errors/ErrorHandler";
import "express-async-errors";
import { router } from "./router/router";

const app = express();
app.use(express.json());
app.use(router);
app.use(ErrorHandler);

app.get("/", (req, res) => {
    res.json({ message: "You are gay e viadão tbm" });
});

export default app;
