import { Response, Request, Router } from "express";
import { UserManagerService } from "../../services/users/UserManager.service";
import { ValidationConfig } from "../../configs/validations/ValidationConfig";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { AppError } from "../../errors/AppError";

const service = new UserManagerService();
const validations = new ValidationConfig();
const router = Router();

export class UserManagerController {
    public routes (): Router {
        router.post("/create", this.create);

        return router;
    }

    private async create (req: Request, res: Response) {
        const user: CreateUserDto = req.body;
        const errors = await validations.validate(CreateUserDto, user);

        if(errors.errors.length > 0) {
            throw new AppError("Some values are not valid", 400, errors);   
        }
        
        const creation = await service.create(user);

        return res.status(creation?.statusCode ?? 200).json({ ...creation });
    }
}

