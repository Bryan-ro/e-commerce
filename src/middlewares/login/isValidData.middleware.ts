import { Request, Response, NextFunction } from "express";
import { LoginDto } from "../../dto/user/LoginDto";
import { AppError } from "../../errors/AppError";
import { ValidationConfig } from "../../validations/ValidationConfig";

const validations = new ValidationConfig();

export const isValidData = async (req: Request, res: Response, next: NextFunction) => {
    const errors = await validations.validate(LoginDto, req.body);

    if(errors.errors.length > 0) {
        throw new AppError("Some values are not valid", 400, errors);   
    }

    return next();
};