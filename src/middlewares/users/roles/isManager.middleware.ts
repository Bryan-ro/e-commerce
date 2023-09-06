import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../errors/AppError";

const prisma = new PrismaClient();

export const isManager = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.loginPayload;
    
    const user = await prisma.user.findUnique({ where: { username: (payload as JwtPayload.payload).username }, select: { role: true } });

    if(user?.role !== "MANAGER") {
        throw new AppError("You're not authorized to make this request.", 401);
    }

    return next();
};
