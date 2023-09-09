import { Request, Response, NextFunction } from "express";
import { verify, JsonWebTokenError } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import env from "dotenv";
import { AppError } from "../../errors/AppError";
env.config();
const prisma = new PrismaClient();

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = String(req.headers.token);
    
    try {
        const payload = verify(jwtToken, String(process.env.JWT_TOKEN));

        const user = await prisma.user.findUnique({
            where: {
                id: (payload as JwtPayload.payload).id
            },
            select: {
                isActive: true
            }
        });

        if(!user?.isActive) {
            throw new Error();
        }

        req.loginPayload = payload;


        return next();  
    } catch (error) {
        if(error instanceof JsonWebTokenError) {
            throw new AppError("Invalid token", 498);
        } else {
            throw new AppError("Your user has been deactivated. For more information, please contact our support team.", 401);
        }
    }
};
