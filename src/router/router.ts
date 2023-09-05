import { Router } from "express";
import { UserManagerController } from "../controllers/users/UserManager.controller";
import { LoginController } from "../controllers/users/Login.controller";
const router = Router();

router.use("/login", new LoginController().routes());
router.use("/management", new UserManagerController().routes());

export { router };
