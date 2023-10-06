import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { TokenizeCardDto } from "../../dto/creditCard/CardCreationDto";

const prisma = new PrismaClient();

export const isCreditCardAlreadyExistsInTheSameUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.loginPayload.id;
    const card: TokenizeCardDto = req.body; 

    const userCard = await prisma.creditCard.findFirst({
        where: {
            userId: userId,
            lastCardDigits: `
            ${card.number[card.number.length - 1]}${card.number[card.number.length - 2]}${card.number[card.number.length - 3]}${card.number[card.number.length - 4]}`
        }
    }); 

    if(userCard) {
        throw new AppError("Card already exists.");
    }

    return next();
};
