import { Request, Response, NextFunction } from "express";
import { verify, JsonWebTokenError } from "jsonwebtoken";
import env from "dotenv";
import { AppError } from "../../errors/AppError";
env.config();

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = String(req.headers.token);

    try {
        const payload = verify(jwtToken, String(process.env.JWT_TOKEN));

        req.loginPayload = payload;

        return next();  
    } catch (error) {
        if(error instanceof JsonWebTokenError) {
            throw new AppError("Invalid token", 401);
        }
    }
};
