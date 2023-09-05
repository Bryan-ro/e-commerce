import { Request, Response, Router } from "express";
import { LoginDto } from "../../dto/user/LoginDto";
import { LoginService } from "../../services/users/Login.service";

const service = new LoginService();
const router = Router();

export class LoginController {
    public routes () {
        router.post("/", this.login);
        return router;
    }

    private async login (req: Request, res: Response) {
        const user: LoginDto = req.body;

        const login = await service.login(user.login, user.password);

        return res.status(login.statusCode).json({ ...login });
    }
}
