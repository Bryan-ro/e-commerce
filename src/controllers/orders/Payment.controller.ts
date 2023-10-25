import { Request, Response, Router } from "express";
import { paymentService } from "../../services/orders/payment.service";

const service = new paymentService();
const router = Router();

export class PaymentController {
    public routes () {
        router.post("/capture", this.capturePayment);

        return router;
    }

    private async capturePayment (req: Request, res: Response) {
        if(req.body.id) {
            service.capturePayment(req.body.data.id);
        }

        return res.sendStatus(200);
    }
}
