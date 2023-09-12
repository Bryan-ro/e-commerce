import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { AppError } from "../../errors/AppError";

const prisma = new PrismaClient();

export const isValidLogin = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"] as string;
    
    const credentials = Buffer.from((header).split(" ")[1], "base64").toString("utf-8");

    const [login, password] = credentials.split(":");

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: login },
                { cpf: login },
                { username: login },
                { phone: login }
            ]
        }
    });

    const isValidPassword = await compare(password, String(user?.password));
    
    if(!isValidPassword) {
        throw new AppError("Invalid user or password", 401);
    }

    if(!user?.isActive) {
        throw new AppError("Your user has been deactivated. For more information, please contact our support team.", 401);
    }

    req.userLogin = login;
    
    return next();
};
