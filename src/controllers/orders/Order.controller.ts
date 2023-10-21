import { Request, Response, Router } from "express";
import { OrderService } from "../../services/orders/Order.service";
import { CreateOrderDto } from "../../dto/order/CreateOrderDto";
import { isValidData } from "../../middlewares/shared/isValidData.middleware";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isAddressExists } from "../../middlewares/orders/isAddressExists.middleware";
import { isProductsExists } from "../../middlewares/orders/isProductsExists.middleware";

const service = new OrderService();
const router = Router();

export class OrderController {
    public routes () {
        router.post("/create", isLoggedIn, isValidData(CreateOrderDto), isProductsExists, isAddressExists, this.createOrder);

        return router;
    }

    private async createOrder (req: Request, res: Response) {
        const data: CreateOrderDto = req.body;
        const userId = req.loginPayload.id;

        const creation = await service.createOrder(data, userId);

        return res.status(creation.statusCode).json({ ...creation });
    }
}
