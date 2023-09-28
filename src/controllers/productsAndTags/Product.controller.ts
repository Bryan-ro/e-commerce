import { Request, Response, Router } from "express";
import { ProductService } from "../../services/producsAndTags/Product.service";
import { CreateProductDto } from "../../dto/productAndTags/product/CreateProductDto";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isManager } from "../../middlewares/users/roles/isManager.middleware";
import { isValidData } from "../../middlewares/productAndTags/products/isValidData.middleware";

const service = new ProductService();
const router = Router();

export class ProductController {
    public routes () {
        router.get("/:page", this.getProducts);
        router.post("/create", isLoggedIn, isManager, isValidData, this.create);

        return router;
    }

    private async getProducts (req: Request, res: Response) {
        const page = +req.params.page;

        const products = await service.getProduct(page);

        return res.status(products.statusCode).json({ ...products });
    }

    private async create (req: Request, res: Response) {
        const data: CreateProductDto = req.body;
        const userId = req.loginPayload.id;

        const create = await service.createProduct(data, userId);

        return res.status(create.statusCode).json({ ...create });
    }
}
