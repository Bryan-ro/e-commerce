import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/AppError";

const prisma = new PrismaClient();

export const isOrderExists = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = await prisma.order.findUnique({ where: { id: Number(id) } });

    if(!order) {
        throw new AppError("This order does not exist");
    }

    return next();
};
