import { Request, Response, Router } from "express";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { UserEmployeeService } from "../../services/users/UserEmployee.service";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isValidData } from "../../middlewares/shared/isValidData.middleware";
import { isUserAlreadyExists } from "../../middlewares/users/universal/create/isUserAlreadyExists.middleware";
import { isManager } from "../../middlewares/users/roles/isManager.middleware";

const service = new UserEmployeeService();
const router = Router();


export class UserEmployeeController {
    public routes (): Router {
        router.post("/create", isLoggedIn, isManager , isValidData(CreateUserDto), isUserAlreadyExists, this.create);

        return router;
    }

    private async create (req: Request, res: Response) {
        const user: CreateUserDto = req.body;

        const creation = await service.create(user);

        return res.status(creation.statusCode).json({ ...creation });
    }
}
