import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { CreateTagDto } from "../../../dto/productAndTags/tag/CreateTagDto";
import { AppError } from "../../../errors/AppError";

const prisma = new PrismaClient();

export const isTagAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateTagDto = req.body;

    const tag = await prisma.tag.findUnique({
        where: {
            tag: data.tag
        }
    });

    if(tag) {
        throw new AppError("Tag already exists");
    }

    return next();
};
