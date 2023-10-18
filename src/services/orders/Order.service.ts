import { PrismaClient } from "@prisma/client";
import { CreateOrderDto } from "../../dto/order/CreateOrderDto";
import { deliveryPriceCalculator } from "../../utils/deliveryPriceCalculator";
import { AppError } from "../../errors/AppError";
import mercadopago from "mercadopago";
import "dotenv/config";

const prisma = new PrismaClient();

mercadopago.configure({
    access_token: `${process.env.MERCADOPAGO_SECRET}`
});

export class OrderService {
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

        const address = await prisma.address.findUnique({
            where: {
                id: data.addressId
            }
        });

        if(!address) {
            throw new AppError("Error, address not found", 400);
        }

        let productQuantity = 0; 
        let productAmount = 0;

        orderItens.map((orderItem) => {
            productQuantity = productQuantity + orderItem.quantity;
            productAmount = productAmount + (orderItem.unitPrice * orderItem.quantity);
        });

    
        const deliveryPrice = Number(await deliveryPriceCalculator(`${process.env.ORIGIN_DELIVERY_ZIPCODE}`, address.cep, productQuantity));

        const order = await prisma.order.create({
            data: {
                orderItem: {
                    createMany: {
                        data: orderItens
                    }
                },
                deliveryPrice: deliveryPrice,
                totalAmount: productAmount + deliveryPrice,
                deliveryStatus: "PREPARING",
                paymentStatus: "PENDING",
                address: {
                    create: address
                }
            }
        });
    }
}
