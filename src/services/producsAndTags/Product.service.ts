import { PrismaClient } from "@prisma/client";
import { CreateProductDto } from "../../dto/productAndTags/product/CreateProductDto";

const prisma = new PrismaClient();

export class ProductService {
    public async getProduct (page: number) {
        const pageSize = 50;
        const offset = (page - 1) * pageSize;

        const products = await prisma.product.findMany({
            take: pageSize,
            skip: offset,
            include: {
                tags: {
                    select: {
                        tag: true
                    }
                }
            }
        });

        const totalProducts = await prisma.product.count();
        const totalPages = Math.ceil(totalProducts / pageSize);

        return {
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts,
            products: products,
            statusCode: 200
        };
    }

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
