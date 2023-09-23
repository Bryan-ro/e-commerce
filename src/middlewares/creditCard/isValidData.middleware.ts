import { Request, Response, NextFunction } from "express";
import { TokenizeCardDto } from "../../dto/creditCard/TokenizeCardDto";
import { AppError } from "../../errors/AppError";
import { ValidationConfig } from "../../validations/ValidationConfig";

const validations = new ValidationConfig();

export const isValidData = async (req: Request, res: Response, next: NextFunction) => {
    const data: TokenizeCardDto =  req.body;

    const errors = await validations.validate(TokenizeCardDto, data);

    if(errors.errors.length > 0) {
        throw new AppError("Some values are not valid", 400, errors);   
    }

    return next();
};
