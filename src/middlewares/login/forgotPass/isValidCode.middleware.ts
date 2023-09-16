import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { get } from "memory-cache";
import { AppError } from "../../../errors/AppError";
import { RecoveryPassDto } from "../../../dto/user/RecoveryPassDto";

const prisma = new PrismaClient();

export const isvalidCode = async (req: Request, res: Response, next: NextFunction) => {
    const data: RecoveryPassDto = req.body;

    const token = get(data.login);
    console.log(token);
    const user = await prisma.user.findFirst({ 
        where: {
            OR: [
                { email: data.login },
                { cpf: data.login },
                { username: data.login },
                { phone: data.login }
            ]
        }, 
        select: { id: true } 
    });

    if(!user?.id || data.verificationCode !== token) {
        throw new AppError("Invalid recovery code", 401);
    }

    return next();
};
