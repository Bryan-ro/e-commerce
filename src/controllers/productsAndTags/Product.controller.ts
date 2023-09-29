import { Request, Response, Router } from "express";
import { ProductService } from "../../services/producsAndTags/Product.service";
import { CreateProductDto } from "../../dto/productAndTags/product/CreateProductDto";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isManager } from "../../middlewares/users/roles/isManager.middleware";
import { isValidData } from "../../middlewares/productAndTags/products/isValidData.middleware";
import { upload } from "../../middlewares/multerMiddleware/multer.middleware";

const service = new ProductService();
const router = Router();

export class ProductController {
    public routes () {
        router.get("/:page", this.getProducts);
        router.post("/create", isLoggedIn, isManager, isValidData, this.create);
        router.post("/images/:id", isLoggedIn, isManager, upload.array("image"), this.uploadImages);

        return router;
    }

    private async getProducts (req: Request, res: Response) {
        const page = +req.params.page;
        const HttpOrHttps = req.secure ? "https://" : "http://";
        const serverUrl = req.headers.host;

        const products = await service.getProduct(page, HttpOrHttps + serverUrl);

        return res.status(products.statusCode).json({ ...products });
    }

    private async create (req: Request, res: Response) {
        const data: CreateProductDto = req.body;
        const userId = req.loginPayload.id;

        const create = await service.createProduct(data, userId);

        return res.status(create.statusCode).json({ ...create });
    }

    private async uploadImages (req: Request, res: Response) {
        const images = req.files;
        const productId = +req.params.id;
        
        const upload = await service.uploadImages(images as multerTypes.file[], productId);

        return res.status(upload.statusCode).json({ ...upload });
    }
}
