import { Request, Response, Router } from "express";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { UserCustomerService } from "../../services/users/UserCustomer.service";
import { isValidData } from "../../middlewares/users/universal/create/isValidData.middleware";
import { isUserAlreadyExists } from "../../middlewares/users/universal/create/isUserAlreadyExists.middleware";

const service = new UserCustomerService();
const router = Router();


export class UserCustomerController {
    public routes (): Router {
        router.post("/create", isValidData, isUserAlreadyExists, this.create);

        return router;
    }

    private async create (req: Request, res: Response) {
        const user: CreateUserDto = req.body;

        const creation = await service.create(user);

        return res.status(creation.statusCode).json({ ...creation });
    }
}
