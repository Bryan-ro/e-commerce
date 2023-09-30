import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/AppError";

const prisma = new PrismaClient();

export const isCardExists = async (req: Request, res: Response, next: NextFunction) => {
    const cardId = +req.params.id;

    const address = await prisma.creditCard.findUnique({
        where: {
            id: cardId
        }
    });
    
    if(!address) {
        throw new AppError("Card does not exist", 400);
    }

    return next();
};
