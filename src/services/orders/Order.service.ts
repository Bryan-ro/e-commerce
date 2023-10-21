import { PrismaClient } from "@prisma/client";
import { CreateOrderDto } from "../../dto/order/CreateOrderDto";
import { deliveryPriceCalculator } from "../../utils/deliveryPriceCalculator";
import mercadopago from "mercadopago";
import "dotenv/config";

const prisma = new PrismaClient();

mercadopago.configure({
    access_token: `${process.env.MERCADOPAGO_SECRET}`
});

export class OrderService {
    public async createOrder (data: CreateOrderDto, user: number) {
        const calculateTotalAmountAndIntensQuantity = (items: OrdersTypes.order[]) => {
            let productQuantity = 0; 
            let productAmount = 0;
    
            items.map((orderItem) => {
                productQuantity = productQuantity + orderItem.quantity;
                productAmount = productAmount + (orderItem.unit_price * orderItem.quantity);
            });

            return { productQuantity, productAmount };
        };

        const orderItems = [];

        for(const i in data.orderItem) {
            const product = await prisma.product.findUnique({
                where: {
                    id: data.orderItem[i].productId
                }
            });
            
            if(product) {
                orderItems.push({
                    title: product.title,
                    unit_price: product.price,
                    productId: product.id,
                    quantity: data.orderItem[i].quantity
                });
            }        
        }

        const address = await prisma.address.findUnique({ where: { id: data.addressId } });
        const findUser = await prisma.user.findUnique({ where: { id: user } });

        const { productAmount, productQuantity } = calculateTotalAmountAndIntensQuantity(orderItems); 

        if(!address) {
            throw new Error();
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, userId, ...addressNoId } = address;

        const deliveryPrice = Number(await deliveryPriceCalculator(`${process.env.ORIGIN_DELIVERY_ZIPCODE}`, address.cep, productQuantity));
        console.log(deliveryPrice);
        
        const order = await prisma.order.create({
            data: {
                orderItem: {
                    createMany: {
                        data: orderItems
                    }
                },
                deliveryPrice: deliveryPrice,
                totalAmount: productAmount + deliveryPrice,
                deliveryStatus: "PREPARING",
                paymentStatus: "PENDING",
                address: {
                    create: addressNoId
                },
                user: {
                    connect: { id: user }
                }    
            }
        });

        const preference = await mercadopago.preferences.create({
            items: [...orderItems, { title: "Delivery", unit_price: deliveryPrice, quantity: 1 }],
            payer: {
                name: findUser?.name,
                email: findUser?.email
            },
            external_reference: `${order.id}`
        });

        return { preference: { items: preference.body.items, paymentLink: preference.body.init_point }, statusCode: 201 };
    }
}
