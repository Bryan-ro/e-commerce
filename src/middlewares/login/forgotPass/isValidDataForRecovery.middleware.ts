import { Request, Response, NextFunction } from "express";
import { RecoveryPassDto } from "../../../dto/user/RecoveryPassDto";
import { AppError } from "../../../errors/AppError";
import { ValidationConfig } from "../../../validations/ValidationConfig";

const validations = new ValidationConfig();

export const isValidDataForRecovery = async (req: Request, res: Response, next: NextFunction) => {
    const errors = await validations.validate(RecoveryPassDto, req.body);

    if(errors.errors.length > 0) {
        throw new AppError("Some values are not valid", 400, errors);   
    }

    return next();
};
