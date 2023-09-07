/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";


export function ErrorHandler (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message, ...err.otherMessage, statusCode: err.statusCode });
    }

    console.log(err);
    
    return res.status(500).json({ message: "Internal server error" }); 
}
