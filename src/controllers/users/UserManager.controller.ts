import { Response, Request, Router } from "express";
import { UserManagerService } from "../../services/users/UserManager.service";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { isUserAlreadyExists } from "../../middlewares/users/create/isUserAlreadyExists.middleware";
import { isValidData } from "../../middlewares/users/create/isValidData.middleware";

const service = new UserManagerService();
const router = Router();

export class UserManagerController {
    public routes (): Router {
        router.post("/create", isValidData, isUserAlreadyExists, this.create);
        
        return router;
    }

    private async create (req: Request, res: Response) {
        const user: CreateUserDto = req.body;
        
        const creation = await service.create(user);

        return res.status(creation?.statusCode ?? 200).json({ ...creation });
    }
}

