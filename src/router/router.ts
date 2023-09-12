import { Router } from "express";
import { UserManagerController } from "../controllers/users/UserManager.controller";
import { LoginController } from "../controllers/users/Auth.controller";
import { UserUniversalController } from "../controllers/users/UserUniversal.controller";
import { UserEmployeeController } from "../controllers/users/UserEmployee.controller";
import { UserCustomerController } from "../controllers/users/UserCustomer.controller";
const router = Router();

router.use("/login", new LoginController().routes());
router.use("/manager", new UserManagerController().routes());
router.use("/employees", new UserEmployeeController().routes());
router.use("/customers", new UserCustomerController().routes());
router.use("/universal", new UserUniversalController().routes());

export { router };
