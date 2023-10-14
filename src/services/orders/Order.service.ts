import { OrderItem, PrismaClient } from "@prisma/client";
import { CreateOrderDto } from "../../dto/order/CreateOrderDto";

const prisma = new PrismaClient();

class OrderService {
    public async createOrder (data: CreateOrderDto) {
        const orderItens = [];

        for(const i in data.orderItem) {
            const product = await prisma.product.findUnique({
                where: {
                    id: data.orderItem[i].productId
                }
            });
            if(product) {
                orderItens.push({
                    title: product.title,
                    unitPrice: product.price,
                    productId: product.id,
                    quantity: data.orderItem[i].quantity
                });
            }
                
        }

        const order = await prisma.order.create({
            data: {
                orderItem: {
                    createMany: {
                        data: orderItens
                    }
                },
                totalAmount: 
                
            }
        });
    }
}
