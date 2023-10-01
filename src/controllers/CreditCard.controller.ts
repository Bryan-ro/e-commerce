import { Request, Response, Router } from "express";
import { CreditCardService } from "../services/CreditCard.service";
import { TokenizeCardDto } from "../dto/creditCard/TokenizeCardDto";
import { isLoggedIn } from "../middlewares/login/isLoggedIn.middleware";
import { isValidData } from "../middlewares/shared/isValidData.middleware";
import { isUserHasAddress } from "../middlewares/creditCard/isUserHasAddress.middleware";
import { isCreditCardAlreadyExistsInTheSameUser } from "../middlewares/creditCard/isCreditCardAlreadyExistsInTheSameUser.middleware";
import { isCreditCardBelongsToUser } from "../middlewares/creditCard/isCreditCardBelongsToUser.middleware";
import { isCardExists } from "../middlewares/creditCard/isCardExists.middleware";

const service = new CreditCardService();
const router = Router();

export class CreditCardController {
    public routes () {  
        router.get("/", isLoggedIn, this.getOwnCards);
        router.post("/create", isLoggedIn, isUserHasAddress, isValidData(TokenizeCardDto), isCreditCardAlreadyExistsInTheSameUser, this.createCreditCard);
        router.delete("/delete/:id", isLoggedIn, isCardExists, isCreditCardBelongsToUser, this.deleteCreditCard);

        return router;
    }

    private async getOwnCards (req: Request, res: Response) {
        const userId = req.loginPayload.id;

        const cards = await service.getOwnCreditCards(userId);

        return res.status(cards.statusCode).json({ ...cards });
    }

    private async createCreditCard (req: Request, res: Response) {
        const data: TokenizeCardDto = req.body;
        const userId = req.loginPayload.id;
        const ip = req.headers["x-forwarded-for"]?.toString();

        const creation = await service.createCard(data, userId, ip ?? "0.0.0.0");

        return res.status(creation.statusCode).json({ ...creation });
    }

    private async deleteCreditCard (req: Request, res: Response) {
        const userId = req.loginPayload.id;
        const cardId = +req.params.id;

        const deleteFunc = await service.deleteCreditCard(cardId, userId);

        return res.status(deleteFunc.statusCode).json({ ...deleteFunc });
    }
}
