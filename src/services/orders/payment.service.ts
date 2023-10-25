import { PrismaClient } from "@prisma/client";
import mercadopago from "mercadopago";
import env from "dotenv";
env.config();

mercadopago.configure({
    access_token: `${process.env.MERCADOPAGO_SECRET}`
});
const prisma = new PrismaClient();

export class paymentService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async capturePayment (paymentId: string) {
        //  https://e7dc-2804-431-cfcb-bce6-f93b-c4c8-829e-9639.ngrok-free.app
        
        const capture = await mercadopago.payment.capture(Number(paymentId));   

        await prisma.order.update({
            where: {
                id: Number(capture.body.external_reference)
            },
            data: {
                paymentId: Number(paymentId),
                paymentStatus: capture.body.status === "approved" ? "APPROVED" : "REGECTED",
                deliveryStatus: capture.body.status === "approved" ?  "TRAVELING" : "CANCELED"
            }
        });
    }
}
