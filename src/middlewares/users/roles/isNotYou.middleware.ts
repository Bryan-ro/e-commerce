import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors/AppError";

const prisma = new PrismaClient();

export const isNotYou = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.loginPayload;
    const id = Number(req.params.id);
    
    const user = await prisma.user.findUnique({ where: { username: (payload as JwtPayload.payload).username }, select: { id: true } });

    if(user?.id === id) {
        throw new AppError("You're not authorized to make this request.", 401);
    }

    return next();
};
