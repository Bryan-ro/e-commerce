import { Request, Response, Router } from "express";
import { LoginDto } from "../../dto/user/LoginDto";
import { isValidData } from "../../middlewares/users/login/isValidData.middleware";
import { isValidLogin } from "../../middlewares/users/login/isValidLogin.middleware";
import { LoginService } from "../../services/users/Login.service";

const service = new LoginService();
const router = Router();

export class LoginController {
    public routes () {
        router.post("/", isValidData, isValidLogin, this.login);
        return router;
    }

    private async login (req: Request, res: Response) {
        const user: LoginDto = req.body;

        const login = await service.login(user.login);

        return res.status(login.statusCode).json({ ...login });
    }
}
