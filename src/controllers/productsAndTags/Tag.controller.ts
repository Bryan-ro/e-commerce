import { Request, Response, Router } from "express";
import { TagService } from "../../services/producsAndTags/Tags.service";
import { CreateTagDto } from "../../dto/productAndTags/tag/CreateTagDto";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isManager } from "../../middlewares/users/roles/isManager.middleware";
import { isValidData } from "../../middlewares/shared/isValidData.middleware";
import { isTagAlreadyExists } from "../../middlewares/productAndTags/tags/isTagAlreadyExists.middleware";
import { isPageANumber } from "../../middlewares/shared/isPageANumber.middleware";

const service = new TagService();
const router = Router();

export class TagController {
    public routes () {
        router.get("/:page", isLoggedIn, isManager, isPageANumber, this.getTags);
        router.post("/create", isLoggedIn, isManager, isValidData(CreateTagDto), isTagAlreadyExists, this.create);

        return router;
    }

    private async getTags (req: Request, res: Response) {
        const page = +req.params.page;
        
        const tags = await service.getTags(page);
        

        return res.status(tags.statusCode).json({ ...tags });
    }

    private async create (req: Request, res: Response) {
        const data: CreateTagDto = req.body;

        const create = await service.createProduct(data);

        return res.status(create.statusCode).json({ ...create });
    }
}
