import { PrismaClient } from "@prisma/client";
import { CreateTagDto } from "../../dto/productAndTags/tag/CreateTagDto";

const prisma = new PrismaClient();

export class TagService {
    public async getTags(page: number) {
        const pageSize = 30;
        const offset = (page - 1) * pageSize;

        const tags = await prisma.tag.findMany({
            take: pageSize,
            skip: offset,
        });

        const totalTags = await prisma.tag.count();

        return {
            currentPage: page,
            totalPages: Math.ceil(totalTags / pageSize),
            totalResults: totalTags,
            tags, 
            statusCode: 200
        };
    }

    public async createProduct (data: CreateTagDto) {
        await prisma.tag.create({
            data: {
                tag: data.tag
            }
        });

        return { message: "Tag successfully created", statusCode: 201 };
    }
}
