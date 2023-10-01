import { Request, Response, Router } from "express";
import { UserUniversalService } from "../../services/users/UserUniversal.service";
import { UpdatePersonalDataDto } from "../../dto/user/UpdatePersonalDataDto";
import { isValidData } from "../../middlewares/shared/isValidData.middleware";
import { isLoggedIn } from "../../middlewares/login/isLoggedIn.middleware";
import { isNotEmployee } from "../../middlewares/users/roles/isNotEmployee.middleware";
import { isUserExists } from "../../middlewares/users/universal/get/isUserExists.middleware";
import { isManager } from "../../middlewares/users/roles/isManager.middleware";
import { isNotOwnUser } from "../../middlewares/users/roles/isNotOwnUser.middleware";
import { UpdatePasswordDto } from "../../dto/user/UpdatePasswordDto";
import { isValidCurrentPassword } from "../../middlewares/users/universal/update/updatePassword/isValidCurrentPassword.middleware";
import { isFilterValid } from "../../middlewares/users/universal/get/isFilterIsValid.middleware";
import { isPageANumber } from "../../middlewares/shared/isPageANumber.middleware";

const service = new UserUniversalService();
const router = Router();

export class UserUniversalController {
    public routes () {
        router.get("/get-user/:id", isLoggedIn, isManager, isUserExists, this.getOneUser);
        router.get("/get-own-profile", isLoggedIn, this.getOwnUser);
        router.get("/get-filter/:page", isLoggedIn, isManager, isPageANumber, isFilterValid, this.getUserByRoleAndIsActiveFilter);
        router.patch("/update-personal-data", isLoggedIn, isNotEmployee, isValidData(UpdatePersonalDataDto), this.updatePersonalData);
        router.patch("/update-own-password", isLoggedIn, isValidData(UpdatePasswordDto), isValidCurrentPassword, this.updateOwnPassword);
        router.put("/disable/:id", isLoggedIn, isManager, isUserExists, isNotOwnUser, this.disable);
        router.put("/active/:id", isLoggedIn, isManager, isUserExists, this.active);

        return router;
    }

    private async getUserByRoleAndIsActiveFilter (req: Request, res: Response) {
        const { isActive, role } = req.query;
        const page = +req.params.page;
        const isActiveBol = isActive === "false" ?  false : true;

        const users = await service.getUserByRoleAndIsActiveFilter(role as "MANAGER" | "CUSTOMER" | "EMPLOYEE", isActiveBol, page);

        return res.status(users.statusCode).json({ ...users });
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

    private async updateOwnPassword (req: Request, res: Response) {
        const id = req.loginPayload.id;
        const data: UpdatePasswordDto = req.body;

        const change = await service.updateOwnPassword(data, id);

        return res.status(change.statusCode).json({ ...change });
    }

    private async disable (req: Request, res: Response) {
        const id = Number(req.params.id);

        const disableUser = await service.disableUser(id);

        return res.status(disableUser.statusCode).json({ ...disableUser });
    }

    private async active (req: Request, res: Response) {
        const id = Number(req.params.id);

        const activeUser = await service.activeUser(id);

        return res.status(activeUser.statusCode).json({ ...activeUser });
    }
}
