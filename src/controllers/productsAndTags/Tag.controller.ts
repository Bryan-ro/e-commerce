import { Request, Response, Router } from "express";
import { TagService } from "../../services/producsAndTags/Tags.service";
import { CreateTagDto } from "../../dto/productAndTags/tag/CreateTagDto";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isManager } from "../../middlewares/users/roles/isManager.middleware";
import { isValidData } from "../../middlewares/productAndTags/tags/isValidData.middleware";

const service = new TagService();
const router = Router();

export class TagController {
    public routes () {
        router.post("/create", isLoggedIn, isManager, isValidData, this.create);

        return router;
    }

    private async create (req: Request, res: Response) {
        const data: CreateTagDto = req.body;

        const create = await service.createProduct(data);

        return res.status(create.statusCode).json({ ...create });
    }
}