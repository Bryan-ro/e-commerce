import { Request, Response, NextFunction } from "express";
import { CreateProductDto } from "../../../dto/productAndTags/product/CreateProductDto";
import { AppError } from "../../../errors/AppError";
import { ValidationConfig } from "../../../validations/ValidationConfig";

const validations = new ValidationConfig();

export const isValidData = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateProductDto = req.body;
    

    const errors = await validations.validate(CreateProductDto, data);

    if(errors.errors.length > 0) {
        throw new AppError("Some values are not valid", 400, errors);   
    }

    return next();
};
