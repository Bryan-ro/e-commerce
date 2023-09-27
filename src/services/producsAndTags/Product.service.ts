import { PrismaClient } from "@prisma/client";
import { CreateProductDto } from "../../dto/productAndTags/product/CreateProductDto";

const prisma = new PrismaClient();

export class ProductService {
    public async createProduct (data: CreateProductDto, userId: number) {
        await prisma.product.create({
            data: {
                title: data.title,
                description: data.description,
                price: data.price,
                tags: {
                    connect: data.tags.map(tag => ({ id: tag }))
                },
                userId: userId
            }
        });

        return { message: "Product successfully created", statusCode: 201 };
    }
}
