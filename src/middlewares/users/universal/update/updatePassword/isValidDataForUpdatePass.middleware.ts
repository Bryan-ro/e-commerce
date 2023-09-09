import { Request, Response, NextFunction } from "express";
import { UpdatePasswordDto } from "../../../../../dto/user/UpdatePasswordDto";
import { AppError } from "../../../../../errors/AppError";
import { ValidationConfig } from "../../../../../validations/ValidationConfig";

const validations = new ValidationConfig();

export const isValidDataForUpdatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const data: UpdatePasswordDto =  req.body;

    const errors = await validations.validate(UpdatePasswordDto, data);

    if(errors.errors.length > 0) {
        throw new AppError("Some values are not valid", 400, errors);   
    }

    return next();
};
