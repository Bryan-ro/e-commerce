import { PrismaClient } from "@prisma/client";
import { CreateProductDto } from "../../dto/productAndTags/product/CreateProductDto";
import { UpdateProductDto } from "../../dto/productAndTags/product/updateProductDto";

const prisma = new PrismaClient();

export class ProductService {
    public async getProduct (page: number, serverUrl: string, search?: string, priceLimit?: number) {
        const pageSize = 100;
        const offset = (page - 1) * pageSize;

        const products = await prisma.product.findMany({
            where: {
                status: "ACTIVE",
                OR: [
                    {
                        title: {
                            contains: search
                        }
                    },
                    {
                        tags: {
                            some: {
                                tag: {
                                    contains: search
                                }
                            }
                        }
                    },
                    {
                        description: {
                            contains: search
                        }
                    }
                ],
                price: !priceLimit ? undefined : { lte: priceLimit }
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

        return {
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts,
            products: products.map((product) => {
                return {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    stock: product.stock,
                    tags: product.tags.map(tag => {
                        return tag.tag;
                    }),
                    images: product.images.map(image => {
                        return `${serverUrl}/images/${image.url}`; 
                    })
                };
            }),
            statusCode: 200
        };
    }

    public async getProductById (productId: number, serverUrl: string) {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include: {
                images: true,
                tags: true,
                createdBy: true
            }
        });

        return { 
            id: product?.id,
            title: product?.title,
            price: product?.price,
            description: product?.description,
            stock: product?.stock,
            tags: product?.tags.map(tag => {
                return tag.tag;
            }),
            images: product?.images.map(image => {
                return {
                    imageId: image.id,
                    imageUrl: `${serverUrl}/images/${image.url}`
                }; 
            }),
            statusCode: 200 
        };
    }

    public async createProduct (data: CreateProductDto, userId: number) {
        const product = await prisma.product.create({
            data: {
                title: data.title,
                description: data.description,
                price: data.price,
                stock: data.stock,
                tags: {
                    connect: data.tags.map(tag => ({ id: tag }))
                },
                userId: userId
            }
        });

        return { message: "Product successfully created. Use the 'id' to images upload.", product: product, statusCode: 201 };
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
    
    public async updateProduct (productId: number, data: UpdateProductDto) {
        await prisma.product.update({
            where: { id: productId },
            data: {
                title: data.title,
                price: data.price,
                description: data.description,
                stock: data.stock,
                tags: {
                    connect: data.tags?.map(tag => ({ id: tag }))
                },
            }
        });

        return { message: "Product successfully updated", statusCode: 200 };
    }


    public async disableProduct (productId: number) {
        await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                status: "DISABLED"
            }
        });

        return { message: "Product successfully disabled", statusCode: 200 };
    }
    
    public async enableProduct (productId: number) {
        await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                status: "ACTIVE"
            }
        });

        return { message: "Product successfully enabled", statusCode: 200 };
    }
}
