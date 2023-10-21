import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/AppError";

const prisma = new PrismaClient();

export const isAddressExists = async (req: Request, res: Response, next: NextFunction) => {
    const { addressId } = req.body;

    const address = await prisma.address.findUnique({
        where: {
            id: addressId
        }
    });
    
    if(!address) {
        throw new AppError("Address does not exist", 400);
    }

    return next();
};
