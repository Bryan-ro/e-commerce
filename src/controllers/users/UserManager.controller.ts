import { Response, Request, Router } from "express";
import { UserManagerService } from "../../services/users/UserManager.service";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { isUserAlreadyExists } from "../../middlewares/users/universal/create/isUserAlreadyExists.middleware";
import { isValidData } from "../../middlewares/shared/isValidData.middleware";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isManager } from "../../middlewares/users/roles/isManager.middleware";

const service = new UserManagerService();
const router = Router();

export class UserManagerController {
    public routes (): Router {
        router.post("/create", isLoggedIn, isManager, isValidData(CreateUserDto), isUserAlreadyExists, this.create);
        
        return router;
    }

    private async create (req: Request, res: Response) {
        const user: CreateUserDto = req.body;

        const creation = await service.create(user);

        return res.status(creation?.statusCode ?? 200).json({ ...creation });
    }
}

