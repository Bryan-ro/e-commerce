import { Router } from "express";
import { UserManagerController } from "../controllers/users/UserManager.controller";
import { LoginController } from "../controllers/users/Auth.controller";
import { UserUniversalController } from "../controllers/users/UserUniversal.controller";
import { UserEmployeeController } from "../controllers/users/UserEmployee.controller";
import { UserCustomerController } from "../controllers/users/UserCustomer.controller";
import { AddressController } from "../controllers/Address.controller";
import { ProductController } from "../controllers/productsAndTags/Product.controller";
import { TagController } from "../controllers/productsAndTags/Tag.controller";
import { OrderController } from "../controllers/orders/Order.controller";
import { PaymentController } from "../controllers/orders/Payment.controller";
const router = Router();

router.use("/login", new LoginController().routes());
router.use("/manager", new UserManagerController().routes());
router.use("/employees", new UserEmployeeController().routes());
router.use("/costumers", new UserCustomerController().routes());
router.use("/universal", new UserUniversalController().routes());
router.use("/address", new AddressController().routes());
router.use("/products", new ProductController().routes());
router.use("/tags", new TagController().routes());
router.use("/orders", new OrderController().routes());
router.use("/payment", new PaymentController().routes());

export { router };
