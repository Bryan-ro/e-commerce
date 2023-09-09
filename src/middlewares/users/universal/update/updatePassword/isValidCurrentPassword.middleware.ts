import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { UpdatePasswordDto } from "../../../../../dto/user/UpdatePasswordDto";
import { AppError } from "../../../../../errors/AppError"; 

const prisma = new PrismaClient();

export const isValidCurrentPassword = async (req: Request, res: Response, next: NextFunction) => {
    const data: UpdatePasswordDto = req.body;
    
    const user = await prisma.user.findUnique({
        where: {
            id: req.loginPayload.id
        }
    });

    const isValidPassword = await compare(data.currentPassword, String(user?.password));
    
    if(!isValidPassword) {
        throw new AppError("Current password does not match.", 401);
    }
    
    return next();
};
