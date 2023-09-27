import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/AppError";

const prisma = new PrismaClient();

export const isCreditCardBelongsToUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.loginPayload.id;
    const cardId = +req.params.id;
    
    const address = await prisma.creditCard.findUnique({
        where: {
            id: cardId
        }
    });

    if(address?.userId !== userId) {
        throw new AppError("You do not have permission to delete this card.", 401);
    }

    return next();
};
