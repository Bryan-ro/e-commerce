import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateProductDto } from "../../../dto/productAndTags/product/CreateProductDto";
import { AppError } from "../../../errors/AppError";

const prisma = new PrismaClient();

export const isTagExists = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateProductDto = req.body;

    const ifExists = await prisma.tag.findMany({
        where: {
            id: {
                in: data.tags
            }
        }
    });

    if (ifExists.length !== data.tags.length) {
        throw new AppError("Some tags does not exists", 400);
    }

    return next();
};
