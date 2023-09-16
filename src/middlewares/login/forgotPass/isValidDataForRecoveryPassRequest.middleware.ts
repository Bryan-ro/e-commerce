import { Request, Response, NextFunction } from "express";
import { RequestRecoveryPassDto } from "../../../dto/user/RequestRecoveryPassDto";
import { AppError } from "../../../errors/AppError";
import { ValidationConfig } from "../../../validations/ValidationConfig";

const validations = new ValidationConfig();

export const isValidDataForRecoveryPassRequest = async (req: Request, res: Response, next: NextFunction) => {
    const errors = await validations.validate(RequestRecoveryPassDto, { login: req.params.login });

    if(errors.errors.length > 0) {
        throw new AppError("Some values are not valid", 400, errors);   
    }

    return next();
};
