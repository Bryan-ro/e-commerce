import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

export const isIdParamANumber = async (req: Request, res: Response, next: NextFunction) => {
    const id = +req.params.id;
    
    if(isNaN(Number(id))) {
        throw new AppError("Id param must be a number");
    } 

    return next();
};
