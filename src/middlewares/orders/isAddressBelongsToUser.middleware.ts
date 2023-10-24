import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/AppError";

const prisma = new PrismaClient();

export const isAddressBelongsToUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.loginPayload.id;
    const { addressId } = req.body;
    
    const address = await prisma.address.findUnique({
        where: {
            id: addressId
        }
    });

    if(address?.userId !== userId) {
        throw new AppError("You do not have permission to delete this address.", 401);
    }

    return next();
};
