import { Request, Response, Router } from "express";
import { LoginDto } from "../../dto/user/LoginDto";
import { isValidData } from "../../middlewares/login/isValidData.middleware";
import { isValidLogin } from "../../middlewares/login/isValidLogin.middleware";
import { LoginService } from "../../services/users/Auth.service";
import { isUserExists } from "../../middlewares/login/forgotPass/isUserExists.middleware";

const service = new LoginService();
const router = Router();

export class LoginController {
    public routes () {
        router.post("/", isValidData, isValidLogin, this.login);
        router.post("/forgot-password/:login", isUserExists, this.requestForgotPassword);
        
        return router;
    }

    private async login (req: Request, res: Response) {
        const user: LoginDto = req.body;

        const login = await service.login(user.login);

        return res.status(login.statusCode).json({ ...login });
    }

    private async requestForgotPassword (req: Request, res: Response) {
        const login = req.params.login;

        const requestCode = await service.requestForgotPassword(login);

        return res.status(requestCode.statusCode).json({ ...requestCode });
    }
}
