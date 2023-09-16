import { Request, Response, Router } from "express";
import { AddressService } from "../services/Address.service";
import { CreateAddressDto } from "../dto/address/CreateAdressDto";
import { isLoggedIn } from "../middlewares/login/isLoggedIn.middleware";
import { isAddressExists } from "../middlewares/address/isAddressExists.middleware";
import { isValidData } from "../middlewares/address/isValidData.middleware";

const service = new AddressService();
const router = Router();

export class AddressController {
    public routes () {
        router.get("/", isLoggedIn, this.getOwnAddress);
        router.post("/create", isLoggedIn, isValidData,  isAddressExists, this.create);

        return router;
    }

    private async getOwnAddress (req: Request, res: Response) {
        const userId = req.loginPayload.id;

        const address = await service.getOwnAddress(userId);

        return res.status(res.statusCode).json({ ...address });
    }

    private async create (req: Request, res: Response) {
        const data: CreateAddressDto = req.body;
        const id: number = req.loginPayload.id;

        const creation = await service.create(data, id);

        return res.status(creation.statusCode).json({ ...creation });
    }
}
