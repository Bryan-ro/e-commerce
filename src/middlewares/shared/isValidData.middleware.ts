import { Request, Response, NextFunction } from "express";
import { ClassConstructor } from "class-transformer";
import { AppError } from "../../errors/AppError";
import { ValidationConfig } from "../../validations/ValidationConfig";

const validations = new ValidationConfig();

export const isValidData = (dto: ClassConstructor<unknown>) => async function (req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    
    const errors = await validations.validate(dto, data);

    if (errors.errors.length > 0) {
        throw new AppError("Some values are not valid", 400, errors);   
    }

    return next();
};

