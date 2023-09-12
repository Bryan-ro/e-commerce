import { Request, Response, NextFunction } from "express";
import { LoginDto } from "../../dto/user/LoginDto";
import { AppError } from "../../errors/AppError";
import { ValidationConfig } from "../../validations/ValidationConfig";

const validations = new ValidationConfig();

export const isValidData = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"] as string;
    
    const [username, password] = (Buffer.from((header).split(" ")[1], "base64").toString("utf-8")).split(":");

    const errors = await validations.validate(LoginDto, { login: username, password: password });

    if(errors.errors.length > 0) {
        throw new AppError("Some values are not valid", 400, errors);   
    }

    return next();
};
