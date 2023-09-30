import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors/AppError";

const prisma = new PrismaClient();

export const isProductExists = async (req: Request, res: Response, next: NextFunction) => {
    const productId = +req.params.id;

    const address = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });
    
    if(!address) {
        throw new AppError("Product does not exist", 400);
    }

    return next();
};
