import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { LoginDto } from "../../dto/user/LoginDto";
import { AppError } from "../../errors/AppError";

const prisma = new PrismaClient();

export const isValidLogin = async (req: Request, res: Response, next: NextFunction) => {
    const data: LoginDto = req.body;
    
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: data.login },
                { cpf: data.login },
                { username: data.login },
                { phone: data.login }
            ]
        }
    });

    const isValidPassword = await compare(data.password, String(user?.password));

    if(!isValidPassword) {
        throw new AppError("Invalid user or password", 401);
    }
    
    return next();
};
