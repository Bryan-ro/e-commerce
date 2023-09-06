import { Request, Response, NextFunction } from "express";
import { UpdatePersonalDataDto } from "../../../../dto/user/UpdatePersonalDataDto";
import { AppError } from "../../../../errors/AppError";
import { ValidationConfig } from "../../../../validations/ValidationConfig";

const validations = new ValidationConfig();

export const isValidDataPersonalUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const data: UpdatePersonalDataDto =  req.body;

    const errors = await validations.validate(UpdatePersonalDataDto, data);

    if(errors.errors.length > 0) {
        throw new AppError("Some values are not valid", 400, errors);   
    }

    return next();
};
