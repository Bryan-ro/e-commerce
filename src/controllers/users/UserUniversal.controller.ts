import { Request, Response, Router } from "express";
import { UserUniversalService } from "../../services/users/UserUniversal.service";
import { UpdatePersonalDataDto } from "../../dto/user/UpdatePersonalDataDto";
import { isValidDataPersonalUpdate } from "../../middlewares/users/universal/update/isValidDataPersonalUpdate.middleware";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isNotEmployee } from "../../middlewares/users/roles/isNotEmployee.middleware";
import { isUserExists } from "../../middlewares/users/universal/get/isUserExists.middleware";
import { isManager } from "../../middlewares/users/roles/isManager.middleware";

const service = new UserUniversalService();
const router = Router();

export class UserUniversalController {
    public routes () {
        router.get("/get-user/:id", isLoggedIn, isManager, isUserExists, this.getOneUser);
        router.put("/update-personal-data", isLoggedIn, isNotEmployee, isValidDataPersonalUpdate, this.updatePersonalData);

        return router;
    }

    private async getOneUser (req: Request, res: Response) {
        const id = Number(req.params.id);

        const manager = await service.getOneUser(id);

        return res.status(manager.statusCode).json({ ...manager });
    }

    private async updatePersonalData(req: Request, res: Response) {
        const id = req.loginPayload.id;
        console.log(id);
        const user: UpdatePersonalDataDto = req.body;

        const update = await service.updatePersonalData(id, user);

        return res.status(update.statusCode).json({ ...update });
    } 
}
