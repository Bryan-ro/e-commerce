import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors/AppError";

const prisma = new PrismaClient();

export const isImageFromProduct = async (req: Request, res: Response, next: NextFunction) => {
    const imageUrl = req.params.imageUrl;
    const productId = +req.params.id;

    const image = await prisma.image.findUnique({
        where: {
            url: imageUrl,
            productId: productId
        }
    });
    
    if(!image) {
        throw new AppError("Image not exists", 400);
    }

    return next();
};
