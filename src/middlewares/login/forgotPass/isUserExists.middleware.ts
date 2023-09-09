import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors/AppError";

const prisma = new PrismaClient();

export const isUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const login = req.params.login;
        
    const user = await prisma.user.findFirst({ 
        where: {
            OR: [
                { email: login },
                { cpf: login },
                { username: login },
                { phone: login }
            ]
        }, 
        select: { username: true } 
    });

    if (!user?.username) {
        throw new AppError("This user does not exist", 400);
    }

    return next();
};

