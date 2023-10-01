import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

export const isPageANumber = async (req: Request, res: Response, next: NextFunction) => {
    const page = +req.params.page;
    
    if(isNaN(Number(page))) {
        throw new AppError("Page must be a number");
    } 

    return next();
};
