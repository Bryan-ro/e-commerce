import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { CreateOrderDto } from "../../dto/order/CreateOrderDto";

const prisma = new PrismaClient();

export const isProductsExists = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateOrderDto = req.body;
    
    for(const i of data.orderItem) {
        const product = await prisma.product.findUnique({
            where: {
                id: i.productId
            }
        });

        if(!product) {
            throw new AppError("Some product does not exist", 400);
        }
    } 
    
    return next();
};
