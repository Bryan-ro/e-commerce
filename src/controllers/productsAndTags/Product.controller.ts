import { Request, Response, Router } from "express";
import { ProductService } from "../../services/producsAndTags/Product.service";
import { CreateProductDto } from "../../dto/productAndTags/product/CreateProductDto";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isValidData } from "../../middlewares/shared/isValidData.middleware";
import { isProductExists } from "../../middlewares/productAndTags/products/isProductExists.middleware";
import { upload } from "../../middlewares/multerMiddleware/multer.middleware";
import { isPageANumber } from "../../middlewares/shared/isPageANumber.middleware";
import { isTagExists } from "../../middlewares/productAndTags/products/isTagsExists.middleware";
import { isIdParamANumber } from "../../middlewares/shared/isIdParamANumber.middleware";
import { UpdateProductDto } from "../../dto/productAndTags/product/updateProductDto";
import { isEmployeeOrManager } from "../../middlewares/users/roles/isEmployeeOrManager.middleware";

const service = new ProductService();
const router = Router();

export class ProductController {
    public routes () {
        router.get("/filter/:page", isPageANumber, this.getProducts);
        router.get("/:id", isIdParamANumber, isProductExists, this.getProductById);
        router.post("/create", isLoggedIn, isEmployeeOrManager, isValidData(CreateProductDto), isTagExists, this.create);
        router.post("/images/:id", isLoggedIn, isEmployeeOrManager, isProductExists, upload.array("image"), this.uploadImages);
        router.patch("/:id", isLoggedIn, isEmployeeOrManager, isIdParamANumber,  isProductExists, this.enableProduct);
        router.patch("/:id", isLoggedIn, isEmployeeOrManager, isIdParamANumber, isProductExists, this.disableProduct);
        router.put("/update/:id", isLoggedIn, isEmployeeOrManager, isIdParamANumber, isProductExists, this.updateProduct);

        return router;
    }

    private async getProducts (req: Request, res: Response) {
        const page = +req.params.page;
        const { search, priceLimit } = req.query;
        const HttpOrHttps = req.secure ? "https://" : "http://";
        const serverUrl = req.headers.host;

        const products = await service.getProduct(page, HttpOrHttps + serverUrl, search?.toString(), Number(priceLimit));

        return res.status(products.statusCode).json({ ...products });
    }   

    private async getProductById (req: Request, res: Response) {
        const productId = +req.params.id;
        const HttpOrHttps = req.secure ? "https://" : "http://";
        const serverUrl = req.headers.host;

        const product = await service.getProductById(productId, HttpOrHttps + serverUrl);

        return res.status(product.statusCode).json({ ...product });
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

    private async updateProduct (req: Request, res: Response) {
        const productId = +req.params.id;
        const data: UpdateProductDto = req.body;

        const update = await service.updateProduct(productId, data);

        return res.status(update.statusCode).json({ ...update });
    }

    private async disableProduct (req: Request, res: Response) {
        const productId = +req.params.id;

        const deletion = await service.disableProduct(productId);

        return res.status(deletion.statusCode).json({ ...deletion });
    }
    
    private async enableProduct (req: Request, res: Response) {
        const productId = +req.params.id;

        const deletion = await service.enableProduct(productId);

        return res.status(deletion.statusCode).json({ ...deletion });
    }
}
