import { JwtPayload } from "./Payload";

declare module "express" {
    interface Request {
        loginPayload?: JwtPayload.payload;
        userLogin?: string;
    }
}
