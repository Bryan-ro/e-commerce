import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../../../../dto/user/CreateUserDto";
import { AppError } from "../../../../errors/AppError";

const prisma = new PrismaClient();

export const isUserAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateUserDto = req.body;
        
    const username = await prisma.user.findUnique({ where: { username: data.username } });
    const email = await prisma.user.findUnique({ where: { email: data.email } });
    const cpf = await prisma.user.findUnique({ where: { cpf: data.cpf } });
    const phone = await prisma.user.findUnique({ where: { phone: data.phone } });

    const isExists = 
        username ||
        email ||
        cpf ||
        phone ? true : false;

    if (isExists) {
        throw new AppError("This user already exists", 409);
    }

    return next();
};

