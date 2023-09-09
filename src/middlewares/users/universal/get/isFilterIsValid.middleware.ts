import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../../errors/AppError";

export const isFilterValid = async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.query;
        
    if(role === "MANAGER" || role === "EMPLOYEE" || role === "CUSTOMER" || role === undefined) {
        return next();
    }
    
    throw new AppError("Invalid role filter", 400);
};

