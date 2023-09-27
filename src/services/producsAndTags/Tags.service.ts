import { PrismaClient } from "@prisma/client";
import { CreateTagDto } from "../../dto/productAndTags/tag/CreateTagDto";

const prisma = new PrismaClient();

export class ProductService {
    public async createProduct (data: CreateTagDto) {
        await prisma.tag.create({
            data: {
                tag: data.tag
            }
        });

        return { message: "Tag successfully created", statusCode: 201 };
    }
}
