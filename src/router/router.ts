import { Router } from "express";
import { UserManagerController } from "../controllers/users/UserManager.controller";
const router = Router();
const userManagerController = new UserManagerController();

router.use("/management", userManagerController.routes());

export { router };
