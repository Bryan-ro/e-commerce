import { Request, Response, Router } from "express";
import { isValidDataToLogin } from "../../middlewares/login/isValidDataToLogin.middleware";
import { isValidData } from "../../middlewares/shared/isValidData.middleware";
import { isValidLogin } from "../../middlewares/login/isValidLogin.middleware";
import { LoginService } from "../../services/users/Auth.service";
import { isUserExists } from "../../middlewares/login/forgotPass/isUserExists.middleware";
import { RecoveryPassDto } from "../../dto/user/RecoveryPassDto";
import { isvalidCode } from "../../middlewares/login/forgotPass/isValidCode.middleware";
import { isValidDataForRecoveryPassRequest } from "../../middlewares/login/forgotPass/isValidDataForRecoveryPassRequest.middleware";

const service = new LoginService();
const router = Router();

export class LoginController {
    public routes () {
        router.post("/", isValidDataToLogin, isValidLogin, this.login);
        router.post("/forgot-password/:login", isValidDataForRecoveryPassRequest, isUserExists, this.requestForgotPassword);
        router.patch("/recovery-password", isValidData(RecoveryPassDto), isvalidCode, this.forgotPasswordChange);
        
        return router;
    }

    private async login (req: Request, res: Response) {
        const login = await service.login(req.userLogin as string);

        return res.status(login.statusCode).json({ ...login });
    }

    private async requestForgotPassword (req: Request, res: Response) {
        const email = req.params.login;

        const requestCode = await service.requestForgotPassword(email);

        return res.status(requestCode.statusCode).json({ ...requestCode });
    }

    private async forgotPasswordChange (req: Request, res: Response) {
        const data: RecoveryPassDto = req.body;

        const change = await service.forgotPasswordChange(data);

        return res.status(change.statusCode).json({ ...change });

    }
}
