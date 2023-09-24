import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/AppError";

const prisma = new PrismaClient();

export const isUserHasAddress = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.loginPayload.id;

    const userAddress = await prisma.address.findFirst({
        where: {
            userId: userId
        }
    });

    if(!userAddress) {
        throw new AppError("To create a credit card, the user needs to create a address");
    }

    return next();
};
