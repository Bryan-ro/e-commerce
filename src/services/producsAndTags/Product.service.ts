import { PrismaClient } from "@prisma/client";
import { CreateProductDto } from "../../dto/productAndTags/product/CreateProductDto";

const prisma = new PrismaClient();

export class ProductService {
    public async getProduct (page: number, serverUrl: string) {
        const pageSize = 100;
        const offset = (page - 1) * pageSize;

        const products = await prisma.product.findMany({
            where: {
                status: "ACTIVE"
            },
            take: pageSize,
            skip: offset,
            include: {
                tags: {
                    select: {
                        tag: true
                    }
                },
                images: {
                    select: {
                        url: true
                    }
                }
            }
        });

        const totalProducts = await prisma.product.count();
        const totalPages = Math.ceil(totalProducts / pageSize);

        const productsArray: PrismaTypes.product[] = [];

        products.map((product) => {
            productsArray.push({
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                tags: product.tags.map(tag => {
                    return tag.tag;
                }),
                images: product.images.map(image => {
                    return `${serverUrl}/images/${image.url}`; 
                })
            });
        });

        return {
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts,
            products: productsArray,
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

    public async uploadImages (imagesUrl: multerTypes.file[], productId: number) {
        const data: PrismaTypes.image[] = [];
        
        imagesUrl.map(image => {
            data.push({
                productId: productId,
                url: image.filename
            });
        });
        
        await prisma.image.createMany({
            data: data   
        });

        return { message: "Images successfully uploaded", statusCode: 201 };
    }
}
