import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../../errors/AppError";

const prisma = new PrismaClient();

export const isUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
        
    const user = await prisma.user.findUnique({ where: { id }, select: { username: true } });

    if (!user?.username) {
        throw new AppError("This user does not exist", 400);
    }

    return next();
};

