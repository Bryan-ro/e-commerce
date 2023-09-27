import { Request, Response, Router } from "express";
import { CreditCardService } from "../services/CreditCard.service";
import { TokenizeCardDto } from "../dto/creditCard/TokenizeCardDto";
import { isLoggedIn } from "../middlewares/login/isLoggedIn.middleware";
import { isValidData } from "../middlewares/creditCard/isValidData.middleware";
import { isUserHasAddress } from "../middlewares/creditCard/isUserHasAddress.middleware";
import { isCreditCardAlreadyExistsInTheSameUser } from "../middlewares/creditCard/isCreditCardAlreadyExistsInTheSameUser.middleware";

const service = new CreditCardService();
const router = Router();

export class CreditCardController {
    public routes () {  
        router.post("/create", isLoggedIn, isUserHasAddress, isValidData, isCreditCardAlreadyExistsInTheSameUser, this.createCreditCard);

        return router;
    }

    private async createCreditCard (req: Request, res: Response) {
        const data: TokenizeCardDto = req.body;
        const userId = req.loginPayload.id;
        const ip = req.headers["x-forwarded-for"]?.toString();

        const creation = await service.createCard(data, userId, ip ?? "0.0.0.0");

        return res.status(creation.statusCode).json({ ...creation });
    }
}
