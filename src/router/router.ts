import { Router } from "express";
import { UserManagerController } from "../controllers/users/UserManager.controller";
import { LoginController } from "../controllers/users/Auth.controller";
import { UserUniversalController } from "../controllers/users/UserUniversal.controller";
import { UserEmployeeController } from "../controllers/users/UserEmployee.controller";
import { UserCustomerController } from "../controllers/users/UserCustomer.controller";
import { AddressController } from "../controllers/Address.controller";
import { CreditCardController } from "../controllers/CreditCard.controller";
import { ProductController } from "../controllers/productsAndTags/Product.controller";
import { TagController } from "../controllers/productsAndTags/Tag.controller";
const router = Router();

router.use("/login", new LoginController().routes());
router.use("/manager", new UserManagerController().routes());
router.use("/employees", new UserEmployeeController().routes());
router.use("/customers", new UserCustomerController().routes());
router.use("/universal", new UserUniversalController().routes());
router.use("/address", new AddressController().routes());
router.use("/credit-card", new CreditCardController().routes());
router.use("/products", new ProductController().routes());
router.use("/tags", new TagController().routes());

export { router };
