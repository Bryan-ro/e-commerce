import { Request, Response, Router } from "express";
import { UserUniversalService } from "../../services/users/UserUniversal.service";
import { UpdatePersonalDataDto } from "../../dto/user/UpdatePersonalDataDto";
import { isValidDataPersonalUpdate } from "../../middlewares/users/universal/update/isValidDataPersonalUpdate.middleware";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isNotEmployee } from "../../middlewares/users/roles/isNotEmployee.middleware";
import { isUserExists } from "../../middlewares/users/universal/get/isUserExists.middleware";
import { isManager } from "../../middlewares/users/roles/isManager.middleware";
import { isNotOwnUser } from "../../middlewares/users/roles/isNotOwnUser.middleware";

const service = new UserUniversalService();
const router = Router();

export class UserUniversalController {
    public routes () {
        router.get("/get-user/:id", isLoggedIn, isManager, isUserExists, this.getOneUser);
        router.get("/get-own-profile", isLoggedIn, this.getOwnUser);
        router.put("/update-personal-data", isLoggedIn, isNotEmployee, isValidDataPersonalUpdate, this.updatePersonalData);
        router.delete("/delete/:id", isLoggedIn, isManager, isUserExists, isNotOwnUser, this.delete);

        return router;
    }

    private async getOneUser (req: Request, res: Response) {
        const id = Number(req.params.id);

        const manager = await service.getOneUser(id);

        return res.status(manager.statusCode).json({ ...manager });
    }

    private async getOwnUser (req: Request, res: Response) {
        const id = req.loginPayload.id;

        const ownUser = await service.getOwnUser(id);

        return res.status(ownUser.statusCode).json({ ...ownUser });
    }

    private async updatePersonalData(req: Request, res: Response) {
        const id = req.loginPayload.id;

        const user: UpdatePersonalDataDto = req.body;

        const update = await service.updatePersonalData(id, user);

        return res.status(update.statusCode).json({ ...update });
    } 

    private async delete (req: Request, res: Response) {
        const id = Number(req.params.id);

        const deleteUser = await service.deleteUser(id);

        return res.status(deleteUser.statusCode).json({ ...deleteUser });
    }
}
